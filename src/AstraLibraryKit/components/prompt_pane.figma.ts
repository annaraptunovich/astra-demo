// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=37-9
// source=src/AstraLibraryKit/components/prompt_pane.tsx
// component=PromptPane
import figma from 'figma'

const instance = figma.selectedInstance

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

const textareaText = instance.findText('Textarea')
const textarea = textareaText.type === 'TEXT' ? textareaText.textContent : 'Describe your video'

const value = promptInputProps?.value ?? ''
const placeholder = promptInputProps?.placeholder ?? textarea
const disabled = promptInputProps?.disabled ?? false

const messagesByPath = instance.findConnectedInstances(
  (node) => node.codeConnectId() === 'chat-bubbles',
  { path: ['Messages'] },
)
const allMessages = instance.findConnectedInstances((node) => node.codeConnectId() === 'chat-bubbles')
const messages = messagesByPath.length > 0 ? messagesByPath : allMessages

const message1 = messages[0]?.executeTemplate().example
const message2 = messages[1]?.executeTemplate().example
const message3 = messages[2]?.executeTemplate().example
const message4 = messages[3]?.executeTemplate().example
const message5 = messages[4]?.executeTemplate().example
const message6 = messages[5]?.executeTemplate().example

export default {
  example: figma.tsx`
    <PromptPane
      ${value ? figma.tsx`value="${value}"` : ''}
      ${placeholder ? figma.tsx`placeholder="${placeholder}"` : ''}
      onChange={() => {}}
      onSend={() => {}}
      onAttach={() => {}}
      ${disabled ? 'disabled' : ''}
    >
      ${message1}
      ${message2}
      ${message3}
      ${message4}
      ${message5}
      ${message6}
    </PromptPane>
  `,
  imports: ['import { PromptPane } from "@/index"'],
  id: 'prompt-pane',
  metadata: {
    nestable: true,
    props: {
      value,
      placeholder,
      disabled,
      children: figma.tsx`
        ${message1}
        ${message2}
        ${message3}
        ${message4}
        ${message5}
        ${message6}
      `,
    },
  },
}
