// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=27-10
// source=src/AstraLibraryKit/components/tabs.tsx
// component=TabItem
import figma from 'figma'

const instance = figma.selectedInstance

const active = instance.getEnum('Active', {
  false: false,
  true: true,
})

const labelText = instance.findText('Label')
const label = labelText.type === 'TEXT' ? labelText.textContent : 'Tab'

export default {
  example: figma.tsx`
    <TabItem
      label="${label}"
      ${active ? 'active' : ''}
    />
  `,
  imports: ['import { TabItem } from "@/index"'],
  id: 'tab-item',
  metadata: {
    nestable: true,
    props: {
      label,
      active,
    },
  },
}
