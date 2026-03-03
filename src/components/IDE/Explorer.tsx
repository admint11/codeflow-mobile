import { useEditorStore } from '@/store/editorStore'
import { File, ChevronRight, ChevronDown, Folder, Plus, FilePlus } from 'lucide-react'
import { useState } from 'react'

export function FileExplorer() {
  const { files, activeFile, setActiveFile } = useEditorStore()
  const [isProjectOpen, setIsProjectOpen] = useState(true)

  return (
    <div className="h-full flex flex-col bg-[#0a0a0a] border-r border-white/5">
      <div className="p-3 flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
        <span>Explorer</span>
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 hover:bg-white/5 rounded transition-colors">
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 hover:bg-white/5 rounded transition-colors">
            <FilePlus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto group">
        <div className="py-1">
          <button 
            onClick={() => setIsProjectOpen(!isProjectOpen)}
            className="w-full flex items-center gap-1.5 px-3 py-1 hover:bg-white/5 transition-colors text-xs font-medium"
          >
            {isProjectOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            <Folder className="w-4 h-4 text-primary/80 fill-primary/10" />
            my-app
          </button>

          {isProjectOpen && (
            <div className="pl-6 mt-1 flex flex-col gap-0.5">
              {Object.keys(files).map((fileName) => (
                <button
                  key={fileName}
                  onClick={() => setActiveFile(fileName)}
                  className={`w-full text-left px-3 py-1 text-xs flex items-center gap-2 hover:bg-white/5 transition-colors ${
                    activeFile === fileName ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground'
                  }`}
                >
                  <File className={`w-3.5 h-3.5 ${activeFile === fileName ? 'text-primary' : 'text-muted-foreground'}`} />
                  {fileName}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
