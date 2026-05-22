// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=55012-30
// source=src/AstraLibraryKit/components/radio.tsx
// component=RadioField
import figma from 'figma'

const instance = figma.selectedInstance

const selected = instance.getEnum('Selected', {
  false: false,
  true: true,
})

const disabled = instance.getEnum('Disabled', {
  false: false,
  true: true,
})

const labelText = instance.findText('Label')
const label = labelText.type === 'TEXT' ? labelText.textContent : 'Label'
const value = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'option'

const descriptionText = instance.findText('Description')
const description = descriptionText.type === 'TEXT' ? descriptionText.textContent : ''

export default {
  example: figma.tsx`
    <RadioField
      value="${value}"
      label="${label}"
      ${description ? figma.tsx`description="${description}"` : ''}
      selected={${selected}}
      onChange={() => {}}
      ${disabled ? 'disabled' : ''}
    />
  `,
  imports: ['import { RadioField } from "@/index"'],
  id: 'radio-field',
  metadata: {
    nestable: true,
    props: {
      value,
      label,
      description,
      selected,
      disabled,
    },
  },
}
