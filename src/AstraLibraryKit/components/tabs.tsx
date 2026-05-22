import { cn } from './utils'
import {
  Children,
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  useState
} from 'react'

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs?: Tab[];
  defaultTab?: string;
  content?: ReactNode;
  onChange?: (tabId: string) => void;
  className?: string;
  children?: ReactNode;
}

interface TabItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  active?: boolean;
  className?: string;
}

export function TabItem({
  label,
  active = false,
  className,
  ...rest
}: TabItemProps) {
  return (
    <button
      role="tab"
      aria-selected={active}
      className={cn(
        'px-4 py-2.5 text-label-sm font-medium transition-colors relative',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-inset',
        active
          ? 'text-brand-primary'
          : 'text-text-secondary hover:text-text-primary',
        className
      )}
      {...rest}
    >
      {label}
      {active && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />
      )}
    </button>
  );
}

function toTabId(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'tab';
}

function isTabItemElement(child: ReactNode): child is ReactElement<TabItemProps> {
  return isValidElement<TabItemProps>(child);
}

export function Tabs({
  tabs,
  defaultTab,
  content,
  onChange,
  className,
  children
}: TabsProps) {
  const tabItems = Children.toArray(children).filter(isTabItemElement);
  const childTabs = tabItems.map((child) => ({
    id: typeof child.props.value === 'string' && child.props.value.length > 0
      ? child.props.value
      : toTabId(child.props.label),
    label: child.props.label,
    content,
  }));
  const resolvedTabs = tabs ?? childTabs;
  const firstActiveChild = tabItems.find((child) => child.props.active);
  const firstActiveChildId = firstActiveChild
    ? typeof firstActiveChild.props.value === 'string' && firstActiveChild.props.value.length > 0
      ? firstActiveChild.props.value
      : toTabId(firstActiveChild.props.label)
    : undefined;
  const [activeTab, setActiveTab] = useState(defaultTab || firstActiveChildId || resolvedTabs[0]?.id || '');

  const handleSelect = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeContent = resolvedTabs.find(t => t.id === activeTab)?.content;

  return (
    <div className={cn('flex flex-col', className)}>
      <div role="tablist" className="flex border-b border-border-secondary">
        {tabs ? tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TabItem
              key={tab.id}
              label={tab.label}
              active={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => handleSelect(tab.id)}
            />
          );
        }) : tabItems.map((child) => {
          const tabId = typeof child.props.value === 'string' && child.props.value.length > 0
            ? child.props.value
            : toTabId(child.props.label);
          const isActive = activeTab === tabId;
          const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
            child.props.onClick?.(event);
            if (!event.defaultPrevented) {
              handleSelect(tabId);
            }
          };

          return cloneElement(child, {
            key: child.key ?? tabId,
            active: isActive,
            'aria-controls': `tabpanel-${tabId}`,
            onClick: handleClick,
          });
        })}
      </div>
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        className="pt-4"
      >
        {activeContent}
      </div>
    </div>
  );
}
