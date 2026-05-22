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

const buttons = instance.findConnectedInstances((node) => node.codeConnectId() === 'button')

const button1 = buttons[0]?.executeTemplate().example
const button2 = buttons[1]?.executeTemplate().example
const button3 = buttons[2]?.executeTemplate().example
const button4 = buttons[3]?.executeTemplate().example
const button5 = buttons[4]?.executeTemplate().example
const button6 = buttons[5]?.executeTemplate().example

const children = figma.tsx`
  ${button1}
  ${button2}
  ${button3}
  ${button4}
  ${button5}
  ${button6}
`

export default {
  example: figma.tsx`
    <ButtonGroup align="${align}">
      ${children}
    </ButtonGroup>
  `,
  imports: ['import { ButtonGroup } from "@/index"'],
  id: 'button-group',
  metadata: {
    nestable: true,
    props: {
      align,
      children,
    },
  },
}
