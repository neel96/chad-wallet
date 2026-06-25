import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  count?: number;
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded bg-[#1f1f1f]",
        className
      )}
    />
  );
}

export function SkeletonRow({ count = 5 }: SkeletonProps) {
  return (
    <div className="flex flex-col gap-2 p-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="size-8 rounded-full shrink-0" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-2.5 w-14" />
          </div>
          <div className="space-y-1.5 text-right">
            <Skeleton className="h-3 w-16 ml-auto" />
            <Skeleton className="h-2.5 w-10 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}
