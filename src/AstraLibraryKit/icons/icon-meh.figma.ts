// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=64-2100
// source=node_modules/lucide-react/dist/lucide-react.d.ts
// component=Meh
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
  example: figma.tsx`<Meh size={${size}} strokeWidth={1.5} />`,
  imports: ['import { Meh } from "lucide-react"'],
  id: 'icon-meh',
  metadata: {
    nestable: true,
    props: {
      name: 'Meh',
      size,
    },
  },
}
