// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=64-3751
// source=node_modules/lucide-react/dist/lucide-react.d.ts
// component=Youtube
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
  example: figma.tsx`<Youtube size={${size}} strokeWidth={1.5} />`,
  imports: ['import { Youtube } from "lucide-react"'],
  id: 'icon-youtube',
  metadata: {
    nestable: true,
    props: {
      name: 'Youtube',
      size,
    },
  },
}
