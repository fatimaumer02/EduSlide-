"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Briefcase, GraduationCap, Lightbulb, Palette, ArrowRight, Check, AlertCircle } from "lucide-react";
import { canGenerateToday } from "../../lib/api";

const templates = [
  {
    id: "modern-professional",
    name: "Modern Professional",
    description: "Clean and professional design perfect for business presentations and corporate meetings",
    longDescription: "This template features a minimalist approach with professional color schemes, making it ideal for business proposals, quarterly reports, and executive presentations. The layout emphasizes clarity and data visualization.",
    icon: Briefcase,
    colors: {
      primary: "#4F46E5",
      secondary: "#818CF8",
      accent: "#C7D2FE",
      background: "#F8FAFC"
    },
    features: [
      "Minimalist design philosophy",
      "Professional color palette",
      "Data-focused layouts",
      "Chart and graph templates",
      "Corporate branding ready"
    ],
    bestFor: ["Business presentations", "Corporate reports", "Sales pitches", "Executive summaries"],
    gradient: "from-indigo-500 to-purple-600",
    popular: true
  },
  {
    id: "academic-classic",
    name: "Academic Classic",
    description: "Traditional academic style ideal for educational content and research presentations",
    longDescription: "Designed with academia in mind, this template uses traditional formatting with serif fonts and structured layouts. Perfect for lectures, research presentations, and educational materials.",
    icon: GraduationCap,
    colors: {
      primary: "#0F172A",
      secondary: "#475569",
      accent: "#94A3B8",
      background: "#FFFFFF"
    },
    features: [
      "Serif typography",
      "Academic formatting standards",
      "Citation-ready layouts",
      "Research-focused design",
      "Bibliography templates"
    ],
    bestFor: ["Lectures", "Research papers", "Thesis defense", "Academic conferences"],
    gradient: "from-slate-700 to-slate-900",
    popular: false
  },
  {
    id: "creative-vibrant",
    name: "Creative Vibrant",
    description: "Bold and colorful design for engaging and memorable presentations",
    longDescription: "Stand out with this eye-catching template that uses vibrant colors and dynamic layouts. Perfect for creative industries, marketing campaigns, and presentations that need to make an impact.",
    icon: Palette,
    colors: {
      primary: "#EC4899",
      secondary: "#F472B6",
      accent: "#FBCFE8",
      background: "#FDF2F8"
    },
    features: [
      "Eye-catching color schemes",
      "Dynamic layouts",
      "Creative visual elements",
      "Bold typography",
      "Engaging animations"
    ],
    bestFor: ["Marketing campaigns", "Creative pitches", "Product launches", "Brand presentations"],
    gradient: "from-pink-500 to-rose-600",
    popular: true
  },
  {
    id: "minimal-elegant",
    name: "Minimal Elegant",
    description: "Sophisticated minimalist design with elegant typography and subtle details",
    longDescription: "Less is more with this elegant template that focuses on whitespace and typography. The sophisticated design lets your content shine while maintaining a professional and modern aesthetic.",
    icon: Lightbulb,
    colors: {
      primary: "#059669",
      secondary: "#34D399",
      accent: "#A7F3D0",
      background: "#F0FDF4"
    },
    features: [
      "Whitespace-focused design",
      "Elegant typography",
      "Subtle animations",
      "Clean layouts",
      "Modern aesthetic"
    ],
    bestFor: ["Portfolio presentations", "Design showcases", "Startup pitches", "Minimalist content"],
    gradient: "from-emerald-500 to-teal-600",
    popular: false
  }
];

