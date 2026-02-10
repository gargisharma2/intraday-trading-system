import { motion } from 'framer-motion';

export interface TimelineItem {
  id: string;
  timestamp: string;
  title: string;
  description?: string;
  tag?: string;
}

interface VerticalTimelineProps {
  items: TimelineItem[];
}

const VerticalTimeline = ({ items }: VerticalTimelineProps) => {
  return (
    <div className="relative">
      <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-200" />
      <div className="space-y-4 pl-6 max-h-[260px] overflow-y-auto">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="relative"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.03 }}
          >
            <div className="absolute left-[-6px] w-3 h-3 rounded-full bg-accent" />
            <div className="text-[11px] text-text-secondary mb-0.5">{item.timestamp}</div>
            <div className="text-xs font-semibold text-text-primary">{item.title}</div>
            {item.description && (
              <div className="text-[11px] text-text-secondary mt-0.5">{item.description}</div>
            )}
            {item.tag && (
              <span className="inline-flex mt-1 px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200 text-[10px] font-medium text-text-secondary">
                {item.tag}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VerticalTimeline;

