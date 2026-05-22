// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=64-514
// source=node_modules/lucide-react/dist/lucide-react.d.ts
// component=Bold
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
  example: figma.tsx`<Bold size={${size}} strokeWidth={1.5} />`,
  imports: ['import { Bold } from "lucide-react"'],
  id: 'icon-bold',
  metadata: {
    nestable: true,
    props: {
      name: 'Bold',
      size,
    },
  },
}
