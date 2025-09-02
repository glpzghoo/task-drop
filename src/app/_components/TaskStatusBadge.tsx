import { Badge } from '@/components/ui/badge';
import { statusMeta } from '../dashboard/utils/helpers';
import { Task } from '@/graphql/generated';
import { cn } from '@/lib/utils';

export const TaskStatusBadge = ({ task }: { task: Task }) => {
  const meta = statusMeta[task.status];
  const Icon = meta.icon;
  return (
    <Badge
      className={cn(
        'px-2 py-0.5 text-[11px] font-semibold',
        meta.tone === 'good' && 'bg-emerald-500 text-emerald-50',
        meta.tone === 'bad' && 'bg-destructive text-destructive-foreground',
        meta.tone === 'warn' && 'bg-amber-500 text-amber-50'
      )}
    >
      <span className="inline-flex items-center gap-1">
        <Icon className="h-3.5 w-3.5" />
        {meta.label}
      </span>
    </Badge>
  );
};
