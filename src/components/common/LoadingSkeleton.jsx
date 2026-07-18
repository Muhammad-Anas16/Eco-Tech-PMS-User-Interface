import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = ({ rows = 8, columns = 6, showHeader = true }) => {
  return (
    <div className="space-y-4">
      {/* Toolbar Skeleton */}
      {showHeader && (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-7 w-48 rounded-lg" />
            <Skeleton className="h-4 w-72 rounded-lg" />
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-10 w-64 rounded-xl" />
            <Skeleton className="h-10 w-28 rounded-xl" />
            <Skeleton className="h-10 w-32 rounded-xl" />
          </div>
        </div>
      )}

      {/* Table Skeleton */}
      <div className="overflow-hidden rounded-2xl border">
        {/* Table Header */}
        <div
          className="grid border-b bg-muted/40 p-4"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))`,
          }}
        >
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton key={index} className="h-5 w-24 rounded-md" />
          ))}
        </div>

        {/* Table Body */}
        <div>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid items-center border-b p-4 last:border-0"
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))`,
              }}
            >
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton key={colIndex} className="h-5 w-[90%] rounded-md" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
