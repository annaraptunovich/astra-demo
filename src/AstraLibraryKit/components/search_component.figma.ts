// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=29-43
// source=src/AstraLibraryKit/components/search_component.tsx
// component=SearchComponent
import figma from 'figma'

const instance = figma.selectedInstance

const state = instance.getEnum('State', {
  Empty: 'empty',
  Filled: 'filled',
})

const valueText = instance.findText('Value')
const rawValue = valueText.type === 'TEXT' ? valueText.textContent : ''
const value = state === 'filled' ? rawValue : ''

export default {
  example: figma.tsx`
    <SearchComponent
      ${value ? figma.tsx`value="${value}"` : ''}
      onChange={() => {}}
      onSearch={() => {}}
    />
  `,
  imports: ['import { SearchComponent } from "@/index"'],
  id: 'search-component',
  metadata: {
    nestable: true,
    props: {
      value,
    },
  },
}
