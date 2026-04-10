import { quickServices } from "@/lib/data";

export function QuickServices() {
  return (
    <div>
      <h3 className="font-semibold text-foreground">Quick Services</h3>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {quickServices.map((service) => (
          <button
            key={service.label}
            className="flex flex-col items-center gap-2 rounded-xl bg-slate-50 px-4 py-4 transition-colors hover:bg-slate-100"
          >
            <span className="text-2xl">{service.icon}</span>
            <span className="text-xs font-medium text-muted-foreground">
              {service.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
