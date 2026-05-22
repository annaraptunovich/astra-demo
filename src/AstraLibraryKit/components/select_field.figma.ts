// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=28-51
// source=src/AstraLibraryKit/components/select_field.tsx
// component=SelectField
import figma from 'figma'

const instance = figma.selectedInstance

const labelText = instance.findText('Label')
const label = labelText.type === 'TEXT' ? labelText.textContent : ''

const valueText = instance.findText('Value')
const value = valueText.type === 'TEXT' ? valueText.textContent : ''

const opt1 = instance.findText('Option 1')
const opt2 = instance.findText('Option 2')
const opt3 = instance.findText('Option 3')
const option1 = opt1?.type === 'TEXT' ? opt1.textContent : 'Option 1'
const option2 = opt2?.type === 'TEXT' ? opt2.textContent : 'Option 2'
const option3 = opt3?.type === 'TEXT' ? opt3.textContent : 'Option 3'

const optionsLiteral = `[
        { value: '1', label: '${option1}' },
        { value: '2', label: '${option2}' },
        { value: '3', label: '${option3}' },
      ]`

export default {
  example: figma.tsx`
    <SelectField
      ${label ? figma.tsx`label="${label}"` : ''}
      ${value ? figma.tsx`value="${value}"` : ''}
      options={${optionsLiteral}}
      onChange={() => {}}
    />
  `,
  imports: ['import { SelectField } from "@/index"'],
  id: 'select-field',
  metadata: {
    nestable: true,
    props: {
      label,
      value,
    },
  },
}
