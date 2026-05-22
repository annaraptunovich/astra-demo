// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=24-6
// source=src/AstraLibraryKit/components/sidebar_button.tsx
// component=SidebarButton
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
    <SidebarButton
      ${iconCode ? figma.tsx`icon={${iconCode}}` : ''}
      ${active ? 'active' : ''}
    />
  `,
  imports: ['import { SidebarButton } from "@/index"'],
  id: 'sidebar-button',
  metadata: {
    nestable: true,
    props: {
      icon: iconCode,
      active,
    },
  },
}
