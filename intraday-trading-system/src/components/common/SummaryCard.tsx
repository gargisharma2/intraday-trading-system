import type { ReactNode } from 'react';

interface SummaryCardProps {
  title: string;
  content: ReactNode;
  footer?: ReactNode;
}

const SummaryCard = ({ title, content, footer }: SummaryCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <h2 className="section-title mb-3">{title}</h2>
      <div className="text-sm text-text-secondary">
        {content}
      </div>
      {footer && <div className="mt-4 text-xs text-text-secondary">{footer}</div>}
    </div>
  );
};

export default SummaryCard;

