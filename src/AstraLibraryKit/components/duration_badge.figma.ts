// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=30-19
// source=src/AstraLibraryKit/components/duration_badge.tsx
// component=DurationBadge
import figma from 'figma'

const instance = figma.selectedInstance

const durationText = instance.findText('Duration')
const duration = durationText.type === 'TEXT' ? durationText.textContent : '0:01:30'

export default {
  example: figma.tsx`
    <DurationBadge duration="${duration}" />
  `,
  imports: ['import { DurationBadge } from "@/index"'],
  id: 'duration-badge',
  metadata: {
    nestable: true,
    props: {
      duration,
    },
  },
}
