import { useState, useEffect } from "react";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showZoomAnimation, setShowZoomAnimation] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setShowZoomAnimation(true);
    }, 3000);

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3500); // Reduced from 4500 to 3500 (only 500ms after zoom starts)

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  return (
    <div className="flex items-center justify-center relative overflow-hidden">
      {/* Concentric circles container */}
      <div
        className={`relative w-64 h-64 transition-opacity duration-1000 ${
          !isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Outer circle - clockwise */}
        <div className="absolute inset-0 animate-spin">
          <svg
            width="256"
            height="256"
            viewBox="0 0 256 256"
            className="w-full h-full"
          >
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="3"
              strokeDasharray="8 8"
              strokeLinecap="round"
              opacity={0.4}
            />
          </svg>
        </div>

        {/* Middle circle - counter-clockwise */}
        <div
          className="absolute inset-8 animate-spin"
          style={{ animationDirection: "reverse" }}
        >
          <svg
            width="192"
            height="192"
            viewBox="0 0 192 192"
            className="w-full h-full"
          >
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="#6366F1"
              strokeWidth="3"
              strokeDasharray="6 6"
              strokeLinecap="round"
              opacity={0.6}
            />
          </svg>
        </div>

        {/* Inner circle - clockwise */}
        <div className="absolute inset-16 animate-spin">
          <svg
            width="128"
            height="128"
            viewBox="0 0 128 128"
            className="w-full h-full"
          >
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="3"
              strokeDasharray="4 4"
              strokeLinecap="round"
              opacity={0.8}
            />
          </svg>
        </div>
      </div>

      {/* Logo positioned at absolute center of viewport */}
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div
          className={`transition-all duration-1000 ease-in-out ${
            fadeOut ? "opacity-0" : "opacity-100"
          } ${
            showZoomAnimation ? "transform scale-[25]" : "transform scale-100"
          }`}
        >
          <div className="text-4xl font-bold">
            <img
              src="/logo.svg"
              alt="logo"
              className="inline-block w-16 h-16"
            />
          </div>
        </div>
      </div>

      {/* Full screen background overlay that appears during zoom */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-1000 ${
          showZoomAnimation && !fadeOut ? "opacity-100 z-40" : "opacity-0 -z-10"
        }`}
      />
    </div>
  );
};

export default Loader;