"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Upload, Sparkles, FileText, Zap, ArrowRight, Layers, AlertCircle } from "lucide-react";
import FileUpload from "../../components/FileUpload";
import TopicInput from "../../components/TopicInput";
import TemplateSelector from "../../components/TemplateSelector";
import { createPresentation, createUpload, updatePresentation, canGenerateToday } from "../../lib/api";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [topic, setTopic] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("modern-professional");
  const [showTemplates, setShowTemplates] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const [dailyLimit, setDailyLimit] = useState({ allowed: true, used: 0, limit: 3, remaining: 3 });
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  // Check daily generation limit on mount
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      canGenerateToday(userId)
        .then(setDailyLimit)
        .catch(() => {});
    }
  }, []);

  async function handleGenerate() {
    setGenerating(true);
    setError("");
    setProgress("Preparing...");

    try {
      const userId = localStorage.getItem("userId");

      // Check daily limit before proceeding
      if (userId) {
        const limitStatus = await canGenerateToday(userId);
        setDailyLimit(limitStatus);
        if (!limitStatus.allowed) {
          throw new Error(
            `Daily limit reached! You can generate up to ${limitStatus.limit} presentations per day. Come back tomorrow.`
          );
        }
      }

      let fileContent = null;

      // Step 1: Extract text from file if uploaded
      if (file) {
        setProgress("Extracting text from file...");
        const formData = new FormData();
        formData.append("file", file);

        const extractRes = await fetch("/api/extract", { method: "POST", body: formData });
        if (!extractRes.ok) {
          const err = await extractRes.json();
          throw new Error(err.error || "Failed to extract file text");
        }
        const { text } = await extractRes.json();
        fileContent = text;
      }

      // Step 2: Generate slides via AI
      setProgress("AI is generating your slides...");
      const genRes = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic || (file ? file.name.replace(/\.[^/.]+$/, "") : "General"),
          fileContent,
          template: selectedTemplate,
          slideCount: 15,
          userId,
        }),
      });

      if (!genRes.ok) {
        const err = await genRes.json();
        if (err.limitReached) {
          setDailyLimit({ allowed: false, used: err.used, limit: err.limit, remaining: 0 });
        }
        throw new Error(err.error || "Failed to generate slides");
      }

      const { slides } = await genRes.json();
      const presentationTitle = topic || (file ? file.name.replace(/\.[^/.]+$/, "") : "AI Presentation");

      // Step 3: Record upload + presentation in Supabase
      setProgress("Saving presentation...");
      let presentationId = null;

      if (userId) {
        if (file) {
          await createUpload({
            userId,
            fileName: file.name,
            fileType: file.type || file.name.split(".").pop(),
            filePath: file.name,
            fileSize: file.size,
          });
        }

        const presentation = await createPresentation({
          userId,
          title: presentationTitle,
          topic: topic || "General",
          template: selectedTemplate,
          slidesCount: slides.length,
          status: "completed",
          filePath: file?.name || null,
          fileSize: file?.size || 0,
        });
        presentationId = presentation.id;

        // Save slides content as JSON in the presentation record (optional column)
        try {
          await updatePresentation(presentationId, { slides_data: JSON.stringify(slides) });
        } catch {
          // slides_data column may not exist yet — non-critical
        }
      }

      // Step 4: Navigate to preview — pass slides via sessionStorage
      sessionStorage.setItem("generatedSlides", JSON.stringify(slides));
      sessionStorage.setItem("slidesMeta", JSON.stringify({
        title: presentationTitle,
        template: selectedTemplate,
        presentationId,
      }));

      router.push(`/preview?topic=${encodeURIComponent(presentationTitle)}&template=${selectedTemplate}${presentationId ? `&id=${presentationId}` : ""}`);
      // Refresh limit count after successful generation
      if (userId) {
        canGenerateToday(userId).then(setDailyLimit).catch(() => {});
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setGenerating(false);
      setProgress("");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-200 shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-600">
              Step 1: Upload or Enter Topic
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
            Create Your Presentation
          </h2>
          <p className="text-lg text-slate-600">
            Upload a PDF, eBook, or simply enter a topic to get started
          </p>
        </div>

        {/* Main Content Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-8 sm:p-12">
            
            {/* Upload Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-800">Upload File</h3>
              </div>
              <p className="text-slate-600 mb-6">
                Supported formats: PDF, DOCX, EPUB
              </p>
              <FileUpload setFile={setFile} />
            </div>

            {/* Divider */}
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 py-2 bg-white text-slate-500 font-semibold rounded-full border border-slate-200">
                  OR
                </span>
              </div>
            </div>

            {/* Topic Input Section */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-800">Enter Topic</h3>
              </div>
              <p className="text-slate-600 mb-6">
                Describe what you want to create a presentation about
              </p>
              <TopicInput topic={topic} setTopic={setTopic} />
            </div>

            {/* Template Selection Toggle */}
            <div className="mb-8">
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 border-2 border-slate-200 rounded-xl transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-slate-800">
                      Choose Template
                    </h3>
                    <p className="text-sm text-slate-600">
                      {selectedTemplate ? "Template selected" : "Select a design for your slides"}
                    </p>
                  </div>
                </div>
                <div className={`transform transition-transform duration-200 ${showTemplates ? "rotate-180" : ""}`}>
                  <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Template Selector */}
              {showTemplates && (
                <div className="mt-6 p-6 bg-slate-50 rounded-xl border-2 border-slate-200">
                  <TemplateSelector 
                    selectedTemplate={selectedTemplate}
                    onSelectTemplate={setSelectedTemplate}
                  />
                </div>
              )}
            </div>

            {/* Daily Limit Info */}
            <div className={`flex items-center gap-3 p-4 rounded-xl mb-6 border ${
              dailyLimit.remaining === 0
                ? "bg-red-50 border-red-200"
                : dailyLimit.remaining === 1
                ? "bg-amber-50 border-amber-200"
                : "bg-indigo-50 border-indigo-200"
            }`}>
              <AlertCircle className={`w-5 h-5 flex-shrink-0 ${
                dailyLimit.remaining === 0
                  ? "text-red-500"
                  : dailyLimit.remaining === 1
                  ? "text-amber-500"
                  : "text-indigo-500"
              }`} />
              <div>
                <p className={`text-sm font-semibold ${
                  dailyLimit.remaining === 0
                    ? "text-red-700"
                    : dailyLimit.remaining === 1
                    ? "text-amber-700"
                    : "text-indigo-700"
                }`}>
                  {dailyLimit.remaining === 0
                    ? "Daily limit reached — you cannot generate more presentations today."
                    : `${dailyLimit.remaining} of ${dailyLimit.limit} generations remaining today`}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  You can generate up to {dailyLimit.limit} presentations per day. Resets at midnight UTC.
                </p>
              </div>
            </div>

            {/* Features Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-slate-800 font-semibold mb-1">AI-Powered</h4>
                  <p className="text-sm text-slate-600">Automatically organized content</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-slate-800 font-semibold mb-1">Professional Design</h4>
                  <p className="text-sm text-slate-600">Beautiful templates included</p>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl mb-4">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Generate Button */}
            <button 
              onClick={handleGenerate}
              disabled={(!file && !topic) || generating || !dailyLimit.allowed}
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-xl bg-indigo-600 text-white font-semibold text-lg shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600"
            >
              {generating ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Sparkles className="w-6 h-6" />
              )}
              <span>{generating ? progress || "Generating..." : "Generate Slides with AI"}</span>
              {!generating && <ArrowRight className="w-5 h-5" />}
            </button>

            {/* Helper Text */}
            {!file && !topic && (
              <p className="text-center text-slate-500 text-sm mt-4">
                Please upload a file or enter a topic to continue
              </p>
            )}
          </div>

          {/* Bottom Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="p-4 bg-white border border-slate-200 rounded-xl text-center shadow-sm">
              <div className="text-2xl font-bold text-indigo-600 mb-1">
                3 Min
              </div>
              <div className="text-sm text-slate-600">Average Processing Time</div>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl text-center shadow-sm">
              <div className="text-2xl font-bold text-indigo-600 mb-1">
                50+
              </div>
              <div className="text-sm text-slate-600">Template Designs</div>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl text-center shadow-sm">
              <div className="text-2xl font-bold text-indigo-600 mb-1">
                100%
              </div>
              <div className="text-sm text-slate-600">Customizable</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
