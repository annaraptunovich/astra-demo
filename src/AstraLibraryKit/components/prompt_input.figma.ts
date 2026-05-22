// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=37-8
// source=src/AstraLibraryKit/components/prompt_input.tsx
// component=PromptInput
import figma from 'figma'

const instance = figma.selectedInstance

const state = instance.getEnum('State', {
  Empty: 'empty',
  Filled: 'filled',
  Disabled: 'disabled',
})

const textareaText = instance.findText('Textarea')
const textarea = textareaText.type === 'TEXT' ? textareaText.textContent : 'Describe your video'

const value = state === 'filled' ? textarea : ''
const placeholder = state === 'filled' ? 'Describe your video' : textarea
const disabled = state === 'disabled'

export default {
  example: figma.tsx`
    <PromptInput
      ${value ? figma.tsx`value="${value}"` : ''}
      ${placeholder ? figma.tsx`placeholder="${placeholder}"` : ''}
      onChange={() => {}}
      onSend={() => {}}
      onAttach={() => {}}
      ${disabled ? 'disabled' : ''}
    />
  `,
  imports: ['import { PromptInput } from "@/index"'],
  id: 'prompt-input',
  metadata: {
    nestable: true,
    props: {
      value,
      placeholder,
      disabled,
    },
  },
}
