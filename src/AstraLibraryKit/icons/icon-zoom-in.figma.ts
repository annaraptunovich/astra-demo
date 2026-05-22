// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=64-3790
// source=node_modules/lucide-react/dist/lucide-react.d.ts
// component=ZoomIn
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
  example: figma.tsx`<ZoomIn size={${size}} strokeWidth={1.5} />`,
  imports: ['import { ZoomIn } from "lucide-react"'],
  id: 'icon-zoom-in',
  metadata: {
    nestable: true,
    props: {
      name: 'ZoomIn',
      size,
    },
  },
}
