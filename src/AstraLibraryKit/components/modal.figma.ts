// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=36-38
// source=src/AstraLibraryKit/components/modal.tsx
// component=Modal
import figma from 'figma'

const instance = figma.selectedInstance

const size = instance.getEnum('Size', {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
})

const titleText = instance.findText('Title')
const title = titleText.type === 'TEXT' ? titleText.textContent : 'Title'

const contentText = instance.findText('Modal content goes here...')
const content =
  contentText.type === 'TEXT' ? contentText.textContent : 'Modal content goes here...'

const buttonGroup = instance.findConnectedInstance('button-group')
const buttonGroupTemplate =
  buttonGroup?.type === 'INSTANCE' ? buttonGroup.executeTemplate() : undefined
const buttonGroupMetadata = buttonGroupTemplate?.metadata as
  | { props?: { children?: any } }
  | undefined

const footer = buttonGroupMetadata?.props?.children

export default {
  example: figma.tsx`
    <Modal
      isOpen
      onClose={() => {}}
      title="${title}"
      size="${size}"
      ${footer ? figma.tsx`footer={
        <>
          ${footer}
        </>
      }` : ''}
    >
      ${content}
    </Modal>
  `,
  imports: ['import { Modal } from "@/index"'],
  id: 'modal',
  metadata: {
    nestable: false,
    props: {
      isOpen: true,
      title,
      size,
      children: content,
      footer,
    },
  },
}
