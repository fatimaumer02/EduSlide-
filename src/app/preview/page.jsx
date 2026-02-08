"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Download, Sparkles, ChevronLeft, ChevronRight, FileText, ArrowLeft, Presentation, RotateCcw } from "lucide-react";
import { downloadPptx } from "../../lib/pptxGenerator";
import { incrementPresentationDownloads, trackEvent } from "../../lib/api";

// Template color map for preview styling
const TEMPLATE_COLORS = {
  "modern-professional": { primary: "#4F46E5", bg: "#F8FAFC", accent: "#818CF8", titleBg: "#4F46E5" },
  "academic-classic": { primary: "#0F172A", bg: "#FFFFFF", accent: "#475569", titleBg: "#0F172A" },
  "creative-vibrant": { primary: "#EC4899", bg: "#FDF2F8", accent: "#F472B6", titleBg: "#EC4899" },
  "minimal-elegant": { primary: "#059669", bg: "#F0FDF4", accent: "#34D399", titleBg: "#059669" },
};

function PreviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const topic = searchParams.get("topic") || "Presentation";
  const template = searchParams.get("template") || "modern-professional";
  const presentationId = searchParams.get("id");

  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const colors = TEMPLATE_COLORS[template] || TEMPLATE_COLORS["modern-professional"];

  useEffect(() => {
    // Load slides from sessionStorage (set by upload page)
    try {
      const stored = sessionStorage.getItem("generatedSlides");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSlides(parsed);
          setLoading(false);
          return;
        }
      }
    } catch {}

    // No slides found — show error
    setError("No slides found. Please generate a presentation first.");
    setLoading(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setCurrentSlide((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides.length]);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadPptx(slides, { title: topic, template });

      // Track in Supabase if logged in
      const userId = localStorage.getItem("userId");
      if (userId && presentationId) {
        await incrementPresentationDownloads(presentationId);
        await trackEvent({ userId, presentationId, eventType: "download" });
      }
    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to generate PowerPoint file.");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-700 text-lg font-medium">Loading your presentation...</p>
        </div>
      </div>
    );
  }

  if (error || slides.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <Presentation className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">No Presentation Found</h2>
          <p className="text-slate-600 mb-6">{error || "Generate a presentation from the upload page first."}</p>
          <button
            onClick={() => router.push("/upload")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Go to Upload
          </button>
        </div>
      </div>
    );
  }

  const slide = slides[currentSlide];
  const isTitleSlide = slide.layout === "title" || currentSlide === 0;
  const isSummarySlide = slide.layout === "summary" || currentSlide === slides.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="max-w-5xl mx-auto flex items-center justify-between mb-8">
          <button
            onClick={() => router.push("/upload")}
            className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-600">
              {slides.length} Slides Generated
            </span>
          </div>
          <button
            onClick={() => router.push("/upload")}
            className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-medium transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            New
          </button>
        </div>

        {/* Presentation Title */}
        <div className="max-w-5xl mx-auto text-center mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">{topic}</h2>
        </div>

        {/* Slide Display */}
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl shadow-xl border-2 overflow-hidden mb-6 min-h-[450px] flex flex-col justify-center relative"
            style={{
              backgroundColor: (isTitleSlide || isSummarySlide) ? colors.titleBg : colors.bg,
              borderColor: colors.primary + "33",
            }}
          >
            {/* Slide number badge */}
            <div
              className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
              style={{ backgroundColor: colors.primary + "22", color: colors.primary }}
            >
              {currentSlide + 1} / {slides.length}
            </div>

            <div className="p-8 sm:p-12">
              {/* Title */}
              <h3
                className="text-2xl sm:text-3xl font-bold mb-2 text-center"
                style={{ color: (isTitleSlide || isSummarySlide) ? "#FFFFFF" : colors.primary }}
              >
                {slide.title}
              </h3>

              {/* Subtitle */}
              {slide.subtitle && (
                <p
                  className="text-lg mb-6 text-center"
                  style={{ color: (isTitleSlide || isSummarySlide) ? colors.accent : colors.accent }}
                >
                  {slide.subtitle}
                </p>
              )}

              {/* Divider */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-1 rounded-full" style={{ backgroundColor: colors.accent }}></div>
              </div>

              {/* Content bullets */}
              {slide.content && slide.content.length > 0 && (
                <div
                  className={`space-y-3 max-w-3xl mx-auto ${slide.layout === "two-column" ? "grid grid-cols-1 sm:grid-cols-2 gap-4 space-y-0" : ""}`}
                >
                  {slide.content.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: (isTitleSlide || isSummarySlide) ? "#FFFFFF" : colors.primary }}
                      ></div>
                      <p
                        className="text-base sm:text-lg leading-relaxed"
                        style={{ color: (isTitleSlide || isSummarySlide) ? "#E2E8F0" : "#334155" }}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Speaker notes preview */}
              {slide.notes && (
                <div className="mt-8 pt-4 border-t" style={{ borderColor: (isTitleSlide || isSummarySlide) ? "rgba(255,255,255,0.2)" : "#E2E8F0" }}>
                  <p className="text-xs italic" style={{ color: (isTitleSlide || isSummarySlide) ? "rgba(255,255,255,0.5)" : "#94A3B8" }}>
                    Notes: {slide.notes}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 sm:p-6 mb-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <span className="text-slate-700 font-semibold">
                  Slide {currentSlide + 1} of {slides.length}
                </span>
              </div>

              <button
                onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                disabled={currentSlide === slides.length - 1}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-xl bg-indigo-600 text-white font-semibold text-lg shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all duration-200 disabled:opacity-60"
          >
            {downloading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="w-6 h-6" />
            )}
            <span>{downloading ? "Creating PowerPoint..." : "Download PowerPoint (.pptx)"}</span>
          </button>

          {/* Slide Thumbnails */}
          <div className="mt-8 grid grid-cols-3 sm:grid-cols-5 gap-3">
            {slides.map((s, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                  currentSlide === index
                    ? "border-indigo-600 bg-indigo-50 shadow-md"
                    : "border-slate-200 bg-white hover:border-indigo-300"
                }`}
              >
                <div className="text-[10px] font-semibold text-slate-500 mb-1">
                  Slide {index + 1}
                </div>
                <div className="text-xs font-semibold text-slate-800 truncate">
                  {s.title}
                </div>
              </button>
            ))}
          </div>

          {/* Keyboard hint */}
          <p className="text-center text-slate-400 text-xs mt-6">
            Tip: Use arrow keys to navigate slides
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-700 text-lg font-medium">Loading preview...</p>
        </div>
      </div>
    }>
      <PreviewContent />
    </Suspense>
  );
}
