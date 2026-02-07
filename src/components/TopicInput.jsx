"use client";

export default function TopicInput({ topic, setTopic }) {
  return (
    <div className="w-full">
      <textarea
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="e.g., Introduction to Quantum Physics, World War II History, Python Programming Basics..."
        className="w-full min-h-[150px] px-6 py-4 bg-linear-to-br from-slate-800/60 to-slate-900/60 border-2 border-slate-600 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none font-medium text-base"
      />
    </div>
  );
}
