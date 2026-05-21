import { cn } from './utils'
import { ReactNode } from 'react'
import { DurationBadge } from './duration_badge'

interface ItemCardFeaturedProps {
  title?: string;
  meta?: string;
  duration?: string;
  variant?: 'overlay' | 'stacked';
  thumbnail?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function ItemCardFeatured({
  title = 'Item Title',
  meta = 'Edited 2m ago · 4K',
  duration = '0:01:30',
  variant = 'overlay',
  thumbnail,
  children,
  className
}: ItemCardFeaturedProps) {
  const isOverlay = variant === 'overlay'

  return (
    <div
      className={cn(
        'flex flex-col items-start overflow-clip rounded-corner-md min-w-0',
        isOverlay && 'aspect-[522/291]',
        className
      )}
    >
      {/* Thumbnail */}
      <div
        className={cn(
          'relative w-full overflow-clip',
          isOverlay ? 'flex-1 min-h-0 rounded-corner-md' : 'aspect-video rounded-corner-md'
        )}
        style={!thumbnail ? { backgroundColor: '#868686' } : undefined}
      >
        {thumbnail && (
          <div className="absolute inset-0">
            {thumbnail}
          </div>
        )}

        {duration && (
          <DurationBadge
            duration={duration}
            className="absolute top-4 right-4 z-10"
          />
        )}

        {isOverlay && (
          <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 items-start justify-end p-3 backdrop-blur-[4px] text-overlay-text">
            <div className="flex flex-col gap-1 items-start w-full">
              <p className="text-heading font-medium w-full">{title}</p>
              <p className="text-video-title w-full">{meta}</p>
            </div>
            {children && (
              <div className="flex flex-wrap gap-1.5 items-start w-full">
                {children}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info (stacked only) */}
      {!isOverlay && (
        <div className="flex flex-col gap-3 items-start w-full p-3 text-content-text">
          <div className="flex flex-col gap-1 items-start w-full">
            <p className="text-heading font-medium w-full">{title}</p>
            <p className="text-video-title w-full">{meta}</p>
          </div>
          {children && (
            <div className="flex flex-wrap gap-1.5 items-start w-full">
              {children}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
