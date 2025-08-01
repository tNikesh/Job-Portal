export default function Loading() {
    return (
      <div className="w-full space-y-6 animate-pulse">
        {/* Email Skeleton */}
        <div className="mb-4">
          <div className="h-4 w-20 bg-gray-300 rounded mb-2" /> {/* Label */}
          <div className="h-10 w-full bg-gray-300 rounded" /> {/* Input */}
        </div>
  
        {/* Password Skeleton */}
        <div className="mb-4">
          <div className="h-4 w-24 bg-gray-300 rounded mb-2" /> {/* Label */}
          <div className="h-10 w-full bg-gray-300 rounded" /> {/* Input */}
        </div>
  
        {/* Error Message Placeholder */}
        <div className="h-3 w-1/2 bg-gray-300 rounded mx-auto" />
  
        {/* Button Skeleton */}
        <div className="h-10 w-full bg-gray-400 rounded" />
      </div>
    );
  }
  