// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=25-24
// source=src/AstraLibraryKit/components/checkbox.tsx
// component=Checkbox
import figma from 'figma'

const instance = figma.selectedInstance

const checked = instance.getEnum('Checked', {
  false: false,
  true: true,
})

const disabled = instance.getEnum('Disabled', {
  false: false,
  true: true,
})

const labelText = instance.findText('Checkbox label')
const label = labelText.type === 'TEXT' ? labelText.textContent : ''

const descriptionText = instance.findText('Optional description')
const description = descriptionText.type === 'TEXT' ? descriptionText.textContent : ''

export default {
  example: figma.tsx`
    <Checkbox
      ${label ? figma.tsx`label="${label}"` : ''}
      ${description ? figma.tsx`description="${description}"` : ''}
      checked={${checked}}
      onChange={() => {}}
      ${disabled ? 'disabled' : ''}
    />
  `,
  imports: ['import { Checkbox } from "@/index"'],
  id: 'checkbox',
  metadata: {
    nestable: true,
    props: {
      label,
      description,
      checked,
      disabled,
    },
  },
}
