// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=33-7
// source=src/AstraLibraryKit/components/toolbar.tsx
// component=Toolbar
import figma from 'figma'

const instance = figma.selectedInstance

const tools = instance.getSlot('Tools')

export default {
  example: figma.tsx`
    <Toolbar>
      ${tools}
    </Toolbar>
  `,
  imports: ['import { Toolbar } from "@/index"'],
  id: 'toolbar',
  metadata: {
    nestable: true,
    props: {
      children: tools,
    },
  },
}
