// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=64-3595
// source=node_modules/lucide-react/dist/lucide-react.d.ts
// component=Volume1
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
  example: figma.tsx`<Volume1 size={${size}} strokeWidth={1.5} />`,
  imports: ['import { Volume1 } from "lucide-react"'],
  id: 'icon-volume-1',
  metadata: {
    nestable: true,
    props: {
      name: 'Volume1',
      size,
    },
  },
}
