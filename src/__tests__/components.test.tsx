import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { Button } from '../AstraLibraryKit/components/button'
import { Badge } from '../AstraLibraryKit/components/badge'
import { SwitchField } from '../AstraLibraryKit/components/switch_field'
import { Checkbox } from '../AstraLibraryKit/components/checkbox'
import { RadioField, RadioGroup } from '../AstraLibraryKit/components/radio'
import { Toast } from '../AstraLibraryKit/components/toast'
import { TabItem, Tabs } from '../AstraLibraryKit/components/tabs'
import { SegmentedControl, SegmentedControlItem } from '../AstraLibraryKit/components/segmented_control'
import { cn } from '../AstraLibraryKit/components/utils'

afterEach(cleanup)

describe('cn utility', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible')
  })

  it('merges conflicting tailwind classes', () => {
    expect(cn('px-4', 'px-2')).toBe('px-2')
  })
})

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('applies primary variant by default', () => {
    render(<Button>Primary</Button>)
    const btn = screen.getByRole('button', { name: /primary/i })
    expect(btn.className).toContain('bg-brand-primary')
  })

  it('applies neutral variant', () => {
    render(<Button variant="neutral">Neutral</Button>)
    const btn = screen.getByRole('button', { name: /neutral/i })
    expect(btn.className).toContain('border-brand-primary')
  })

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button', { name: /disabled/i })).toBeDisabled()
  })

  it('fires onClick', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button', { name: /click/i }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders start and end icons', () => {
    render(
      <Button iconStart={<span data-testid="start" />} iconEnd={<span data-testid="end" />}>
        With Icons
      </Button>
    )
    expect(screen.getByTestId('start')).toBeInTheDocument()
    expect(screen.getByTestId('end')).toBeInTheDocument()
  })
})

