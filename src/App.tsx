import { useState } from 'react'
import { useBlinkAuth } from '@blinkdotnew/react'
import { ChatPanel } from '@/components/IDE/Chat'
import { PreviewPanel } from '@/components/IDE/Preview'
import { FileExplorer } from '@/components/IDE/Explorer'
import { CodeEditor } from '@/components/IDE/Editor'
import { blink } from '@/lib/blink'
import { useEditorStore } from '@/store/editorStore'
import { 
  ResizableHandle, 
  ResizablePanel, 
  ResizablePanelGroup 
} from '@/components/ui/resizable'
import { Code2, Play, PanelLeft, PanelRight } from 'lucide-react'

export default function App() {
  return <IDE />
}

function IDE() {
  const [sandbox, setSandbox] = useState<any>(null)
  const [isSandboxLoading, setIsSandboxLoading] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(true)
  const { previewUrl, setPreviewUrl } = useEditorStore()
  const { user, isAuthenticated, isLoading: authLoading } = useBlinkAuth()

  // Lazy sandbox init — only called when user sends first message
  const initSandbox = async (): Promise<any> => {
    if (sandbox) return sandbox

    // Auth guard: redirect to login if not authenticated
    if (!isAuthenticated) {
      blink.auth.login(window.location.href)
      return null
    }

    if (isSandboxLoading) return null

    setIsSandboxLoading(true)
    try {
      const sbx = await blink.sandbox.create({
        template: 'devtools-base',
        metadata: { userId: user?.id || 'anonymous' }
      })
      setSandbox(sbx)
      return sbx
    } catch (err) {
      console.error('Failed to init sandbox:', err)
      return null
    } finally {
      setIsSandboxLoading(false)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-[#050505] text-white overflow-hidden">
      {/* Top Header */}
      <header className="h-14 border-b border-white/5 flex items-center justify-between px-4 bg-[#0a0a0a]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-lg">C</div>
            <span className="font-semibold tracking-tight hidden sm:block">CodeFlow</span>
          </div>
          <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
          <div className="text-xs text-muted-foreground hidden lg:block">
            Project: <span className="text-white">my-app</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-md transition-colors ${isSidebarOpen ? 'text-primary' : 'text-muted-foreground hover:text-white'}`}
          >
            <PanelLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center bg-white/5 rounded-lg p-1">
            <button className="px-3 py-1 text-xs font-medium rounded-md bg-white/10 text-white flex items-center gap-2">
              <Code2 className="w-3 h-3 text-primary" />
              Code
            </button>
            <button className="px-3 py-1 text-xs font-medium rounded-md text-muted-foreground hover:text-white flex items-center gap-2">
              <Play className="w-3 h-3" />
              Run
            </button>
          </div>
          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`p-2 rounded-md transition-colors ${isChatOpen ? 'text-primary' : 'text-muted-foreground hover:text-white'}`}
          >
            <PanelRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* File Explorer */}
          {isSidebarOpen && (
            <>
              <ResizablePanel defaultSize={15} minSize={10} maxSize={30}>
                <FileExplorer />
              </ResizablePanel>
              <ResizableHandle className="w-1 bg-white/5 hover:bg-primary/20 transition-colors" />
            </>
          )}

          {/* Editor + Preview */}
          <ResizablePanel defaultSize={isChatOpen ? 50 : 85}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={60}>
                <CodeEditor />
              </ResizablePanel>
              <ResizableHandle className="h-1 bg-white/5 hover:bg-primary/20 transition-colors" />
              <ResizablePanel defaultSize={40}>
                <PreviewPanel sandbox={sandbox} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          {/* Chat Panel */}
          {isChatOpen && (
            <>
              <ResizableHandle className="w-1 bg-white/5 hover:bg-primary/20 transition-colors" />
              <ResizablePanel defaultSize={35} minSize={20} maxSize={50}>
                <ChatPanel sandbox={sandbox} initSandbox={initSandbox} isSandboxLoading={isSandboxLoading} />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>

      {/* Footer Status Bar */}
      <footer className="h-6 border-t border-white/5 bg-[#0a0a0a] flex items-center px-3 justify-between text-[10px] text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${sandbox ? 'bg-green-500 animate-pulse' : isSandboxLoading ? 'bg-yellow-500 animate-pulse' : 'bg-white/20'}`} />
            {sandbox ? 'Sandbox Ready' : isSandboxLoading ? 'Starting sandbox...' : isAuthenticated ? 'Ready' : 'Not signed in'}
          </div>
          <span>main</span>
        </div>
        <div className="flex items-center gap-3">
          <span>UTF-8</span>
          <span>TypeScript</span>
        </div>
      </footer>
    </div>
  )
}
