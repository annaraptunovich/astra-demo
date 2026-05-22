// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=64-2919
// source=node_modules/lucide-react/dist/lucide-react.d.ts
// component=Shuffle
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
  example: figma.tsx`<Shuffle size={${size}} strokeWidth={1.5} />`,
  imports: ['import { Shuffle } from "lucide-react"'],
  id: 'icon-shuffle',
  metadata: {
    nestable: true,
    props: {
      name: 'Shuffle',
      size,
    },
  },
}
