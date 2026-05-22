// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=64-2048
// source=node_modules/lucide-react/dist/lucide-react.d.ts
// component=MapPin
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
  example: figma.tsx`<MapPin size={${size}} strokeWidth={1.5} />`,
  imports: ['import { MapPin } from "lucide-react"'],
  id: 'icon-map-pin',
  metadata: {
    nestable: true,
    props: {
      name: 'MapPin',
      size,
    },
  },
}
