import { useState } from 'react'
import { Home, Film, BookOpen, Folder, Settings, Sparkles, ChevronRight } from 'lucide-react'
import { SidebarNavigation } from './AstraLibraryKit/components/sidebar_navigation'
import { SidebarButton } from './AstraLibraryKit/components/sidebar_button'
import { Button } from './AstraLibraryKit/components/button'
import { ItemCard } from './AstraLibraryKit/components/item_card'
import { ItemCardFeatured } from './AstraLibraryKit/components/item_card_featured'
import { Avatar } from './AstraLibraryKit/components/avatar'
import { Badge } from './AstraLibraryKit/components/badge'
import { PromptInput } from './AstraLibraryKit/components/prompt_input'
import {
  ExportModal,
  type ExportItem,
  type AccountState,
  type ExportEnv,
} from './ExportModal'
import imgMtb from 'figma:asset/e92a67f81fd098462003a57e57bc7449739a4a7a.png'
import imgSurf from 'figma:asset/74922429a2917beaa64d4b68e4cdf5b33394b0e6.png'
import imgRedwoods from 'figma:asset/5760e1ea5871c91fddd92e7cede63ce15d5b96e2.png'
import imgVenice from 'figma:asset/5228fa5b902181f2f12cb50b069927702091035b.png'
import imgJoshuaTree from 'figma:asset/1ff229f6586eea99b34e320c40493e06d54c5ea9.png'

interface AssetsProps {
  onNavigate?: (page: 'dashboard' | 'assets') => void
}

const activity = [
  { id: 1, user: 'Alex Johnson', project: 'Feature Video 02', time: '1 day ago', avatar: 'https://i.pravatar.cc/80?u=alex' },
  { id: 2, user: 'Alex Johnson', project: 'Feature Video 02', time: '1 day ago', avatar: 'https://i.pravatar.cc/80?u=alex2' },
]

const sequences = [
  { title: 'Mountain Biking in Marin', meta: 'Edited 3w ago · 4K', duration: '0:01:30', tags: ['Mountains', 'Marin Country'], thumb: 'https://picsum.photos/seed/mtb/1200/670' },
  { title: 'Surf Day at Trestles', meta: 'Edited 2m ago · 4K', duration: '0:01:30', tags: ['Water', 'Orange County'], thumb: 'https://picsum.photos/seed/surf/1200/670' },
  { title: 'Hiking Among the Redwoods', meta: 'Edited 2m ago · 4K', duration: '0:01:30', tags: ['National Park', 'Camping'], thumb: 'https://picsum.photos/seed/redwoods/1200/670' },
  { title: 'Desert Road Trip', meta: 'Edited 1w ago · 4K', duration: '0:01:30', tags: ['Desert', 'Road'], thumb: 'https://picsum.photos/seed/desert/1200/670' },
  { title: 'Pacific Coast Drive', meta: 'Edited 5d ago · 4K', duration: '0:01:30', tags: ['Ocean', 'Highway'], thumb: 'https://picsum.photos/seed/pacific/1200/670' },
]

const clips = [
  { title: 'Golden Hour Ridge', updated: 'Edited 2m ago', spec: '4K', duration: '0:00:45', thumb: 'https://picsum.photos/seed/ridge/610/340' },
  { title: 'Crashing Wave Close-Up', updated: 'Edited 1h ago', spec: '4K', duration: '0:00:22', thumb: 'https://picsum.photos/seed/wave/610/340' },
  { title: 'Forest Canopy Pan', updated: 'Edited 3h ago', spec: '4K', duration: '0:00:18', thumb: 'https://picsum.photos/seed/canopy/610/340' },
  { title: 'Trail Flyover', updated: 'Edited 1d ago', spec: '4K', duration: '0:01:10', thumb: 'https://picsum.photos/seed/trail/610/340' },
  { title: 'Tide Pool Detail', updated: 'Edited 2d ago', spec: '4K', duration: '0:00:35', thumb: 'https://picsum.photos/seed/tidepool/610/340' },
  { title: 'Sunrise Over Dunes', updated: 'Edited 3d ago', spec: '4K', duration: '0:00:52', thumb: 'https://picsum.photos/seed/dunes/610/340' },
  { title: 'Campfire Sparks', updated: 'Edited 4d ago', spec: '4K', duration: '0:00:28', thumb: 'https://picsum.photos/seed/campfire/610/340' },
  { title: 'Alpine Lake Reflection', updated: 'Edited 5d ago', spec: '4K', duration: '0:01:05', thumb: 'https://picsum.photos/seed/alpine/610/340' },
  { title: 'Waterfall Slow-Mo', updated: 'Edited 1w ago', spec: '4K', duration: '0:00:40', thumb: 'https://picsum.photos/seed/waterfall/610/340' },
  { title: 'Night Sky Timelapse', updated: 'Edited 2w ago', spec: '4K', duration: '0:02:00', thumb: 'https://picsum.photos/seed/nightsky/610/340' },
]

