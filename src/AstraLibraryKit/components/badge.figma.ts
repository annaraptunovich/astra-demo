// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=20-32
// source=src/AstraLibraryKit/components/badge.tsx
// component=Badge
import figma from 'figma'

const instance = figma.selectedInstance

const variant = instance.getEnum('Variant', {
  Default: 'default',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
  Brand: 'brand',
  Secondary: 'secondary',
})

const removable = instance.getEnum('Removable', {
  true: true,
  false: false,
})

const labelText = instance.findText('Label')
const label = labelText.type === 'TEXT' ? labelText.textContent : 'Label'

export default {
  example: figma.tsx`
    <Badge
      label="${label}"
      variant="${variant}"
      ${removable ? 'removable' : ''}
      ${removable ? 'onRemove={() => {}}' : ''}
    />
  `,
  imports: ['import { Badge } from "@/index"'],
  id: 'badge',
  metadata: {
    nestable: true,
    props: {
      variant,
      removable,
      label,
    },
  },
}
