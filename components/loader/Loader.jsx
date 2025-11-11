"use client";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-red-400 animate-spin [animation-direction:reverse]"></div>
      </div>
      <p className="absolute bottom-20 text-gray-200 text-sm tracking-wide animate-pulse">
        Loading Awesome Content...
      </p>
    </div>
  );
}

