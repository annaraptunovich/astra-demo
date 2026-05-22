// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=54978-669
// source=src/AstraLibraryKit/components/segmented_control.tsx
// component=SegmentedControl
import figma from 'figma'

const instance = figma.selectedInstance

const segments = instance.getSlot('Segments')

export default {
  example: figma.tsx`
    <SegmentedControl>
      ${segments}
    </SegmentedControl>
  `,
  imports: ['import { SegmentedControl } from "@/index"'],
  id: 'segmented-control',
  metadata: {
    nestable: true,
    props: {
      children: segments,
    },
  },
}
