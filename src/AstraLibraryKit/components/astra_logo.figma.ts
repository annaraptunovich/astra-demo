// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=18-8
// source=src/AstraLibraryKit/components/astra_logo.tsx
// component=AstraLogo
import figma from 'figma'

const instance = figma.selectedInstance

const size = instance.getEnum('Size', {
  24: 24,
  32: 32,
  48: 48,
})

export default {
  example: figma.tsx`<AstraLogo size={${size}} />`,
  imports: ['import { AstraLogo } from "@/index"'],
  id: 'astra-logo',
  metadata: {
    nestable: true,
    props: {
      size,
    },
  },
}
