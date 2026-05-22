// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=27-20
// source=src/AstraLibraryKit/components/secondary_nav.tsx
// component=SecondaryNav
import figma from 'figma'

const instance = figma.selectedInstance

const titleText = instance.findText('Settings')
const title = titleText.type === 'TEXT' ? titleText.textContent : 'Settings'

const navItemsByPath = instance.findConnectedInstances(
  (node) => node.codeConnectId() === 'secondary-nav-item',
  { path: ['NavItems'] },
)
const allNavItems = instance.findConnectedInstances((node) => node.codeConnectId() === 'secondary-nav-item')
const navItems = navItemsByPath.length > 0 ? navItemsByPath : allNavItems

const navItem1 = navItems[0]?.executeTemplate().example
const navItem2 = navItems[1]?.executeTemplate().example
const navItem3 = navItems[2]?.executeTemplate().example
const navItem4 = navItems[3]?.executeTemplate().example
const navItem5 = navItems[4]?.executeTemplate().example
const navItem6 = navItems[5]?.executeTemplate().example

export default {
  example: figma.tsx`
    <SecondaryNav title="${title}">
      ${navItem1}
      ${navItem2}
      ${navItem3}
      ${navItem4}
      ${navItem5}
      ${navItem6}
    </SecondaryNav>
  `,
  imports: ['import { SecondaryNav } from "@/index"'],
  id: 'secondary-nav',
  metadata: {
    nestable: true,
    props: {
      title,
      children: figma.tsx`
        ${navItem1}
        ${navItem2}
        ${navItem3}
        ${navItem4}
        ${navItem5}
        ${navItem6}
      `,
    },
  },
}
