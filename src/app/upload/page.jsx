"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Sparkles, FileText, Zap, ArrowRight } from "lucide-react";
import FileUpload from "../../components/FileUpload";
import TopicInput from "../../components/TopicInput";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [topic, setTopic] = useState("");
  const router = useRouter();

  function handleGenerate() {
    // fake file id (like backend)
    const fakeFileId = "demo123";

    router.push(`/preview?fileId=${fakeFileId}&topic=${topic}`);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-indigo-600/10 border border-blue-500/30 backdrop-blur-sm shadow-lg shadow-blue-500/10 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Step 1: Upload or Enter Topic
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            Create Your Presentation
          </h2>
          <p className="text-lg text-slate-300 font-medium">
            Upload a PDF, eBook, or simply enter a topic to get started
          </p>
        </div>

        {/* Main Content Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-linear-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-cyan-500/20 rounded-3xl shadow-2xl shadow-blue-600/20 p-8 sm:p-12">
            
            {/* Upload Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Upload File</h3>
              </div>
              <p className="text-slate-400 mb-6">
                Supported formats: PDF, DOCX, EPUB
              </p>
              <FileUpload setFile={setFile} />
            </div>

            {/* Divider */}
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 py-2 bg-linear-to-r from-slate-800 to-slate-900 text-slate-400 font-semibold rounded-full border border-slate-700">
                  OR
                </span>
              </div>
            </div>

            {/* Topic Input Section */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Enter Topic</h3>
              </div>
              <p className="text-slate-400 mb-6">
                Describe what you want to create a presentation about
              </p>
              <TopicInput topic={topic} setTopic={setTopic} />
            </div>

            {/* Features Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 p-6 bg-linear-to-br from-slate-900/50 to-slate-800/50 rounded-2xl border border-indigo-500/10">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-cyan-400 flex-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-semibold mb-1">AI-Powered</h4>
                  <p className="text-sm text-slate-400">Automatically organized content</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-400 flex-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-semibold mb-1">Professional Design</h4>
                  <p className="text-sm text-slate-400">Beautiful templates included</p>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button 
              onClick={handleGenerate}
              disabled={!file && !topic}
              className="group relative w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-linear-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-lg shadow-2xl shadow-blue-600/50 hover:shadow-blue-500/70 transition-all duration-300 hover:scale-[1.02] overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-linear-to-r from-cyan-600 via-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <Sparkles className="w-6 h-6 relative z-10" />
              <span className="relative z-10">Generate Slides</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
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
            <div className="p-4 bg-linear-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-cyan-500/10 rounded-xl text-center">
              <div className="text-2xl font-black bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1">
                3 Min
              </div>
              <div className="text-sm text-slate-400">Average Processing Time</div>
            </div>
            <div className="p-4 bg-linear-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-blue-500/10 rounded-xl text-center">
              <div className="text-2xl font-black bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-1">
                50+
              </div>
              <div className="text-sm text-slate-400">Template Designs</div>
            </div>
            <div className="p-4 bg-linear-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-indigo-500/10 rounded-xl text-center">
              <div className="text-2xl font-black bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-1">
                100%
              </div>
              <div className="text-sm text-slate-400">Customizable</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-20 left-10 w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse delay-1000 pointer-events-none"></div>
    </div>
  );
}