const exportableItems: ExportItem[] = [
  { id: 'mtb', title: 'Mountain Biking in Marin', updated: 'Edited 3w ago', spec: '4K', resolution: '4K', duration: '0:01:30', durationSeconds: 90, fileSizeMB: 300, sourceAvailable: true, thumb: imgMtb },
  { id: 'surf', title: 'Surf Day at Trestles', updated: 'Edited 2m ago', spec: '1080p', resolution: '1080p', duration: '0:01:30', durationSeconds: 90, fileSizeMB: 120, sourceAvailable: true, thumb: imgSurf },
  { id: 'redwoods', title: 'Hiking Among the Redwoods', updated: 'Edited 2m ago', spec: '4K', resolution: '4K', duration: '0:01:30', durationSeconds: 90, fileSizeMB: 300, sourceAvailable: true, thumb: imgRedwoods },
  { id: 'venice', title: 'Venice Beach Boardwalk', updated: 'Edited 2m ago', spec: '720p', resolution: '720p', duration: '0:01:30', durationSeconds: 90, fileSizeMB: 60, sourceAvailable: true, thumb: imgVenice },
  { id: 'joshua-tree', title: 'Road Trip to Joshua Tree', updated: 'Edited 6m ago', spec: '4K', resolution: '4K', duration: '0:02:00', durationSeconds: 120, fileSizeMB: 400, sourceAvailable: false, thumb: imgJoshuaTree },
]

const initialAccount: AccountState = {
  planTier: 'pro',
  exportMinutesUsed: 12,
  exportMinutesLimit: 60,
}

const initialEnv: ExportEnv = {
  freeDiskMB: 50_000,
  networkStatus: 'online',
  forceEncodingError: false,
}

const initialExistingFiles = new Set<string>([
  'ca-outdoors-v01.mp4',
  'sunset_drive.mov',
  'final_cut.webm',
])

