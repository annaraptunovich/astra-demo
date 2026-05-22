// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=64-2932
// source=node_modules/lucide-react/dist/lucide-react.d.ts
// component=Sidebar
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
  example: figma.tsx`<Sidebar size={${size}} strokeWidth={1.5} />`,
  imports: ['import { Sidebar } from "lucide-react"'],
  id: 'icon-sidebar',
  metadata: {
    nestable: true,
    props: {
      name: 'Sidebar',
      size,
    },
  },
}
