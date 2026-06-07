import { Home, Settings, Music, Code, Files } from 'lucide-react'
import { useWindowManager } from '../../hooks/useWindowManager'

interface DockItem {
  id: string
  label: string
  icon: React.ReactNode
}

export default function BottomDock() {
  const { openWindow } = useWindowManager()

  const items: DockItem[] = [
    { id: 'home', label: 'Home', icon: <Home size={28} /> },
    { id: 'files', label: 'Files', icon: <Files size={28} /> },
    { id: 'music', label: 'Music', icon: <Music size={28} /> },
    { id: 'code', label: 'Code', icon: <Code size={28} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={28} /> },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-background/95 backdrop-blur-md border-t border-foreground/10 flex items-center justify-center gap-4 px-4 rounded-t-3xl">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => openWindow(item.id)}
          className="dock-item"
          title={item.label}
        >
          {item.icon}
        </button>
      ))}
    </div>
  )
}
