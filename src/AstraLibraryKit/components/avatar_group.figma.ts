// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=34-43
// source=src/AstraLibraryKit/components/avatar_group.tsx
// component=AvatarGroup
import figma from 'figma'

const instance = figma.selectedInstance

const spacing = instance.getEnum('Spacing', {
  Overlap: 'overlap',
  Spaced: 'spaced',
})

const size = instance.getEnum('Size', {
  SM: 'sm',
  MD: 'md',
})

const overflowText = instance.findText('String')
const overflowLabel = overflowText.type === 'TEXT' ? overflowText.textContent : '+2'
const parsedOverflowCount = Number(overflowLabel.replace(/[^0-9]/g, ''))
const overflowCount = parsedOverflowCount > 0 ? parsedOverflowCount : 2

export default {
  example: figma.tsx`
    <AvatarGroup
      avatars={[
        { src: "/avatars/ana.png", alt: "Ana" },
        { src: "/avatars/ben.png", alt: "Ben" },
        { src: "/avatars/cam.png", alt: "Cam" },
      ]}
      maxVisible={3}
      spacing="${spacing}"
      size="${size}"
      showOverflow
      overflowCount={${overflowCount}}
    />
  `,
  imports: ['import { AvatarGroup } from "@/index"'],
  id: 'avatar-group',
  metadata: {
    nestable: true,
    props: {
      avatars: [
        { src: '/avatars/ana.png', alt: 'Ana' },
        { src: '/avatars/ben.png', alt: 'Ben' },
        { src: '/avatars/cam.png', alt: 'Cam' },
      ],
      maxVisible: 3,
      spacing,
      size,
      showOverflow: true,
      overflowCount,
    },
  },
}
