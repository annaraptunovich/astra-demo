// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=2-74
// source=src/AstraLibraryKit/components/button.tsx
// component=Button
import figma from 'figma'

const instance = figma.selectedInstance

const variant = instance.getEnum('Variant', {
  Primary: 'primary',
  Neutral: 'neutral',
  Subtle: 'subtle',
})

const size = instance.getEnum('Size', {
  Medium: 'medium',
  Small: 'small',
})

const state = instance.getEnum('State', {
  Default: 'default',
  Hover: 'hover',
  Disabled: 'disabled',
})

const showIconStart = instance.getBoolean('Show Icon Start')
const showIconEnd = instance.getBoolean('Show Icon End')
const iconStart = instance.getInstanceSwap('Icon Start')
const iconEnd = instance.getInstanceSwap('Icon End')
const labelText = instance.findText('Label')
const label = labelText.type === 'TEXT' ? labelText.textContent : 'Button'
const disabled = state === 'disabled'

let iconStartCode
if (showIconStart && iconStart?.type === 'INSTANCE') {
  iconStartCode = iconStart.executeTemplate().example
}

let iconEndCode
if (showIconEnd && iconEnd?.type === 'INSTANCE') {
  iconEndCode = iconEnd.executeTemplate().example
}

export default {
  example: figma.tsx`
    <Button
      variant="${variant}"
      size="${size}"
      ${iconStartCode ? figma.tsx`iconStart={${iconStartCode}}` : ''}
      ${iconEndCode ? figma.tsx`iconEnd={${iconEndCode}}` : ''}
      ${disabled ? 'disabled' : ''}
    >
      ${label}
    </Button>
  `,
  imports: ['import { Button } from "@/index"'],
  id: 'button',
  metadata: {
    nestable: true,
    props: {
      variant,
      size,
      disabled,
      iconStart: iconStartCode,
      iconEnd: iconEndCode,
      children: label,
    },
  },
}
