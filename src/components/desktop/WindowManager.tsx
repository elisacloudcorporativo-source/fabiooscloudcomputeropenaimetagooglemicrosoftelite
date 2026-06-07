import { useWindowManager } from '../../hooks/useWindowManager'
import Window from './Window'

export default function WindowManager() {
  const { windows } = useWindowManager()

  return (
    <div className="w-full h-full relative">
      {windows
        .filter((w) => w.isOpen && !w.isMinimized)
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((window) => (
          <Window key={window.id} window={window} />
        ))}
    </div>
  )
}
