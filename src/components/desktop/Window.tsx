import { X, Minus, Square } from 'lucide-react'
import { useState } from 'react'
import { useWindowStore, type Window as WindowType } from '../../store/windowStore'
import { motion } from 'framer-motion'

interface WindowProps {
  window: WindowType
}

export default function Window({ window }: WindowProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const { removeWindow, minimizeWindow, updateWindowPosition, bringToFront } = useWindowStore()

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-no-drag]')) return
    
    setIsDragging(true)
    setDragStart({
      x: e.clientX - window.position.x,
      y: e.clientY - window.position.y,
    })
    bringToFront(window.id)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const newX = e.clientX - dragStart.x
    const newY = e.clientY - dragStart.y

    updateWindowPosition(window.id, { x: newX, y: newY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="window-base"
      style={{
        position: 'absolute',
        left: `${window.position.x}px`,
        top: `${window.position.y}px`,
        width: `${window.size.width}px`,
        height: `${window.size.height}px`,
        zIndex: window.zIndex,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
    >
      <div
        className="window-title"
        onMouseDown={handleMouseDown}
      >
        <h2 className="text-sm font-semibold flex-1">{window.title}</h2>
        <div className="flex gap-2" data-no-drag>
          <button
            onClick={() => minimizeWindow(window.id)}
            className="hover:bg-foreground/10 p-1 rounded transition-colors"
          >
            <Minus size={16} />
          </button>
          <button
            onClick={() => {}}
            className="hover:bg-foreground/10 p-1 rounded transition-colors"
          >
            <Square size={16} />
          </button>
          <button
            onClick={() => removeWindow(window.id)}
            className="hover:bg-red-500/20 p-1 rounded transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="window-content">
        <p className="text-sm text-foreground/70">Conteúdo da janela: {window.id}</p>
      </div>
    </motion.div>
  )
}
