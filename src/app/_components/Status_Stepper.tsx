'use client';

import React from 'react';
import { Check, AlertTriangle, XCircle, Gavel } from 'lucide-react';

export enum TaskStatus {
  Assigned = 'assigned',
  Cancelled = 'cancelled',
  Completed = 'completed',
  Disputed = 'disputed',
  InProgress = 'in_progress',
  Open = 'open',
  Overdue = 'overdue',
}

type FlowStatus =
  | TaskStatus.Open
  | TaskStatus.Assigned
  | TaskStatus.InProgress
  | TaskStatus.Completed;

const FLOW: FlowStatus[] = [
  TaskStatus.Open,
  TaskStatus.Assigned,
  TaskStatus.InProgress,
  TaskStatus.Completed,
];

const LABELS: Record<TaskStatus, string> = {
  [TaskStatus.Open]: 'Нээлттэй',
  [TaskStatus.Assigned]: 'Хуваарилсан',
  [TaskStatus.InProgress]: 'Хийгдэж байна',
  [TaskStatus.Completed]: 'Дууссан',
  [TaskStatus.Cancelled]: 'Цуцлагдсан',
  [TaskStatus.Disputed]: 'Маргаантай',
  [TaskStatus.Overdue]: 'Хугацаа хэтэрсэн',
};

const isTerminal = (s: TaskStatus) =>
  s === TaskStatus.Cancelled || s === TaskStatus.Disputed;
const isWarning = (s: TaskStatus) => s === TaskStatus.Overdue;

function resolveFlow(status: TaskStatus): FlowStatus {
  switch (status) {
    case TaskStatus.Open:
    case TaskStatus.Assigned:
    case TaskStatus.InProgress:
    case TaskStatus.Completed:
      return status;
    case TaskStatus.Cancelled:
    case TaskStatus.Disputed:
    case TaskStatus.Overdue:
      return TaskStatus.InProgress;
  }
}

const cx = (...xs: Array<string | false | undefined>) =>
  xs.filter(Boolean).join(' ');

export function TaskStatusStepper({
  status,
  className,
  onChange,
}: {
  status: TaskStatus;
  className?: string;
  onChange?: (next: FlowStatus) => void;
}) {
  const flowStatus = resolveFlow(status);
  const idx = Math.max(0, FLOW.indexOf(flowStatus));
  const pct = (idx / (FLOW.length - 1)) * 100;

  const barColor = isTerminal(status)
    ? 'bg-destructive'
    : isWarning(status)
      ? 'bg-amber-500'
      : 'bg-primary';

  return (
    <div className={cx('w-full', className)}>
      <div className="relative">
        <div className="absolute left-0 right-0 top-4 h-0.5 rounded bg-muted" />
        <div
          className={cx(
            'absolute left-0 top-4 h-0.5 rounded transition-[width] duration-300',
            barColor
          )}
          style={{ width: `${pct}%` }}
        />

        <ol className="relative z-10 flex justify-between">
          {FLOW.map((step, i) => {
            const done =
              i < idx || (i === idx && step === TaskStatus.Completed);
            const current = i === idx && step !== TaskStatus.Completed;
            const clickable = Boolean(onChange) && step !== flowStatus;

            const baseCircle =
              'grid h-8 w-8 place-items-center rounded-full border text-xs transition-colors';
            const circle = done
              ? 'bg-primary text-primary-foreground border-primary'
              : current
                ? cx(
                    'bg-background text-primary border-primary',
                    isTerminal(status) && 'ring-2 ring-destructive/30',
                    isWarning(status) && 'ring-2 ring-amber-400/40'
                  )
                : 'bg-muted text-muted-foreground border-muted';

            const content = done ? <Check className="h-4 w-4" /> : i + 1;

            const Label = (
              <span
                className={cx(
                  'mt-2 text-[11px] leading-4',
                  current
                    ? 'font-medium text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {LABELS[step]}
              </span>
            );

            const Node = (
              <span
                className={cx(baseCircle, circle)}
                aria-current={current ? 'step' : undefined}
              >
                {content}
              </span>
            );

            return (
              <li key={step} className="flex flex-col items-center text-center">
                {clickable ? (
                  <button
                    type="button"
                    onClick={() => onChange?.(step)}
                    className="focus:outline-none"
                    aria-label={`Set status to ${LABELS[step]}`}
                  >
                    {Node}
                    {Label}
                  </button>
                ) : (
                  <>
                    {Node}
                    {Label}
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
      <div className="mt-2 flex items-center gap-2">
        {isWarning(status) && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-700">
            <AlertTriangle className="h-3.5 w-3.5" />
            {LABELS[TaskStatus.Overdue]}
          </span>
        )}
        {status === TaskStatus.Cancelled && (
          <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[11px] font-medium text-destructive">
            <XCircle className="h-3.5 w-3.5" />
            {LABELS[TaskStatus.Cancelled]}
          </span>
        )}
        {status === TaskStatus.Disputed && (
          <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[11px] font-medium text-destructive">
            <Gavel className="h-3.5 w-3.5" />
            {LABELS[TaskStatus.Disputed]}
          </span>
        )}
      </div>
    </div>
  );
}