export default function Assets({ onNavigate }: AssetsProps) {
  const [prompt, setPrompt] = useState('')
  const [exportOpen, setExportOpen] = useState(false)
  const [account, setAccount] = useState<AccountState>(initialAccount)
  const [env, setEnv] = useState<ExportEnv>(initialEnv)
  const [existingFiles] = useState<Set<string>>(initialExistingFiles)

  const handleExportComplete = (totalDurationSeconds: number, totalSizeMB: number) => {
    setAccount((prev) => ({
      ...prev,
      exportMinutesUsed: prev.exportMinutesUsed + totalDurationSeconds / 60,
    }))
    setEnv((prev) => ({
      ...prev,
      freeDiskMB: Math.max(0, prev.freeDiskMB - totalSizeMB),
    }))
  }

  return (
    <div className="flex h-screen bg-brand-tertiary">
      <SidebarNavigation
        footer={
          <>
            <SidebarButton icon={<Settings className="size-full" strokeWidth={1.5} />} />
            <Avatar type="image" size="small" shape="circle" src="https://i.pravatar.cc/80?u=jamie" />
          </>
        }
      >
        <SidebarButton icon={<Home className="size-full" strokeWidth={1.5} />} onClick={() => onNavigate?.('dashboard')} />
        <SidebarButton icon={<Film className="size-full" strokeWidth={1.5} />} />
        <SidebarButton icon={<BookOpen className="size-full" strokeWidth={1.5} />} />
        <SidebarButton icon={<Folder className="size-full" strokeWidth={1.5} />} active />
      </SidebarNavigation>

      <div className="flex-1 flex flex-col gap-4 px-6 py-3 overflow-y-auto min-w-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between py-1 shrink-0 gap-4">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Folder size={20} strokeWidth={1.5} className="text-text-primary shrink-0" />
            <div className="flex items-center gap-2 px-2 py-1 rounded-md min-w-0">
              <span className="text-text-primary text-[16px] font-medium">Assets</span>
              <ChevronRight size={14} className="text-text-primary shrink-0" />
              <span className="text-text-primary text-[16px] font-medium truncate">California Outdoors</span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button variant="neutral" onClick={() => setExportOpen(true)}>Export</Button>
            <Button variant="primary">Share</Button>
          </div>
        </div>

        {/* AI Create + Recent Activity */}
        {/*
        <div className="flex gap-6 items-stretch shrink-0">
          <div className="flex-1 bg-brand-secondary border border-border-secondary flex flex-col gap-4 items-start p-6 rounded-2xl min-w-0">
            <div className="flex items-center gap-2 w-full">
              <Sparkles size={16} className="text-brand-primary shrink-0" />
              <p className="text-heading text-text-primary">Create a new sequence</p>
            </div>
            <PromptInput
              value={prompt}
              placeholder="Describe your video"
              onChange={setPrompt}
              className="w-full"
            />
            <div className="flex flex-wrap gap-3 items-center">
              {['Social post', 'Trailer', 'Selects reel'].map((label) => (
                <button
                  key={label}
                  onClick={() => setPrompt(label)}
                  className="focus:outline-none cursor-pointer"
                >
                  <Badge label={label} variant="brand" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-surface-bg border border-border-primary rounded-2xl p-5 flex flex-col gap-5 w-[411px] shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-label text-text-secondary">Recent Activity</span>
              <button className="border border-brand-primary rounded-full px-3 py-1 text-[14px] text-brand-primary cursor-pointer hover:bg-brand-tertiary transition-colors">
                View all
              </button>
            </div>
            <div className="flex flex-col gap-4 min-h-0">
              {activity.map((n) => (
                <div key={n.id} className="flex items-center gap-3">
                  <Avatar type="image" size="medium" shape="circle" src={n.avatar} className="shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-text-primary leading-[1.4]">
                      New comment from <span className="font-semibold">{n.user}</span> on the project{' '}
                      <span className="font-semibold">{n.project}</span>
                    </p>
                    <p className="text-[12px] text-text-secondary opacity-50 leading-[1.4]">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        */}

        {/* Sequences */}
        <div className="flex flex-col gap-4 py-2 shrink-0">
          <p className="text-label text-text-primary">Sequences</p>
          <div className="-mx-6 flex gap-6 items-center overflow-x-auto pb-2 px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {sequences.map((item) => (
              <ItemCardFeatured
                key={item.title}
                variant="overlay"
                title={item.title}
                meta={item.meta}
                duration={item.duration}
                thumbnail={<img src={item.thumb} alt="" className="w-full h-full object-cover" />}
                className="w-[522px] shrink-0"
              >
                {item.tags.map((tag) => (
                  <Badge key={tag} label={tag} variant="secondary" />
                ))}
              </ItemCardFeatured>
            ))}
          </div>
        </div>

        {/* Clips */}
        <div className="flex flex-col gap-4 py-2 shrink-0">
          <p className="text-label text-text-primary">Clips</p>
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(305px, 1fr))' }}
          >
            {clips.map((item) => (
              <ItemCard
                key={item.title}
                title={item.title}
                updated={item.updated}
                spec={item.spec}
                duration={item.duration}
                thumbnail={<img src={item.thumb} alt="" className="w-full h-full object-cover" />}
                className="w-full"
              />
            ))}
          </div>
        </div>
      </div>

      <ExportModal
        isOpen={exportOpen}
        onClose={() => setExportOpen(false)}
        items={exportableItems}
        account={account}
        env={env}
        existingFiles={existingFiles}
        onExportComplete={handleExportComplete}
      />
    </div>
  )
}
