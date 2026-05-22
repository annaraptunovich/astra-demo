// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=54971-31
// source=src/AstraLibraryKit/components/tabs.tsx
// component=Tabs
import figma from 'figma'

const instance = figma.selectedInstance

const tabList = instance.getSlot('TabList')
const tabItems = instance.findConnectedInstances((node) => node.codeConnectId() === 'tab-item')
const contentText = instance.findText('Content Text')
const content = contentText.type === 'TEXT' ? contentText.textContent : 'Tab content'

interface TabItemMetadata {
  label?: string;
  active?: boolean;
}

function getTabItemProps(index: number): TabItemMetadata | undefined {
  const tabItem = tabItems[index]
  if (!tabItem) {
    return undefined
  }

  const metadata = tabItem.executeTemplate().metadata as { props?: TabItemMetadata } | undefined
  return metadata?.props
}

const tabItem1 = getTabItemProps(0)
const tabItem2 = getTabItemProps(1)
const tabItem3 = getTabItemProps(2)
const tabItem4 = getTabItemProps(3)
const tabItem5 = getTabItemProps(4)
const tabItem6 = getTabItemProps(5)

function toId(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'tab'
}

const tab1Label = tabItem1?.label || 'Details'
const tab2Label = tabItem2?.label
const tab3Label = tabItem3?.label
const tab4Label = tabItem4?.label
const tab5Label = tabItem5?.label
const tab6Label = tabItem6?.label

const tab1Id = toId(tab1Label)
const tab2Id = tab2Label ? toId(tab2Label) : undefined
const tab3Id = tab3Label ? toId(tab3Label) : undefined
const tab4Id = tab4Label ? toId(tab4Label) : undefined
const tab5Id = tab5Label ? toId(tab5Label) : undefined
const tab6Id = tab6Label ? toId(tab6Label) : undefined

const defaultTab =
  tabItem1?.active ? tab1Id :
  tabItem2?.active && tab2Id ? tab2Id :
  tabItem3?.active && tab3Id ? tab3Id :
  tabItem4?.active && tab4Id ? tab4Id :
  tabItem5?.active && tab5Id ? tab5Id :
  tabItem6?.active && tab6Id ? tab6Id :
  tab1Id

export default {
  example: figma.tsx`
    <Tabs
      defaultTab="${defaultTab}"
      content={<p>${content}</p>}
    >
      ${tabList}
    </Tabs>
  `,
  imports: ['import { Tabs } from "@/index"'],
  id: 'tabs',
  metadata: {
    nestable: true,
    props: {
      defaultTab,
      tabs: [
        { id: tab1Id, label: tab1Label, content },
        tab2Label && tab2Id ? { id: tab2Id, label: tab2Label, content } : undefined,
        tab3Label && tab3Id ? { id: tab3Id, label: tab3Label, content } : undefined,
        tab4Label && tab4Id ? { id: tab4Id, label: tab4Label, content } : undefined,
        tab5Label && tab5Id ? { id: tab5Id, label: tab5Label, content } : undefined,
        tab6Label && tab6Id ? { id: tab6Id, label: tab6Label, content } : undefined,
      ].filter(Boolean),
      children: tabList,
      content,
    },
  },
}
