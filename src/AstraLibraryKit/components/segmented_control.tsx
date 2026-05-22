import { cn } from "./utils";
import {
  Children,
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  useState,
} from "react";

interface Segment {
  id: string;
  icon: ReactNode;
}

interface SegmentedControlProps {
  segments?: Segment[];
  selectedSegment?: string;
  defaultSelectedSegment?: string;
  onChange?: (segmentId: string) => void;
  className?: string;
  children?: ReactNode;
}

interface SegmentedControlItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "value"> {
  value?: string;
  icon: ReactNode;
  active?: boolean;
  className?: string;
}

export function SegmentedControlItem({
  value,
  icon,
  active = false,
  className,
  ...rest
}: SegmentedControlItemProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      value={value}
      className={cn(
        "flex size-[44px] items-center justify-center rounded-corner-md p-lg transition-colors",
        active ? "bg-[var(--ads-text-secondary)]" : "hover:bg-[var(--ads-tint-hover)]",
        className,
      )}
      {...rest}
    >
      <div
        className={cn(
          "flex size-5 items-center justify-center",
          active ? "text-on-brand" : "text-text-secondary",
        )}
      >
        {icon}
      </div>
    </button>
  );
}

function isSegmentedControlItemElement(
  child: ReactNode,
): child is ReactElement<SegmentedControlItemProps> {
  return isValidElement<SegmentedControlItemProps>(child) && child.type === SegmentedControlItem;
}

function getItemValue(child: ReactElement<SegmentedControlItemProps>, index: number) {
  return child.props.value || `segment-${index + 1}`;
}

export function SegmentedControl({
  segments,
  selectedSegment,
  defaultSelectedSegment,
  onChange,
  className,
  children,
}: SegmentedControlProps) {
  const childItems = Children.toArray(children).filter(isSegmentedControlItemElement);
  const childSegments = childItems.map((child, index) => ({
    id: getItemValue(child, index),
    icon: child.props.icon,
  }));
  const resolvedSegments = segments ?? childSegments;
  const firstActiveChildIndex = childItems.findIndex((child) => child.props.active);
  const firstActiveChildId = firstActiveChildIndex >= 0
    ? getItemValue(childItems[firstActiveChildIndex], firstActiveChildIndex)
    : undefined;
  const [uncontrolledSelected, setUncontrolledSelected] = useState(
    defaultSelectedSegment || firstActiveChildId || resolvedSegments[0]?.id || "",
  );
  const activeSegment = selectedSegment ?? uncontrolledSelected;

  const handleSelect = (segmentId: string) => {
    if (selectedSegment === undefined) {
      setUncontrolledSelected(segmentId);
    }
    onChange?.(segmentId);
  };

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={cn(
        "flex h-14 w-fit items-center gap-xs rounded-[14px] bg-[var(--ads-tint-faint)] px-md py-xs",
        className,
      )}
    >
      <div className="flex items-center gap-xs">
        {segments ? segments.map((segment) => {
          const isActive = segment.id === activeSegment;

          return (
            <SegmentedControlItem
              key={segment.id}
              value={segment.id}
              icon={segment.icon}
              active={isActive}
              onClick={() => handleSelect(segment.id)}
            />
          );
        }) : childItems.map((child, index) => {
          const segmentId = getItemValue(child, index);
          const isActive = segmentId === activeSegment;
          const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
            child.props.onClick?.(event);
            if (!event.defaultPrevented) {
              handleSelect(segmentId);
            }
          };

          return cloneElement(child, {
            key: child.key ?? segmentId,
            value: segmentId,
            active: isActive,
            onClick: handleClick,
          });
        })}
      </div>
    </div>
  );
}
