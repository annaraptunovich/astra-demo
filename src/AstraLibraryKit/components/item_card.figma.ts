// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=34-44
// source=src/AstraLibraryKit/components/item_card.tsx
// component=ItemCard
import figma from 'figma'

const instance = figma.selectedInstance

const titleText = instance.findText('Title')
const title = titleText.type === 'TEXT' ? titleText.textContent : 'Item Title'

const metaText = instance.findText('Meta')
const meta = metaText.type === 'TEXT' ? metaText.textContent : 'Edited 2m ago · 4K'
const [updated = 'Edited 2m ago', spec = '4K'] = meta.split('·').map((part) => part.trim())

const durationBadge = instance.findConnectedInstance('duration-badge')
const durationTemplate = durationBadge?.type === 'INSTANCE' ? durationBadge.executeTemplate() : undefined
const durationMetadata = durationTemplate?.metadata as { props?: { duration?: string } } | undefined
const durationText = instance.findText('Duration')
const duration =
  durationMetadata?.props?.duration ??
  (durationText.type === 'TEXT' ? durationText.textContent : '0:01:30')

export default {
  example: figma.tsx`
    <ItemCard
      title="${title}"
      updated="${updated}"
      spec="${spec}"
      duration="${duration}"
    />
  `,
  imports: ['import { ItemCard } from "@/index"'],
  id: 'item-card',
  metadata: {
    nestable: true,
    props: {
      title,
      updated,
      spec,
      duration,
    },
  },
}
