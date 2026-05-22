// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=30-18
// source=src/AstraLibraryKit/components/toast.tsx
// component=Toast
import figma from 'figma'

const instance = figma.selectedInstance

const variant = instance.getEnum('Variant', {
  Default: 'default',
  Success: 'success',
  Error: 'error',
  Warning: 'warning',
})

const messageText = instance.findText('Message')
const message = messageText.type === 'TEXT' ? messageText.textContent : 'Message'

export default {
  example: figma.tsx`
    <Toast
      variant="${variant}"
      message="${message}"
      onCancel={() => {}}
    />
  `,
  imports: ['import { Toast } from "@/index"'],
  id: 'toast',
  metadata: {
    nestable: true,
    props: {
      variant,
      message,
    },
  },
}
