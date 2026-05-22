// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=30-29
// source=src/AstraLibraryKit/components/tooltip.tsx
// component=Tooltip
import figma from 'figma'

const instance = figma.selectedInstance

const position = instance.getEnum('Position', {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right',
})

const contentText = instance.findText('Content')
const content = contentText.type === 'TEXT' ? contentText.textContent : 'Tooltip'

export default {
  example: figma.tsx`
    <Tooltip content="${content}" position="${position}">
      <Button>Hover me</Button>
    </Tooltip>
  `,
  imports: ['import { Tooltip, Button } from "@/index"'],
  id: 'tooltip',
  metadata: {
    nestable: true,
    props: {
      position,
      content,
    },
  },
}
