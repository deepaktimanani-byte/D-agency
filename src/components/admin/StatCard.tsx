import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: "navy" | "teal" | "orange" | "purple";
}

const COLOR_MAP = {
  navy: "bg-navy/10 text-navy",
  teal: "bg-accent-teal/10 text-accent-teal",
  orange: "bg-orange-100 text-orange-600",
  purple: "bg-purple-100 text-purple-600",
};

export function StatCard({ label, value, icon: Icon, trend, trendUp, color = "navy" }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", COLOR_MAP[color])}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full",
            trendUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
          )}>
            {trendUp ? "↑" : "↓"} {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-extrabold text-heading">{value}</p>
        <p className="text-body text-sm mt-0.5">{label}</p>
      </div>
    </div>
  );
}
