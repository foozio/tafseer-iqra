import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate-200 dark:bg-slate-800",
        className
      )}
      {...props}
    />
  )
}

// Islamic-themed skeleton components
function SurahCardSkeleton() {
  return (
    <div className="p-6 border rounded-xl bg-white dark:bg-slate-800 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <Skeleton className="w-14 h-14 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
        <Skeleton className="w-6 h-6 rounded-full" />
      </div>
      
      <div className="space-y-3 mb-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  )
}

function SearchResultSkeleton() {
  return (
    <div className="p-4 border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-start space-x-4">
        <Skeleton className="w-10 h-10 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex items-center space-x-2 mt-3">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureSkeleton() {
  return (
    <div className="text-center">
      <div className="relative mb-8">
        <Skeleton className="w-20 h-20 rounded-3xl mx-auto" />
        <Skeleton className="absolute -top-2 -right-2 w-8 h-8 rounded-full" />
      </div>
      <Skeleton className="h-6 w-3/4 mx-auto mb-4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6 mx-auto" />
        <Skeleton className="h-4 w-4/5 mx-auto" />
      </div>
    </div>
  )
}

function StatsSkeleton() {
  return (
    <div className="text-center">
      <Skeleton className="w-20 h-20 rounded-2xl mx-auto mb-4" />
      <Skeleton className="h-5 w-16 mx-auto mb-2" />
      <Skeleton className="h-4 w-20 mx-auto" />
    </div>
  )
}

export { 
  Skeleton, 
  SurahCardSkeleton, 
  SearchResultSkeleton, 
  FeatureSkeleton, 
  StatsSkeleton 
}