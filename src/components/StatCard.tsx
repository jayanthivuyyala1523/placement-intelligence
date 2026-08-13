import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badgeText?: string;
  badgeVariant?: 'success' | 'warning' | 'danger' | 'info';
  icon: LucideIcon;
  iconBg?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  badgeText,
  badgeVariant = 'info',
  icon: Icon,
  iconBg = 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
}) => {
  const badgeStyles = {
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    danger: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    info: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  };

  return (
    <div className="glass-card relative overflow-hidden rounded-2xl p-5 transition-all duration-200 hover:border-slate-700/80 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
          <h3 className="mt-2 text-2xl font-extrabold text-white tracking-tight">{value}</h3>
          {subtitle && <p className="mt-1 text-xs text-slate-400 font-medium">{subtitle}</p>}
        </div>

        <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${iconBg} shadow-sm`}>
          <Icon className="h-5.5 w-5.5" />
        </div>
      </div>

      {badgeText && (
        <div className="mt-4 flex items-center gap-2">
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${badgeStyles[badgeVariant]}`}>
            {badgeText}
          </span>
        </div>
      )}
    </div>
  );
};
