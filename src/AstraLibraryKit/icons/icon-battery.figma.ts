// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=64-462
// source=node_modules/lucide-react/dist/lucide-react.d.ts
// component=Battery
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
  example: figma.tsx`<Battery size={${size}} strokeWidth={1.5} />`,
  imports: ['import { Battery } from "lucide-react"'],
  id: 'icon-battery',
  metadata: {
    nestable: true,
    props: {
      name: 'Battery',
      size,
    },
  },
}
