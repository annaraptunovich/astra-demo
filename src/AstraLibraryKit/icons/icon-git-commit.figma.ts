// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=64-1632
// source=node_modules/lucide-react/dist/lucide-react.d.ts
// component=GitCommit
import figma from 'figma'

const instance = figma.selectedInstance

const size = instance.getEnum('Size', {
  '16': 16,
  '20': 20,
  '24': 24,
  '32': 32,
  '40': 40,
  '48': 48,
})

export default {
  example: figma.tsx`<GitCommit size={${size}} strokeWidth={1.5} />`,
  imports: ['import { GitCommit } from "lucide-react"'],
  id: 'icon-git-commit',
  metadata: {
    nestable: true,
    props: {
      name: 'GitCommit',
      size,
    },
  },
}
