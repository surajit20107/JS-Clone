function SkeletonBox({ className = "" }) {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200 rounded-md ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </div>
  );
}

export default function SkeletonLoader({ count = 8 }) {
  return (
    <div className="p-4 space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center p-3 space-x-4 bg-white rounded-lg shadow-sm"
        >
          {/* Avatar */}
          <SkeletonBox className="w-12 h-12 rounded-full" />

          {/* Text lines */}
          <div className="flex-1 space-y-2">
            <SkeletonBox className="h-4 w-3/4" />
            <SkeletonBox className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
