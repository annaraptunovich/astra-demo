// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=19-20
// source=src/AstraLibraryKit/components/avatar.tsx
// component=Avatar
import figma from 'figma'

const instance = figma.selectedInstance

const type = instance.getEnum('Type', {
  Image: 'image',
  Initial: 'initial',
})

const size = instance.getEnum('Size', {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
})

const shape = instance.getEnum('Shape', {
  Circle: 'circle',
  Square: 'square',
})

const initialsText = instance.findText('B')
const initials = initialsText.type === 'TEXT' ? initialsText.textContent : 'B'

export default {
  example: figma.tsx`
    <Avatar
      type="${type}"
      size="${size}"
      shape="${shape}"
      ${type === 'initial' ? figma.tsx`initials="${initials}"` : ''}
    />
  `,
  imports: ['import { Avatar } from "@/index"'],
  id: 'avatar',
  metadata: {
    nestable: true,
    props: {
      type,
      size,
      shape,
      initials: type === 'initial' ? initials : undefined,
    },
  },
}
