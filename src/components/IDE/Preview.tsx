import { useEditorStore } from '@/store/editorStore'
import { RefreshCw, ExternalLink, Globe, Laptop, Smartphone, Tablet } from 'lucide-react'
import { useState } from 'react'

export function PreviewPanel({ sandbox: _sandbox }: { sandbox: any }) {
  const { previewUrl, isBuilding } = useEditorStore()
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  const refreshPreview = () => {
    const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement
    if (iframe) {
      iframe.src = iframe.src
    }
  }

  const getContainerWidth = () => {
    switch (viewMode) {
      case 'mobile': return 'max-w-[375px]'
      case 'tablet': return 'max-w-[768px]'
      default: return 'max-w-full'
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#050505]">
      {/* Header */}
      <div className="h-10 px-4 border-b border-white/5 flex items-center justify-between bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <Globe className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Preview</span>
          {isBuilding && (
            <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[9px] text-primary font-bold uppercase">Building...</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white/5 rounded-md p-0.5">
            <button 
              onClick={() => setViewMode('desktop')}
              className={`p-1.5 rounded transition-all ${viewMode === 'desktop' ? 'bg-white/10 text-primary' : 'text-muted-foreground hover:text-white'}`}
            >
              <Laptop className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setViewMode('tablet')}
              className={`p-1.5 rounded transition-all ${viewMode === 'tablet' ? 'bg-white/10 text-primary' : 'text-muted-foreground hover:text-white'}`}
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setViewMode('mobile')}
              className={`p-1.5 rounded transition-all ${viewMode === 'mobile' ? 'bg-white/10 text-primary' : 'text-muted-foreground hover:text-white'}`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={refreshPreview}
              className="p-1.5 hover:bg-white/5 rounded-md transition-colors text-muted-foreground hover:text-white"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            {previewUrl && (
              <a 
                href={previewUrl} 
                target="_blank" 
                rel="noreferrer"
                className="p-1.5 hover:bg-white/5 rounded-md transition-colors text-muted-foreground hover:text-white"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Iframe */}
      <div className="flex-1 bg-[#050505] p-6 overflow-auto flex justify-center">
        <div className={`w-full h-full bg-white rounded-xl overflow-hidden shadow-2xl shadow-black/50 transition-all duration-500 ${getContainerWidth()} ${previewUrl ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {previewUrl ? (
            <iframe
              id="preview-iframe"
              src={previewUrl}
              className="w-full h-full border-none"
              title="Preview"
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-black/40 gap-4">
              <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <p className="text-xs font-medium">Ready for deployment</p>
            </div>
          )}
        </div>

        {!previewUrl && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center animate-in fade-in zoom-in duration-1000">
              <div className="mb-6 inline-flex p-4 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl">
                <Rocket className="w-12 h-12 text-primary/30" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white/40">Waiting for first build</h3>
              <p className="text-sm text-white/20">Use the AI agent to start building your application</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Rocket(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3" />
      <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5" />
    </svg>
  )
}
