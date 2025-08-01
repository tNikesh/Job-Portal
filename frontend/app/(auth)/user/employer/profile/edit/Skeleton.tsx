

const Skeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-10 bg-gray-200 rounded"></div>
      ))}
    </div>
  )
}

export default Skeleton