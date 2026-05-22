// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=10006-63
// source=src/AstraLibraryKit/components/item_card_featured.tsx
// component=ItemCardFeatured
import figma from 'figma'

const instance = figma.selectedInstance

const variant = instance.getEnum('variant', {
  overlay: 'overlay',
  stacked: 'stacked',
})

const title = instance.getString('Title')
const meta = instance.getString('Meta')
const duration = instance.getString('Duration')
const showTags = instance.getBoolean('Show Tags')
const tags = instance.getSlot('Tags')

export default {
  example: figma.tsx`
    <ItemCardFeatured
      variant="${variant}"
      title="${title}"
      meta="${meta}"
      duration="${duration}"
    >
      ${showTags ? tags : ''}
    </ItemCardFeatured>
  `,
  imports: ['import { ItemCardFeatured } from "@/index"'],
  id: 'item-card-featured',
  metadata: {
    nestable: true,
    props: {
      variant,
      title,
      meta,
      duration,
      children: showTags ? tags : undefined,
    },
  },
}
