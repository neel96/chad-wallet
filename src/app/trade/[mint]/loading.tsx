import { Skeleton } from "@/components/ui/Skeleton";

export default function TradeLoading() {
  return (
    <div className="hidden md:grid h-screen" style={{ gridTemplateColumns: "280px 1fr 360px" }}>
      {/* Left skeleton */}
      <div className="border-r border-[#1f1f1f] p-3 space-y-2">
        <Skeleton className="h-4 w-20 mb-4" />
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="size-8 rounded-full" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-2.5 w-10" />
            </div>
            <Skeleton className="h-3 w-12" />
          </div>
        ))}
      </div>

      {/* Middle skeleton */}
      <div className="border-x border-[#1f1f1f] flex flex-col">
        <div className="p-4 border-b border-[#1f1f1f] flex items-center gap-4">
          <Skeleton className="size-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <Skeleton className="flex-1 rounded-none" />
      </div>

      {/* Right skeleton */}
      <div className="p-4 space-y-4">
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-14 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}
