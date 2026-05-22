// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=28-17
// source=src/AstraLibraryKit/components/input_field.tsx
// component=InputField
import figma from 'figma'

const instance = figma.selectedInstance

const state = instance.getEnum('State', {
  Default: 'default',
  Focused: 'focused',
  Disabled: 'disabled',
})

const disabled = state === 'disabled'

const labelText = instance.findText('Label')
const label = labelText.type === 'TEXT' ? labelText.textContent : ''

const valueText = instance.findText('Value')
const value = valueText.type === 'TEXT' ? valueText.textContent : ''

const descriptionText = instance.findText('Description')
const description = descriptionText.type === 'TEXT' ? descriptionText.textContent : ''

export default {
  example: figma.tsx`
    <InputField
      ${label ? figma.tsx`label="${label}"` : ''}
      ${description ? figma.tsx`description="${description}"` : ''}
      ${value ? figma.tsx`value="${value}"` : ''}
      ${disabled ? 'disabled' : ''}
      onChange={() => {}}
    />
  `,
  imports: ['import { InputField } from "@/index"'],
  id: 'input-field',
  metadata: {
    nestable: true,
    props: {
      label,
      description,
      value,
      disabled,
    },
  },
}
