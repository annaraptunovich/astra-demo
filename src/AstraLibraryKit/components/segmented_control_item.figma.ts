// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=54978-631
// source=src/AstraLibraryKit/components/segmented_control.tsx
// component=SegmentedControlItem
import figma from 'figma'

const instance = figma.selectedInstance

const active = instance.getEnum('Active', {
  false: false,
  true: true,
})

const icon = instance.getInstanceSwap('Icon')
let iconCode
if (icon?.type === 'INSTANCE') {
  iconCode = icon.executeTemplate().example
}

export default {
  example: figma.tsx`
    <SegmentedControlItem
      ${iconCode ? figma.tsx`icon={${iconCode}}` : 'icon={<Circle size={20} strokeWidth={1.5} />}'}
      ${active ? 'active' : ''}
    />
  `,
  imports: [
    'import { SegmentedControlItem } from "@/index"',
    'import { Circle } from "lucide-react"',
  ],
  id: 'segmented-control-item',
  metadata: {
    nestable: true,
    props: {
      icon: iconCode,
      active,
    },
  },
}
