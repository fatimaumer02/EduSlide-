import Link from "next/link";
import { Sparkles, FileText, Zap, BookOpen, ArrowRight, CheckCircle2, Award, Shield, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Main Content */}
        <div className="max-w-5xl mx-auto text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-indigo-600/10 border border-blue-500/30 backdrop-blur-sm shadow-lg shadow-blue-500/10">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Powered by Advanced AI
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight">
            <span className="block bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent pb-2 drop-shadow-2xl">
              EduSlide AI
            </span>
            <span className="block text-white text-3xl sm:text-4xl lg:text-5xl mt-2 drop-shadow-lg">
              Transform Learning Materials
            </span>
            <span className="block text-slate-200 text-3xl sm:text-4xl lg:text-5xl drop-shadow-lg">
              Into Stunning Slides
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            AI-powered tool that converts PDFs, eBooks, or topics into beautiful PowerPoint slides for teachers. 
            <span className="block mt-2 font-bold text-blue-300">
              Save hours of work and create professional presentations in minutes.
            </span>
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link 
              href="/upload" 
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-linear-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-lg shadow-2xl shadow-blue-600/50 hover:shadow-blue-500/70 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-linear-to-r from-cyan-600 via-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <Sparkles className="w-6 h-6 relative z-10" />
              <span className="relative z-10">Generate Slides</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
            </Link>

            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-800/80 text-white font-semibold text-lg border-2 border-blue-500/30 hover:border-blue-400/50 hover:bg-slate-700/80 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
              <BookOpen className="w-5 h-5" />
              Learn More
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
            <div className="p-4 rounded-xl bg-linear-to-br from-slate-800/80 to-slate-900/80 border border-cyan-500/20 backdrop-blur-sm">
              <div className="text-3xl font-black bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">10K+</div>
              <div className="text-sm text-slate-400 font-medium mt-1">Presentations Created</div>
            </div>
            <div className="p-4 rounded-xl bg-linear-to-br from-slate-800/80 to-slate-900/80 border border-blue-500/20 backdrop-blur-sm">
              <div className="text-3xl font-black bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">95%</div>
              <div className="text-sm text-slate-400 font-medium mt-1">Time Saved</div>
            </div>
            <div className="p-4 rounded-xl bg-linear-to-br from-slate-800/80 to-slate-900/80 border border-indigo-500/20 backdrop-blur-sm">
              <div className="text-3xl font-black bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">4.9★</div>
              <div className="text-sm text-slate-400 font-medium mt-1">User Rating</div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
            
            {/* Feature 1 */}
            <div className="group p-6 rounded-2xl bg-linear-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-400/40 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/30">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Multiple Formats
              </h3>
              <p className="text-slate-300 font-medium leading-relaxed">
                Upload PDFs, eBooks, or just enter a topic. We handle the rest seamlessly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-6 rounded-2xl bg-linear-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-blue-500/20 hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Lightning Fast
              </h3>
              <p className="text-slate-300 font-medium leading-relaxed">
                Generate professional slides in minutes, not hours. Boost your productivity.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-6 rounded-2xl bg-linear-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-indigo-500/20 hover:border-indigo-400/40 hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-indigo-500/30">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                AI-Powered
              </h3>
              <p className="text-slate-300 font-medium leading-relaxed">
                Smart content organization and beautiful design created automatically.
              </p>
            </div>
          </div>

          {/* Benefits List */}
          <div className="pt-12 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Why Choose EduSlide AI?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: CheckCircle2, text: "Save hours of preparation time", color: "text-green-400" },
                { icon: Award, text: "Professional-quality designs", color: "text-yellow-400" },
                { icon: Shield, text: "Secure & private processing", color: "text-blue-400" },
                { icon: TrendingUp, text: "Export to PowerPoint instantly", color: "text-cyan-400" }
              ].map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-xl bg-linear-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 group"
                  >
                    <Icon className={`w-5 h-5 ${benefit.color} flex-0 group-hover:scale-110 transition-transform duration-300`} />
                    <span className="text-slate-200 font-semibold">
                      {benefit.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-20 left-10 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse delay-1000 pointer-events-none"></div>
      <div className="fixed top-1/2 left-1/2 w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse delay-500 pointer-events-none"></div>
    </div>
  );
}