export default function TemplatesPage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const [dailyLimit, setDailyLimit] = useState({ allowed: true, used: 0, limit: 3, remaining: 3 });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      canGenerateToday(userId)
        .then(setDailyLimit)
        .catch(() => {});
    }
  }, []);

  const handleUseTemplate = (templateId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
      return;
    }
    if (!dailyLimit.allowed) return;
    router.push(`/upload?template=${templateId}`);
  };

  const handleStartCreating = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
      return;
    }
    router.push(selectedTemplate ? `/upload?template=${selectedTemplate}` : "/upload");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-200 shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-600">
              Professional Templates
            </span>
          </div>

          <h1 className="text-5xl font-bold text-slate-800 mb-6">
            Choose Your Perfect Template
          </h1>
          <p className="text-xl text-slate-600">
            Select from our collection of professionally designed templates to create stunning presentations
          </p>

          {/* Daily Limit Banner */}
          <div className={`mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl border ${
            dailyLimit.remaining === 0
              ? "bg-red-50 border-red-200"
              : dailyLimit.remaining === 1
              ? "bg-amber-50 border-amber-200"
              : "bg-indigo-50 border-indigo-200"
          }`}>
            <AlertCircle className={`w-4 h-4 ${
              dailyLimit.remaining === 0
                ? "text-red-500"
                : dailyLimit.remaining === 1
                ? "text-amber-500"
                : "text-indigo-500"
            }`} />
            <span className={`text-sm font-semibold ${
              dailyLimit.remaining === 0
                ? "text-red-700"
                : dailyLimit.remaining === 1
                ? "text-amber-700"
                : "text-indigo-700"
            }`}>
              {dailyLimit.remaining === 0
                ? "Daily limit reached — come back tomorrow!"
                : `${dailyLimit.remaining} of ${dailyLimit.limit} generations remaining today`}
            </span>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {templates.map((template) => {
              const Icon = template.icon;
              const isSelected = selectedTemplate === template.id;
              const isHovered = hoveredTemplate === template.id;

              return (
                <div
                  key={template.id}
                  onMouseEnter={() => setHoveredTemplate(template.id)}
                  onMouseLeave={() => setHoveredTemplate(null)}
                  className={`relative group transition-all duration-300 ${
                    isSelected ? "scale-[1.02]" : ""
                  }`}
                >
                  <div className={`bg-white border-2 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                    isSelected
                      ? "border-indigo-500 shadow-2xl"
                      : "border-slate-200 hover:shadow-xl"
                  }`}>
                    
                    {/* Template Preview */}
                    <div className={`relative h-64 bg-gradient-to-br ${template.gradient} p-8`}>
                      {/* Popular Badge */}
                      {template.popular && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-indigo-600">
                          Popular
                        </div>
                      )}

                      {/* Selected Badge */}
                      {isSelected && (
                        <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <Check className="w-6 h-6 text-indigo-600" />
                        </div>
                      )}

                      {/* Template Icon */}
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      {/* Preview Slides */}
                      <div className="space-y-3">
                        <div className="h-4 bg-white/30 backdrop-blur-sm rounded w-3/4"></div>
                        <div className="h-3 bg-white/20 backdrop-blur-sm rounded w-1/2"></div>
                        <div className="flex gap-2 mt-4">
                          <div className="h-16 w-20 bg-white/20 backdrop-blur-sm rounded"></div>
                          <div className="h-16 w-20 bg-white/20 backdrop-blur-sm rounded"></div>
                          <div className="h-16 w-20 bg-white/20 backdrop-blur-sm rounded"></div>
                        </div>
                      </div>

                      {/* Color Palette */}
                      <div className="absolute bottom-4 right-4 flex gap-2">
                        {Object.values(template.colors).map((color, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </div>
                    </div>

                    {/* Template Info */}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-slate-800 mb-3">
                        {template.name}
                      </h3>
                      <p className="text-slate-600 mb-6">
                        {template.longDescription}
                      </p>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-slate-700 mb-3">Key Features:</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {template.features.slice(0, 3).map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Best For */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-slate-700 mb-3">Best For:</h4>
                        <div className="flex flex-wrap gap-2">
                          {template.bestFor.map((use, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full"
                            >
                              {use}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => setSelectedTemplate(template.id)}
                          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                            isSelected
                              ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-300"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {isSelected ? "Selected" : "Select"}
                        </button>
                        <button
                          onClick={() => handleUseTemplate(template.id)}
                          disabled={!dailyLimit.allowed}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-semibold rounded-lg transition-all duration-200 ${
                            dailyLimit.allowed
                              ? "bg-indigo-600 text-white hover:bg-indigo-700"
                              : "bg-slate-300 text-slate-500 cursor-not-allowed"
                          }`}
                        >
                          {dailyLimit.allowed ? "Use Template" : "Limit Reached"}
                          {dailyLimit.allowed && <ArrowRight className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${
                    isHovered && !isSelected ? "opacity-100" : "opacity-0"
                  }`}>
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${template.gradient} opacity-5`}></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Ready to Create Your Presentation?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              {selectedTemplate 
                ? `You've selected ${templates.find(t => t.id === selectedTemplate)?.name}. Start creating now!`
                : "Select a template above or start with our default design"
              }
            </p>
            <button
              onClick={handleStartCreating}
              disabled={!dailyLimit.allowed}
              className={`inline-flex items-center gap-3 px-8 py-4 font-semibold text-lg rounded-xl transition-all duration-200 shadow-lg ${
                dailyLimit.allowed
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-xl"
                  : "bg-slate-300 text-slate-500 cursor-not-allowed"
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span>Start Creating</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
