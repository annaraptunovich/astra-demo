// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=64-930
// source=node_modules/lucide-react/dist/lucide-react.d.ts
// component=Codepen
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
  example: figma.tsx`<Codepen size={${size}} strokeWidth={1.5} />`,
  imports: ['import { Codepen } from "lucide-react"'],
  id: 'icon-codepen',
  metadata: {
    nestable: true,
    props: {
      name: 'Codepen',
      size,
    },
  },
}
