"use client";

import { useState } from "react";
import { Check, Sparkles, Briefcase, GraduationCap, Lightbulb, Palette } from "lucide-react";

const templates = [
  {
    id: "modern-professional",
    name: "Modern Professional",
    description: "Clean and professional design perfect for business presentations",
    icon: Briefcase,
    colors: {
      primary: "#4F46E5",
      secondary: "#818CF8",
      accent: "#C7D2FE",
      background: "#F8FAFC"
    },
    preview: {
      title: "Modern Professional",
      subtitle: "Clean & Corporate",
      features: ["Minimalist design", "Professional colors", "Data-focused layouts"]
    },
    gradient: "from-indigo-500 to-purple-600"
  },
  {
    id: "academic-classic",
    name: "Academic Classic",
    description: "Traditional academic style ideal for educational content",
    icon: GraduationCap,
    colors: {
      primary: "#0F172A",
      secondary: "#475569",
      accent: "#94A3B8",
      background: "#FFFFFF"
    },
    preview: {
      title: "Academic Classic",
      subtitle: "Traditional & Scholarly",
      features: ["Serif typography", "Academic formatting", "Citation-ready"]
    },
    gradient: "from-slate-700 to-slate-900"
  },
  {
    id: "creative-vibrant",
    name: "Creative Vibrant",
    description: "Bold and colorful design for engaging presentations",
    icon: Palette,
    colors: {
      primary: "#EC4899",
      secondary: "#F472B6",
      accent: "#FBCFE8",
      background: "#FDF2F8"
    },
    preview: {
      title: "Creative Vibrant",
      subtitle: "Bold & Colorful",
      features: ["Eye-catching colors", "Dynamic layouts", "Creative elements"]
    },
    gradient: "from-pink-500 to-rose-600"
  },
  {
    id: "minimal-elegant",
    name: "Minimal Elegant",
    description: "Sophisticated minimalist design with elegant typography",
    icon: Lightbulb,
    colors: {
      primary: "#059669",
      secondary: "#34D399",
      accent: "#A7F3D0",
      background: "#F0FDF4"
    },
    preview: {
      title: "Minimal Elegant",
      subtitle: "Simple & Sophisticated",
      features: ["Whitespace focus", "Elegant fonts", "Subtle animations"]
    },
    gradient: "from-emerald-500 to-teal-600"
  }
];

export default function TemplateSelector({ selectedTemplate, onSelectTemplate }) {
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-slate-800">Choose Your Template</h3>
          <p className="text-slate-600">Select a design that matches your presentation style</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => {
          const Icon = template.icon;
          const isSelected = selectedTemplate === template.id;
          const isHovered = hoveredTemplate === template.id;

          return (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template.id)}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
              className={`relative group text-left transition-all duration-300 ${
                isSelected
                  ? "ring-4 ring-indigo-500 ring-offset-2"
                  : "hover:shadow-xl"
              }`}
            >
              {/* Template Card */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden">
                
                {/* Preview Section */}
                <div className={`relative h-48 bg-gradient-to-br ${template.gradient} p-6 flex flex-col justify-between`}>
                  {/* Selected Badge */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-5 h-5 text-indigo-600" />
                    </div>
                  )}

                  {/* Template Icon */}
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Preview Content */}
                  <div className="space-y-2">
                    <div className="h-3 bg-white/30 backdrop-blur-sm rounded w-3/4"></div>
                    <div className="h-2 bg-white/20 backdrop-blur-sm rounded w-1/2"></div>
                  </div>

                  {/* Color Palette */}
                  <div className="flex gap-2">
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: template.colors.primary }}
                    ></div>
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: template.colors.secondary }}
                    ></div>
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: template.colors.accent }}
                    ></div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-xl font-semibold text-slate-800 mb-2">
                      {template.name}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {template.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {template.preview.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Select Button */}
                  <div className={`pt-4 transition-all duration-200 ${
                    isSelected ? "opacity-100" : isHovered ? "opacity-100" : "opacity-0"
                  }`}>
                    <div className={`w-full py-2 px-4 rounded-lg text-center font-semibold transition-colors ${
                      isSelected
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}>
                      {isSelected ? "Selected" : "Select Template"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${
                isHovered && !isSelected ? "opacity-100" : "opacity-0"
              }`}>
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${template.gradient} opacity-10`}></div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Template Info */}
      {selectedTemplate && (
        <div className="mt-6 p-6 bg-indigo-50 border-2 border-indigo-200 rounded-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-1">
                {templates.find(t => t.id === selectedTemplate)?.name} Selected
              </h4>
              <p className="text-slate-600">
                Your slides will be generated using this template. You can change it anytime before generating.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
