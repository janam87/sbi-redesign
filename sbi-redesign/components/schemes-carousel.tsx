import { ArrowRight } from "lucide-react";
import { schemes } from "@/lib/data";

export function SchemesCarousel() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">
          Schemes & Benefits for You
        </h3>
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View all
        </button>
      </div>

      {/* Horizontal scroll */}
      <div className="mt-4 flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {schemes.map((scheme) => (
          <div
            key={scheme.id}
            className="min-w-[240px] rounded-[14px] border border-border bg-white p-5 shrink-0"
          >
            {/* Icon */}
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${scheme.bgColor} text-lg`}
            >
              {scheme.icon}
            </div>

            {/* Content */}
            <h4 className="mt-3 text-sm font-semibold text-foreground">
              {scheme.title}
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {scheme.description}
            </p>

            {/* Link */}
            <button className="mt-3 flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
              Learn more
              <ArrowRight className="size-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
