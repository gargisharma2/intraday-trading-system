import type { ReactNode } from 'react';

interface SectionHeaderProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionHeader = ({ icon, title, subtitle, className }: SectionHeaderProps) => {
  return (
    <div className={`flex items-start gap-3 mb-4 ${className ?? ''}`}>
      {icon && <div className="p-2 rounded-lg bg-accent bg-opacity-10">{icon}</div>}
      <div>
        <h2 className="section-title mb-0">{title}</h2>
        {subtitle && (
          <p className="text-xs text-text-secondary mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;

