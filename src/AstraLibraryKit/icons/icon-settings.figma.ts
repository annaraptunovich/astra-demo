// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=64-2828
// source=node_modules/lucide-react/dist/lucide-react.d.ts
// component=Settings
import figma from 'figma'

const instance = figma.selectedInstance

const size = instance.getEnum('Size', {
  '16': 16,
  '20': 20,
  '24': 24,
  '32': 32,
  '40': 40,
  '48': 48,
})

export default {
  example: figma.tsx`<Settings size={${size}} strokeWidth={1.5} />`,
  imports: ['import { Settings } from "lucide-react"'],
  id: 'icon-settings',
  metadata: {
    nestable: true,
    props: {
      name: 'Settings',
      size,
    },
  },
}
