import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton-shimmer rounded", className)} />;
}

export function SectionSkeleton({ rows = 2 }: { rows?: number }) {
  return (
    <div className="space-y-4" aria-live="polite" aria-busy="true">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/4" />
          <Skeleton className="h-3 w-1/5" />
        </div>
      ))}
    </div>
  );
}
