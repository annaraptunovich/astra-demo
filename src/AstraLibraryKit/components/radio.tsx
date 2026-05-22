import { cn } from './utils'
import { Children, cloneElement, isValidElement, KeyboardEvent, ReactNode, useState } from 'react'

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioFieldProps {
  value?: string;
  label?: string;
  description?: string;
  hasDescription?: boolean;
  showLabel?: boolean;
  selected?: boolean;
  defaultSelected?: boolean;
  onChange?: (selected: boolean) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
}

interface RadioGroupProps {
  options?: RadioOption[];
  children?: ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
}

export function RadioField({
  value,
  label = 'Label',
  description = 'Description',
  hasDescription = true,
  showLabel = true,
  selected: selectedProp,
  defaultSelected = false,
  onChange,
  name,
  disabled = false,
  className
}: RadioFieldProps) {
  const isControlled = selectedProp !== undefined;
  const [internalSelected, setInternalSelected] = useState(defaultSelected);
  const selected = isControlled ? selectedProp : internalSelected;

  const handleSelect = () => {
    if (disabled) return;
    if (!isControlled) setInternalSelected(true);
    onChange?.(true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      handleSelect();
    }
  };

  return (
    <label
      className={cn(
        'flex gap-3 items-start cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <button
        role="radio"
        type="button"
        aria-checked={selected}
        aria-label={label || value}
        name={name}
        value={value}
        onClick={handleSelect}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={cn(
          'relative flex items-center justify-center size-5 shrink-0 rounded-full mt-0.5',
          'border transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary',
          'disabled:cursor-not-allowed',
          selected
            ? 'border-brand-primary'
            : 'border-border-primary hover:border-text-secondary'
        )}
      >
        {selected && (
          <div className="size-2.5 rounded-full bg-brand-primary" />
        )}
      </button>
      {(showLabel || hasDescription) && (
        <div className="flex flex-col gap-1 min-w-0">
          {showLabel && label && (
            <span className="text-label text-text-primary">{label}</span>
          )}
          {hasDescription && description && (
            <span className="text-label-sm text-text-secondary">{description}</span>
          )}
        </div>
      )}
    </label>
  );
}

export function RadioGroup({
  options = [],
  children,
  value: controlledValue,
  defaultValue = '',
  onChange,
  name,
  disabled = false,
  className
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selected = controlledValue !== undefined ? controlledValue : internalValue;

  const handleSelect = (value: string) => {
    if (disabled) return;
    if (controlledValue === undefined) {
      setInternalValue(value);
    }
    onChange?.(value);
  };

  const renderChildFields = () => {
    return Children.map(children, (child) => {
      if (!isValidElement<RadioFieldProps>(child) || child.type !== RadioField) {
        return child;
      }

      const childValue = child.props.value ?? child.props.label ?? '';
      const hasGroupSelection = selected !== '';

      return cloneElement(child, {
        name,
        disabled: disabled || child.props.disabled,
        selected: hasGroupSelection ? selected === childValue : child.props.selected,
        onChange: (nextSelected: boolean) => {
          child.props.onChange?.(nextSelected);
          if (nextSelected && childValue) handleSelect(childValue);
        },
      });
    });
  };

  return (
    <div role="radiogroup" className={cn('flex flex-col gap-3', className)}>
      {children
        ? renderChildFields()
        : options.map((option) => (
            <RadioField
              key={option.value}
              value={option.value}
              label={option.label}
              description={option.description ?? ''}
              hasDescription={option.description !== undefined}
              selected={selected === option.value}
              onChange={() => handleSelect(option.value)}
              name={name}
              disabled={disabled}
            />
          ))}
    </div>
  );
}
