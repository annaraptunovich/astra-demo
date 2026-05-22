// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=36-64
// source=src/AstraLibraryKit/components/button_group.tsx
// component=ButtonGroup
import figma from 'figma'

const instance = figma.selectedInstance

const align = instance.getEnum('Align', {
  Justify: 'justify',
  Start: 'start',
  End: 'end',
  Center: 'center',
  Stack: 'stack',
})

export default {
  example: figma.tsx`
    <ButtonGroup align="${align}">
      <Button variant="neutral">Cancel</Button>
      <Button>Confirm</Button>
    </ButtonGroup>
  `,
  imports: ['import { ButtonGroup, Button } from "@/index"'],
  id: 'button-group',
  metadata: {
    nestable: true,
    props: {
      align,
    },
  },
}
