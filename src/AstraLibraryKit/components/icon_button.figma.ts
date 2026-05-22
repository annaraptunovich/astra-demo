// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=21-38
// source=src/AstraLibraryKit/components/icon_button.tsx
// component=IconButton
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

const disabled = state === 'disabled'

const icon = instance.getInstanceSwap('Icon')
let iconCode
if (icon?.type === 'INSTANCE') {
  iconCode = icon.executeTemplate().example
}

export default {
  example: figma.tsx`
    <IconButton
      variant="${variant}"
      size="${size}"
      ${disabled ? 'disabled' : ''}
      ${iconCode ? figma.tsx`icon={${iconCode}}` : 'icon={<Star size={20} strokeWidth={1.5} />}'}
    />
  `,
  imports: [
    'import { IconButton } from "@/index"',
    'import { Star } from "lucide-react"',
  ],
  id: 'icon-button',
  metadata: {
    nestable: true,
    props: {
      variant,
      size,
      disabled,
      icon: iconCode,
    },
  },
}
