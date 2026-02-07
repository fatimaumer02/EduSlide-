"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Download, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import SlideCard from "../../components/SlideCard";
import Loader from "../../components/Loader";

function PreviewContent() {
  const searchParams = useSearchParams();
  const fileId = searchParams.get("fileId");
  const topic = searchParams.get("topic");

  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const demoSlides = [
        {
          title: topic || "Introduction",
          bullets: [
            "Welcome to the presentation",
            "AI-generated content",
            "Professional design"
          ]
        },
        {
          title: "Key Points",
          bullets: [
            "Point 1: Important concept",
            "Point 2: Supporting details",
            "Point 3: Conclusion"
          ]
        },
        {
          title: "Summary",
          bullets: [
            "Recap of main ideas",
            "Next steps",
            "Thank you"
          ]
        }
      ];
      setSlides(demoSlides);
      setLoading(false);
    }, 2000);
  }, [topic]);

  const handleDownload = () => {
    alert("Download functionality coming soon!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader />
          <p className="text-slate-300 mt-4 text-lg">Creating your presentation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="max-w-5xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-indigo-600/10 border border-blue-500/30 backdrop-blur-sm shadow-lg shadow-blue-500/10 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Preview Your Slides
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            Your Presentation is Ready
          </h2>
        </div>

        {/* Slide Preview */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-linear-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-cyan-500/20 rounded-3xl shadow-2xl shadow-blue-600/20 p-8">
            
            {/* Current Slide */}
            <div className="mb-6">
              <SlideCard slide={slides[currentSlide]} />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700 text-white hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <span className="text-slate-300 font-semibold">
                Slide {currentSlide + 1} of {slides.length}
              </span>

              <button
                onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                disabled={currentSlide === slides.length - 1}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700 text-white hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="group relative w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-linear-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-lg shadow-2xl shadow-blue-600/50 hover:shadow-blue-500/70 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-r from-cyan-600 via-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Download className="w-6 h-6 relative z-10" />
              <span className="relative z-10">Download PowerPoint</span>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-20 left-10 w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse delay-1000 pointer-events-none"></div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader />
          <p className="text-slate-300 mt-4 text-lg">Loading preview...</p>
        </div>
      </div>
    }>
      <PreviewContent />
    </Suspense>
  );
}
