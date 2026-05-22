// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=25-49
// source=src/AstraLibraryKit/components/switch_field.tsx
// component=SwitchField
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

const descriptionText = instance.findText('Description')
const description = descriptionText.type === 'TEXT' ? descriptionText.textContent : 'Description'

export default {
  example: figma.tsx`
    <SwitchField
      label="${label}"
      description="${description}"
      selected={${selected}}
      onChange={() => {}}
      ${disabled ? 'disabled' : ''}
    />
  `,
  imports: ['import { SwitchField } from "@/index"'],
  id: 'switch-field',
  metadata: {
    nestable: true,
    props: {
      label,
      description,
      selected,
      disabled,
    },
  },
}
