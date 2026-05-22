// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=29-36
// source=src/AstraLibraryKit/components/radio.tsx
// component=RadioGroup
import figma from 'figma'

const instance = figma.selectedInstance

const disabled = instance.getEnum('Disabled', {
  false: false,
  true: true,
})

const radioFields = instance.findConnectedInstances((node) => node.codeConnectId() === 'radio-field')

const radioField1 = radioFields[0]?.executeTemplate().example
const radioField2 = radioFields[1]?.executeTemplate().example
const radioField3 = radioFields[2]?.executeTemplate().example
const radioField4 = radioFields[3]?.executeTemplate().example
const radioField5 = radioFields[4]?.executeTemplate().example
const radioField6 = radioFields[5]?.executeTemplate().example

export default {
  example: figma.tsx`
    <RadioGroup ${disabled ? 'disabled' : ''}>
      ${radioField1}
      ${radioField2}
      ${radioField3}
      ${radioField4}
      ${radioField5}
      ${radioField6}
    </RadioGroup>
  `,
  imports: ['import { RadioGroup } from "@/index"'],
  id: 'radio-group',
  metadata: {
    nestable: true,
    props: {
      disabled,
      children: figma.tsx`
        ${radioField1}
        ${radioField2}
        ${radioField3}
        ${radioField4}
        ${radioField5}
        ${radioField6}
      `,
    },
  },
}
