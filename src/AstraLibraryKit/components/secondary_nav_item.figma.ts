// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=24-13
// source=src/AstraLibraryKit/components/secondary_nav_item.tsx
// component=SecondaryNavItem
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

const labelText = instance.findText('Label')
const label = labelText.type === 'TEXT' ? labelText.textContent : 'Label'

export default {
  example: figma.tsx`
    <SecondaryNavItem
      ${iconCode ? figma.tsx`icon={${iconCode}}` : ''}
      label="${label}"
      ${active ? 'active' : ''}
    />
  `,
  imports: ['import { SecondaryNavItem } from "@/index"'],
  id: 'secondary-nav-item',
  metadata: {
    nestable: true,
    props: {
      icon: iconCode,
      label,
      active,
    },
  },
}
