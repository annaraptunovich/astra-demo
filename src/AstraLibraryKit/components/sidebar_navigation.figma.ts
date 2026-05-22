// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=27-11
// source=src/AstraLibraryKit/components/sidebar_navigation.tsx
// component=SidebarNavigation
import figma from 'figma'

const instance = figma.selectedInstance

const navButtonsByFullPath = instance.findConnectedInstances(
  (node) => node.codeConnectId() === 'sidebar-button',
  { path: ['Top Items', 'NavItems'] },
)
const navButtonsBySlotPath = instance.findConnectedInstances(
  (node) => node.codeConnectId() === 'sidebar-button',
  { path: ['NavItems'] },
)
const allSidebarButtons = instance.findConnectedInstances((node) => node.codeConnectId() === 'sidebar-button')
const footerButton = instance.findConnectedInstance('sidebar-button', { path: ['Bottom Items'] })
const footerAvatar = instance.findConnectedInstance('avatar', { path: ['Bottom Items', 'Account'] })

const navButtons =
  navButtonsByFullPath.length > 0
    ? navButtonsByFullPath
    : navButtonsBySlotPath.length > 0
      ? navButtonsBySlotPath
      : allSidebarButtons.slice(0, Math.max(0, allSidebarButtons.length - 1))

const navButton1 = navButtons[0]?.executeTemplate().example
const navButton2 = navButtons[1]?.executeTemplate().example
const navButton3 = navButtons[2]?.executeTemplate().example
const navButton4 = navButtons[3]?.executeTemplate().example
const navButton5 = navButtons[4]?.executeTemplate().example
const navButton6 = navButtons[5]?.executeTemplate().example

let footerButtonCode
if (footerButton?.type === 'INSTANCE') {
  footerButtonCode = footerButton.executeTemplate().example
}

let footerAvatarCode
if (footerAvatar?.type === 'INSTANCE') {
  footerAvatarCode = footerAvatar.executeTemplate().example
}

let footer
if (footerButtonCode && footerAvatarCode) {
  footer = figma.tsx`
    <>
      ${footerButtonCode}
      ${footerAvatarCode}
    </>
  `
} else if (footerButtonCode) {
  footer = figma.tsx`<>${footerButtonCode}</>`
} else if (footerAvatarCode) {
  footer = figma.tsx`<>${footerAvatarCode}</>`
}

export default {
  example: figma.tsx`
    <SidebarNavigation
      ${footer ? figma.tsx`footer={${footer}}` : ''}
    >
      ${navButton1}
      ${navButton2}
      ${navButton3}
      ${navButton4}
      ${navButton5}
      ${navButton6}
    </SidebarNavigation>
  `,
  imports: ['import { SidebarNavigation } from "@/index"'],
  id: 'sidebar-navigation',
  metadata: {
    nestable: true,
    props: {
      children: figma.tsx`
        ${navButton1}
        ${navButton2}
        ${navButton3}
        ${navButton4}
        ${navButton5}
        ${navButton6}
      `,
      footer,
    },
  },
}
