// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=34-12
// source=src/AstraLibraryKit/components/chat_bubbles.tsx
// component=ChatBubbles
import figma from 'figma'

const instance = figma.selectedInstance

const type = instance.getEnum('Type', {
  AI: 'ai',
  User: 'user',
})

const messageText = instance.findText('Message')
const text = messageText.type === 'TEXT' ? messageText.textContent : 'Message'

const avatarByPath = instance.findConnectedInstance('avatar', { path: ['Avatar'] })
const avatarByConnection = instance.findConnectedInstance('avatar')
const avatarByLayer = instance.findInstance('Avatar')
const avatar = avatarByPath ?? avatarByConnection ?? avatarByLayer

let userAvatar

if (type === 'user') {
  userAvatar = figma.tsx`<Avatar type="image" size="small" shape="circle" />`
}

if (type === 'user' && avatar?.type === 'INSTANCE') {
  userAvatar = avatar.executeTemplate().example
}

export default {
  example: figma.tsx`
    <ChatBubbles
      type="${type}"
      text="${text}"
      ${userAvatar ? figma.tsx`userAvatar={${userAvatar}}` : ''}
    />
  `,
  imports: ['import { ChatBubbles, Avatar } from "@/index"'],
  id: 'chat-bubbles',
  metadata: {
    nestable: true,
    props: {
      type,
      text,
      userAvatar,
    },
  },
}
