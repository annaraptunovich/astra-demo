// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=33-6
// source=src/AstraLibraryKit/components/toolbar_item.tsx
// component=ToolbarItem
import figma from 'figma'

const instance = figma.selectedInstance

const selected = instance.getEnum('Selected', {
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
    <ToolbarItem
      ${iconCode ? figma.tsx`icon={${iconCode}}` : 'icon={<Circle size={20} strokeWidth={1.5} />}'}
      ${selected ? 'selected' : ''}
    />
  `,
  imports: [
    'import { ToolbarItem } from "@/index"',
    'import { Circle } from "lucide-react"',
  ],
  id: 'toolbar-item',
  metadata: {
    nestable: true,
    props: {
      icon: iconCode,
      selected,
    },
  },
}
