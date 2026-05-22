// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=9881-38
// source=src/AstraLibraryKit/components/ai_video_creation.tsx
// component=AIVideoCreation
import figma from 'figma'

const instance = figma.selectedInstance

const state = instance.getEnum('State', {
  Default: 'default',
  'With Text': 'with-text',
})

interface PromptInputMetadata {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
}

const promptInput = instance.findConnectedInstance('prompt-input')
const promptInputMetadata = promptInput?.type === 'INSTANCE'
  ? promptInput.executeTemplate().metadata as { props?: PromptInputMetadata } | undefined
  : undefined
const promptInputProps = promptInputMetadata?.props
const suggestions = instance.getSlot('Suggestions')

const textareaText = instance.findText('Textarea')
const textarea = textareaText.type === 'TEXT' ? textareaText.textContent : 'Describe your video'

const value = promptInputProps?.value ?? (state === 'with-text' ? textarea : '')
const placeholder = promptInputProps?.placeholder ?? (state === 'with-text' ? 'Describe your video' : textarea)
const disabled = promptInputProps?.disabled ?? false

export default {
  example: figma.tsx`
    <AIVideoCreation
      ${value ? figma.tsx`value="${value}"` : ''}
      ${placeholder ? figma.tsx`placeholder="${placeholder}"` : ''}
      onChange={() => {}}
      onSend={() => {}}
      onAttach={() => {}}
      ${disabled ? 'disabled' : ''}
    >
      ${suggestions}
    </AIVideoCreation>
  `,
  imports: ['import { AIVideoCreation } from "@/index"'],
  id: 'ai-video-creation',
  metadata: {
    nestable: true,
    props: {
      value,
      placeholder,
      children: suggestions,
      disabled,
    },
  },
}
