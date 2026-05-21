import { cn } from './utils'
import { ReactNode, useState } from 'react'
import { DurationBadge } from './duration_badge'

interface ItemSelectProps {
  title?: string;
  updated?: string;
  spec?: string;
  duration?: string;
  thumbnail?: ReactNode;
  selected?: boolean;
  defaultSelected?: boolean;
  onChange?: (selected: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function ItemSelect({
  title = 'Item Title',
  updated = 'Edited 2m ago',
  spec = '4K',
  duration = '0:01:30',
  thumbnail,
  selected,
  defaultSelected = false,
  onChange,
  disabled = false,
  className
}: ItemSelectProps) {
  const isControlled = selected !== undefined;
  const [internalSelected, setInternalSelected] = useState(defaultSelected);
  const isSelected = isControlled ? selected : internalSelected;

  const handleToggle = () => {
    if (disabled) return;
    const next = !isSelected;
    if (!isControlled) setInternalSelected(next);
    onChange?.(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      role="checkbox"
      aria-checked={isSelected}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex flex-col items-start overflow-clip rounded-corner-md w-[305px] select-none',
        'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {/* Thumbnail */}
      <div
        onDragStart={(e) => e.preventDefault()}
        className={cn(
          'relative w-full aspect-[305/170] overflow-clip rounded-corner-md',
          'border-2 transition-colors',
          '[&_img]:select-none [&_img]:[-webkit-user-drag:none]',
          isSelected ? 'border-brand-primary' : 'border-transparent'
        )}
        style={!thumbnail ? { backgroundColor: '#868686' } : undefined}
      >
        {thumbnail && (
          <div className="absolute inset-0">
            {thumbnail}
          </div>
        )}
        {duration && (
          <DurationBadge duration={duration} className="absolute bottom-4 right-4 z-10" />
        )}
      </div>

      {/* Content */}
      <div className="flex gap-2 items-center w-full">
        <div className="flex flex-1 min-w-0 flex-col gap-1 items-start py-3 text-content-text">
          <p className="text-label font-medium whitespace-nowrap">{title}</p>
          <p className="text-video-title whitespace-nowrap">
            {updated} · {spec}
          </p>
        </div>
        <div
          aria-hidden="true"
          className={cn(
            'flex items-center justify-center size-5 shrink-0 rounded border-[1.5px] transition-colors',
            isSelected
              ? 'bg-brand-primary border-brand-primary'
              : 'bg-transparent border-field-border'
          )}
        >
          {isSelected && (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="text-on-brand"
            >
              <path
                d="M2.5 6L5 8.5L9.5 3.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
