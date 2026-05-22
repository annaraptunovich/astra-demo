// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=28-33
// source=src/AstraLibraryKit/components/textarea_field.tsx
// component=TextareaField
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
    <TextareaField
      ${label ? figma.tsx`label="${label}"` : ''}
      ${description ? figma.tsx`description="${description}"` : ''}
      ${value ? figma.tsx`value="${value}"` : ''}
      ${disabled ? 'disabled' : ''}
      onChange={() => {}}
    />
  `,
  imports: ['import { TextareaField } from "@/index"'],
  id: 'textarea-field',
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