describe('Badge', () => {
  it('renders with label', () => {
    render(<Badge label="New" />)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('defaults to "Label" text', () => {
    render(<Badge />)
    expect(screen.getByText('Label')).toBeInTheDocument()
  })

  it('shows remove button when removable', () => {
    render(<Badge removable label="Tag" />)
    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument()
  })

  it('does not show remove button by default', () => {
    render(<Badge label="Tag" />)
    expect(screen.queryByRole('button', { name: /remove/i })).not.toBeInTheDocument()
  })

  it('calls onRemove when remove is clicked', () => {
    const onRemove = vi.fn()
    render(<Badge removable onRemove={onRemove} label="Tag" />)
    fireEvent.click(screen.getByRole('button', { name: /remove/i }))
    expect(onRemove).toHaveBeenCalledOnce()
  })
})

describe('SwitchField', () => {
  it('renders label and description', () => {
    render(<SwitchField label="Dark mode" description="Enable dark theme" />)
    expect(screen.getByText('Dark mode')).toBeInTheDocument()
    expect(screen.getByText('Enable dark theme')).toBeInTheDocument()
  })

  it('toggles on click', () => {
    const onChange = vi.fn()
    render(<SwitchField label="Toggle" onChange={onChange} defaultSelected={false} />)
    const switchBtn = screen.getByRole('switch')
    expect(switchBtn).toHaveAttribute('aria-checked', 'false')

    fireEvent.click(switchBtn)
    expect(onChange).toHaveBeenCalledWith(true)
    expect(switchBtn).toHaveAttribute('aria-checked', 'true')
  })

  it('supports selected as controlled state', () => {
    const onChange = vi.fn()
    const { rerender } = render(<SwitchField label="Toggle" selected={false} onChange={onChange} />)

    const switchBtn = screen.getByRole('switch')
    expect(switchBtn).toHaveAttribute('aria-checked', 'false')

    fireEvent.click(switchBtn)
    expect(onChange).toHaveBeenCalledWith(true)
    expect(switchBtn).toHaveAttribute('aria-checked', 'false')

    rerender(<SwitchField label="Toggle" selected onChange={onChange} />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  })

  it('does not toggle when disabled', () => {
    const onChange = vi.fn()
    render(<SwitchField label="Toggle" onChange={onChange} disabled />)
    const switchBtn = screen.getByRole('switch')
    fireEvent.click(switchBtn)
    expect(onChange).not.toHaveBeenCalled()
  })
})

describe('Checkbox', () => {
  it('supports defaultChecked as uncontrolled initial state', () => {
    const onChange = vi.fn()
    render(<Checkbox label="Include audio" defaultChecked onChange={onChange} />)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('aria-checked', 'true')

    fireEvent.click(checkbox)
    expect(onChange).toHaveBeenCalledWith(false)
    expect(checkbox).toHaveAttribute('aria-checked', 'false')
  })

  it('supports checked as controlled state', () => {
    const onChange = vi.fn()
    const { rerender } = render(<Checkbox label="Include audio" checked={false} onChange={onChange} />)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('aria-checked', 'false')

    fireEvent.click(checkbox)
    expect(onChange).toHaveBeenCalledWith(true)
    expect(checkbox).toHaveAttribute('aria-checked', 'false')

    rerender(<Checkbox label="Include audio" checked onChange={onChange} />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true')
  })
})

describe('RadioField', () => {
  it('supports selected as controlled state', () => {
    const onChange = vi.fn()
    const { rerender } = render(<RadioField value="email" label="Email" selected={false} onChange={onChange} />)

    const radio = screen.getByRole('radio', { name: /email/i })
    expect(radio).toHaveAttribute('aria-checked', 'false')

    fireEvent.click(radio)
    expect(onChange).toHaveBeenCalledWith(true)
    expect(radio).toHaveAttribute('aria-checked', 'false')

    rerender(<RadioField value="email" label="Email" selected onChange={onChange} />)
    expect(screen.getByRole('radio', { name: /email/i })).toHaveAttribute('aria-checked', 'true')
  })

  it('supports defaultSelected as uncontrolled initial state', () => {
    const onChange = vi.fn()
    render(<RadioField value="email" label="Email" defaultSelected onChange={onChange} />)

    const radio = screen.getByRole('radio', { name: /email/i })
    expect(radio).toHaveAttribute('aria-checked', 'true')

    fireEvent.click(radio)
    expect(onChange).toHaveBeenCalledWith(true)
    expect(radio).toHaveAttribute('aria-checked', 'true')
  })
})

describe('RadioGroup', () => {
  it('keeps the options array API working', () => {
    const onChange = vi.fn()
    render(
      <RadioGroup
        defaultValue="clips"
        onChange={onChange}
        options={[
          { value: 'clips', label: 'Clips' },
          { value: 'audio', label: 'Audio', description: 'Include audio stems' },
        ]}
      />
    )

    expect(screen.getByRole('radio', { name: /clips/i })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('radio', { name: /audio/i })).toHaveAttribute('aria-checked', 'false')

    fireEvent.click(screen.getByRole('radio', { name: /audio/i }))
    expect(onChange).toHaveBeenCalledWith('audio')
    expect(screen.getByRole('radio', { name: /clips/i })).toHaveAttribute('aria-checked', 'false')
    expect(screen.getByRole('radio', { name: /audio/i })).toHaveAttribute('aria-checked', 'true')
  })

  it('supports nested RadioField children', () => {
    const onChange = vi.fn()
    render(
      <RadioGroup defaultValue="clips" onChange={onChange}>
        <RadioField value="clips" label="Clips" />
        <RadioField value="audio" label="Audio" description="Include audio stems" />
      </RadioGroup>
    )

    expect(screen.getByRole('radio', { name: /clips/i })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('radio', { name: /audio/i })).toHaveAttribute('aria-checked', 'false')

    fireEvent.click(screen.getByRole('radio', { name: /audio/i }))
    expect(onChange).toHaveBeenCalledWith('audio')
    expect(screen.getByRole('radio', { name: /audio/i })).toHaveAttribute('aria-checked', 'true')
  })
})

describe('Toast', () => {
  it('renders message', () => {
    render(<Toast message="Saving..." />)
    expect(screen.getByText('Saving...')).toBeInTheDocument()
  })

  it('shows cancel button by default', () => {
    render(<Toast message="Working" />)
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('hides cancel button when showCancel is false', () => {
    render(<Toast message="Working" showCancel={false} />)
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument()
  })

  it('calls onCancel when cancel is clicked', () => {
    const onCancel = vi.fn()
    render(<Toast message="Working" onCancel={onCancel} />)
    fireEvent.click(screen.getByText('Cancel'))
    expect(onCancel).toHaveBeenCalledOnce()
  })
})

describe('TabItem', () => {
  it('renders label and active state', () => {
    render(<TabItem label="Details" active />)
    const tab = screen.getByRole('tab', { name: /details/i })
    expect(tab).toHaveAttribute('aria-selected', 'true')
    expect(tab.className).toContain('text-brand-primary')
  })
})

describe('Tabs', () => {
  it('switches active content', () => {
    render(
      <Tabs
        tabs={[
          { id: 'details', label: 'Details', content: <p>Details content</p> },
          { id: 'activity', label: 'Activity', content: <p>Activity content</p> },
        ]}
      />
    )

    expect(screen.getByText('Details content')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('tab', { name: /activity/i }))
    expect(screen.getByText('Activity content')).toBeInTheDocument()
  })

  it('supports TabItem children for slotted tab lists', () => {
    render(
      <Tabs content={<p>Shared tab content</p>}>
        <TabItem label="Details" />
        <TabItem label="Activity" />
      </Tabs>
    )

    expect(screen.getByText('Shared tab content')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('tab', { name: /activity/i }))
    expect(screen.getByRole('tab', { name: /activity/i })).toHaveAttribute('aria-selected', 'true')
  })
})

describe('SegmentedControl', () => {
  it('supports the existing segments array API', () => {
    const onChange = vi.fn()
    render(
      <SegmentedControl
        segments={[
          { id: 'preview', icon: <span>P</span> },
          { id: 'timeline', icon: <span>T</span> },
        ]}
        selectedSegment="preview"
        onChange={onChange}
      />
    )

    fireEvent.click(screen.getByRole('tab', { name: /t/i }))
    expect(onChange).toHaveBeenCalledWith('timeline')
  })

  it('supports SegmentedControlItem children for slotted segments', () => {
    render(
      <SegmentedControl>
        <SegmentedControlItem value="preview" icon={<span>P</span>} active />
        <SegmentedControlItem value="timeline" icon={<span>T</span>} />
      </SegmentedControl>
    )

    expect(screen.getByRole('tab', { name: /p/i })).toHaveAttribute('aria-selected', 'true')
    fireEvent.click(screen.getByRole('tab', { name: /t/i }))
    expect(screen.getByRole('tab', { name: /t/i })).toHaveAttribute('aria-selected', 'true')
  })
})
