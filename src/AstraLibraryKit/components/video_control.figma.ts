// url=https://www.figma.com/design/l2lpXImoRNBIoGEGE7wNYr/Astra--Demo-?node-id=38-2
// source=src/AstraLibraryKit/components/video_control.tsx
// component=VideoControl
import figma from 'figma'

const instance = figma.selectedInstance

const timecodeText = instance.findText('Timecode')
const timecode = timecodeText.type === 'TEXT' ? timecodeText.textContent : '1:07 / 4:24'

function parseTime(value: string) {
  const parts = value.trim().split(':').map((part) => Number(part))
  if (parts.length === 0 || parts.some((part) => Number.isNaN(part))) {
    return 0
  }

  if (parts.length === 3) {
    return (parts[0] * 60 * 60) + (parts[1] * 60) + parts[2]
  }

  if (parts.length === 2) {
    return (parts[0] * 60) + parts[1]
  }

  return parts[0]
}

const [currentTimeLabel = '1:07', totalTimeLabel = '4:24'] = timecode.split('/').map((part) => part.trim())
const currentTime = parseTime(currentTimeLabel)
const totalTime = parseTime(totalTimeLabel)
const progress = totalTime > 0 ? Math.round((currentTime / totalTime) * 1000) / 10 : 0

export default {
  example: figma.tsx`
    <VideoControl
      currentTime={${currentTime}}
      totalTime={${totalTime}}
      progress={${progress}}
      onPlayPause={() => {}}
      onSeek={() => {}}
      onSettings={() => {}}
      onBackward={() => {}}
      onForward={() => {}}
    />
  `,
  imports: ['import { VideoControl } from "@/index"'],
  id: 'video-control',
  metadata: {
    nestable: true,
    props: {
      currentTime,
      totalTime,
      progress,
      isPlaying: false,
    },
  },
}
