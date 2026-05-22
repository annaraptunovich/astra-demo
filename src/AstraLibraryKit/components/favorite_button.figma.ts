// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=21-43
// source=src/AstraLibraryKit/components/favorite_button.tsx
// component=FavoriteButton
import figma from 'figma'

const instance = figma.selectedInstance

const favorited = instance.getEnum('Favorited', {
  true: true,
  false: false,
})

export default {
  example: figma.tsx`
    <FavoriteButton
      ${favorited ? 'defaultFavorited' : ''}
    />
  `,
  imports: ['import { FavoriteButton } from "@/index"'],
  id: 'favorite-button',
  metadata: {
    nestable: true,
    props: {
      defaultFavorited: favorited,
    },
  },
}
