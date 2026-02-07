"use client";

import { Upload, File, X, Check } from "lucide-react";
import { useState } from "react";

export default function FileUpload({ setFile }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFile(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.name.endsWith('.docx') || file.name.endsWith('.epub'))) {
      setSelectedFile(file);
      setFile(file);
    }
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center w-full min-h-280px px-6 py-10 border-2 border-dashed rounded-3xl transition-all duration-300 ${
            isDragging 
              ? 'border-cyan-400 bg-cyan-500/10 scale-[1.02]' 
              : 'border-slate-600 bg-linear-to-br from-slate-800/60 to-slate-900/60 hover:border-cyan-500/50 hover:bg-slate-700/60'
          }`}
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-linear-to-r from-cyan-500/5 via-blue-500/5 to-indigo-600/5 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative flex flex-col items-center justify-center space-y-6 z-10">
            {/* Icon */}
            <div className="relative">
              <div className="absolute -inset-2 bg-linear-to-r from-cyan-500 via-blue-500 to-indigo-600 rounded-full blur-xl opacity-40 animate-pulse"></div>
              <div className="relative w-20 h-20 rounded-full bg-linear-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center border border-cyan-500/30">
                <Upload className="w-10 h-10 text-cyan-400" strokeWidth={2} />
              </div>
            </div>

            {/* Text */}
            <div className="text-center space-y-2">
              <p className="text-xl font-bold text-white">
                Drag & Drop your file here
              </p>
              <p className="text-sm text-slate-400">
                or click the button below to browse
              </p>
            </div>

            {/* Beautiful Choose File Button */}
            <label 
              htmlFor="file-upload" 
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-linear-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-base shadow-2xl shadow-blue-600/50 hover:shadow-cyan-500/70 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-linear-to-r from-cyan-600 via-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <File className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Choose File</span>
            </label>

            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".pdf,.docx,.epub"
              onChange={handleFileChange}
            />

            {/* Supported formats */}
            <p className="text-xs text-slate-500">
              Supported: PDF, DOCX, EPUB (max. 10MB)
            </p>
          </div>
        </div>
      ) : (
        // File Selected View
        <div className="relative flex items-center justify-between w-full p-6 border-2 border-green-500/30 bg-linear-to-br from-green-500/10 to-emerald-600/10 rounded-3xl">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-linear-to-r from-green-500/10 via-emerald-500/10 to-teal-600/10 rounded-3xl"></div>

          <div className="relative flex items-center gap-4 z-10 flex-1">
            {/* Success Icon */}
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
              <Check className="w-7 h-7 text-white" strokeWidth={3} />
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <p className="text-lg font-bold text-white truncate">
                {selectedFile.name}
              </p>
              <p className="text-sm text-green-400 font-medium">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={handleRemoveFile}
              className="group relative p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-400/50 transition-all duration-300 hover:scale-110"
            >
              <X className="w-5 h-5 text-red-400 group-hover:text-red-300" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}