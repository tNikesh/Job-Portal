export default function Loading() {
    return (
      <div className="max-w-7xl mx-auto p-8 my-14 bg-white rounded-xl animate-pulse space-y-10">
        {/* Company Information */}
        <section className="space-y-6">
          <div className="h-6 w-56 bg-gray-300 rounded mb-4" />
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-300 rounded" />
              <div className="h-10 bg-gray-300 rounded" />
            </div>
  
            {/* Company Website */}
            <div className="space-y-2">
              <div className="h-4 w-28 bg-gray-300 rounded" />
              <div className="h-10 bg-gray-300 rounded" />
            </div>
  
            {/* Industry */}
            <div className="space-y-2">
              <div className="h-4 w-20 bg-gray-300 rounded" />
              <div className="h-10 bg-gray-300 rounded" />
            </div>
  
            {/* Company Description */}
            <div className="space-y-2">
              <div className="h-4 w-36 bg-gray-300 rounded" />
              <div className="h-20 bg-gray-300 rounded" />
            </div>
          </div>
  
          {/* Logo */}
          <div className="flex items-center gap-6">
            <div className="h-10 w-40 bg-gray-300 rounded" />
            <div className="h-24 w-24 bg-gray-300 rounded-lg border" />
          </div>
        </section>
  
        {/* Contact Information */}
        <section className="space-y-6">
          <div className="h-6 w-64 bg-gray-300 rounded mb-4" />
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-28 bg-gray-300 rounded" />
                <div className="h-10 bg-gray-300 rounded" />
              </div>
            ))}
          </div>
        </section>
  
        {/* Company Details */}
        <section className="space-y-6">
          <div className="h-6 w-52 bg-gray-300 rounded mb-4" />
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-28 bg-gray-300 rounded" />
                <div className="h-10 bg-gray-300 rounded" />
              </div>
            ))}
          </div>
        </section>
  
        {/* Save Button */}
        <div className="h-12 w-full bg-gray-400 rounded" />
      </div>
    );
  }
  