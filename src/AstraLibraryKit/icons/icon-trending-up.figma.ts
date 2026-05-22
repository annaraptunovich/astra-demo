// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=64-3322
// source=node_modules/lucide-react/dist/lucide-react.d.ts
// component=TrendingUp
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
  example: figma.tsx`<TrendingUp size={${size}} strokeWidth={1.5} />`,
  imports: ['import { TrendingUp } from "lucide-react"'],
  id: 'icon-trending-up',
  metadata: {
    nestable: true,
    props: {
      name: 'TrendingUp',
      size,
    },
  },
}
