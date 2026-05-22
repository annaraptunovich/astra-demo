// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=64-1658
// source=node_modules/lucide-react/dist/lucide-react.d.ts
// component=GitPullRequest
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
  example: figma.tsx`<GitPullRequest size={${size}} strokeWidth={1.5} />`,
  imports: ['import { GitPullRequest } from "lucide-react"'],
  id: 'icon-git-pull-request',
  metadata: {
    nestable: true,
    props: {
      name: 'GitPullRequest',
      size,
    },
  },
}
