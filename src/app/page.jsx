import Link from "next/link";
import { Sparkles, FileText, Zap, BookOpen, ArrowRight, CheckCircle2, Award, Shield, TrendingUp, Upload, Download } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Main Content */}
        <div className="max-w-5xl mx-auto text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-200 shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-600">
              Powered by Advanced AI
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="block text-indigo-600 pb-2">
              EduSlide AI
            </span>
            <span className="block text-slate-800 text-3xl sm:text-4xl lg:text-5xl mt-2">
              Transform Learning Materials
            </span>
            <span className="block text-slate-700 text-3xl sm:text-4xl lg:text-5xl">
              Into Professional Slides
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            AI-powered tool that converts PDFs, eBooks, or topics into beautiful PowerPoint slides for educators. 
            <span className="block mt-2 font-semibold text-slate-700">
              Save hours of work and create professional presentations in minutes.
            </span>
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link 
              href="/signup" 
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold text-lg shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all duration-200"
            >
              <Sparkles className="w-5 h-5" />
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            <Link
              href="/upload"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-700 font-semibold text-lg border-2 border-slate-200 hover:border-indigo-200 hover:bg-slate-50 transition-all duration-200"
            >
              <BookOpen className="w-5 h-5" />
              Try Demo
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="text-3xl font-bold text-indigo-600">10K+</div>
              <div className="text-sm text-slate-600 font-medium mt-1">Presentations Created</div>
            </div>
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="text-3xl font-bold text-indigo-600">95%</div>
              <div className="text-sm text-slate-600 font-medium mt-1">Time Saved</div>
            </div>
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="text-3xl font-bold text-indigo-600">4.9★</div>
              <div className="text-sm text-slate-600 font-medium mt-1">User Rating</div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
            
            {/* Feature 1 */}
            <div className="group p-8 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Multiple Formats
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Upload PDFs, eBooks, or just enter a topic. We handle the rest seamlessly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Lightning Fast
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Generate professional slides in minutes, not hours. Boost your productivity.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                AI-Powered
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Smart content organization and beautiful design created automatically.
              </p>
            </div>
          </div>

          {/* Benefits List */}
          <div className="pt-12 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-slate-800 mb-6">Why Choose EduSlide AI?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: CheckCircle2, text: "Save hours of preparation time", color: "text-green-600" },
                { icon: Award, text: "Professional-quality designs", color: "text-amber-600" },
                { icon: Shield, text: "Secure & private processing", color: "text-blue-600" },
                { icon: TrendingUp, text: "Export to PowerPoint instantly", color: "text-indigo-600" }
              ].map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-lg bg-white border border-slate-200 hover:border-indigo-200 hover:shadow-sm transition-all duration-200"
                  >
                    <Icon className={`w-5 h-5 ${benefit.color} flex-shrink-0`} />
                    <span className="text-slate-700 font-medium">
                      {benefit.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">How It Works</h2>
              <p className="text-lg text-slate-600">Create professional presentations in three simple steps</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Upload or Enter Topic",
                  description: "Upload your PDF, eBook, or simply type in the topic you want to create a presentation about.",
                  icon: Upload
                },
                {
                  step: "2",
                  title: "AI Processing",
                  description: "Our advanced AI analyzes your content and automatically generates well-structured slides with professional design.",
                  icon: Sparkles
                },
                {
                  step: "3",
                  title: "Download & Present",
                  description: "Review your slides, make any adjustments, and download your PowerPoint presentation ready to use.",
                  icon: Download
                }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="relative">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold mb-4">
                        {item.step}
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-indigo-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">{item.title}</h3>
                      <p className="text-slate-600">{item.description}</p>
                    </div>
                    {index < 2 && (
                      <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-indigo-200 -translate-x-1/2"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">What Educators Say</h2>
              <p className="text-lg text-slate-600">Trusted by thousands of teachers worldwide</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "High School Teacher",
                  content: "EduSlide AI has transformed how I prepare for classes. What used to take hours now takes minutes!",
                  rating: 5
                },
                {
                  name: "Michael Chen",
                  role: "University Professor",
                  content: "The quality of presentations is outstanding. My students are more engaged than ever before.",
                  rating: 5
                },
                {
                  name: "Emily Rodriguez",
                  role: "Elementary Teacher",
                  content: "Simple to use and produces beautiful results. It's become an essential tool in my teaching toolkit.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-700 mb-4 italic">&ldquo;{testimonial.content}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-slate-800">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Teaching?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join thousands of educators who are saving time and creating better presentations
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-indigo-600 font-semibold text-lg shadow-lg hover:bg-slate-50 transition-all duration-200"
            >
              <Sparkles className="w-5 h-5" />
              <span>Start Creating Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-bold text-lg">EduSlide AI</span>
              </div>
              <p className="text-sm">Transform your teaching materials into professional presentations with AI.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/upload" className="hover:text-white transition-colors">Get Started</Link></li>
                <li><Link href="/#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-slate-800 text-center text-sm">
            <p>&copy; 2024 EduSlide AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}