export const SkeletonCard = () => (
    <div className="shrink-0 snap-start w-full text-blue-950 space-y-5 rounded-lg shadow-sm bg-white p-6 animate-pulse">
      <div className="flex justify-between items-center gap-2">
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-32"></div>
          <div className="h-3 bg-gray-300 rounded w-20"></div>
        </div>
        <div className="h-8 w-8 bg-gray-300 rounded"></div>
      </div>
  
      <div className="h-12 bg-gray-300 rounded"></div>
  
      <div className="flex gap-3">
        <div className="h-4 bg-gray-300 rounded w-20"></div>
        <div className="h-4 bg-gray-300 rounded w-20"></div>
      </div>
  
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="h-5 bg-gray-300 rounded w-32"></div>
          <div className="h-3 bg-gray-300 rounded w-16"></div>
        </div>
        <div className="h-10 w-28 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
  