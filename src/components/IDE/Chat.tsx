import { useState, useRef, useEffect, useCallback } from 'react'
import { useAgent } from '@blinkdotnew/react'
import { codingAgent } from '@/lib/agent'
import { useEditorStore } from '@/store/editorStore'
import { Button } from '@/components/ui/button'
import { 
  Send, 
  Sparkles, 
  Terminal, 
  Trash2,
  StopCircle,
  Code2,
  Cpu
} from 'lucide-react'

interface ChatPanelProps {
  sandbox: any
  initSandbox: () => Promise<any>
  isSandboxLoading: boolean
}

export function ChatPanel({ sandbox, initSandbox, isSandboxLoading }: ChatPanelProps) {
  const { setPreviewUrl, setIsBuilding } = useEditorStore()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeSandbox, setActiveSandbox] = useState<any>(sandbox)

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    clearMessages
  } = useAgent({
    agent: codingAgent,
    sandbox: activeSandbox,
    onFinish: () => {
      if (activeSandbox && !isLoading) {
        setPreviewUrl(`https://${activeSandbox.getHost(3000)}`)
        setIsBuilding(false)
      }
    }
  })

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Keep activeSandbox in sync if parent created one
  useEffect(() => {
    if (sandbox && !activeSandbox) {
      setActiveSandbox(sandbox)
    }
  }, [sandbox])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Lazily create sandbox on first message
    let sbx = activeSandbox
    if (!sbx) {
      setIsBuilding(true)
      sbx = await initSandbox()
      if (!sbx) return // redirected to login or failed
      setActiveSandbox(sbx)
    }

    setIsBuilding(true)
    handleSubmit(e)
  }

  return (
    <div className="h-full flex flex-col bg-[#0a0a0a] border-l border-white/5">
      {/* Header */}
      <div className="h-10 px-4 border-b border-white/5 flex items-center justify-between bg-[#0a0a0a]/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">AI Agent</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={clearMessages}
            className="p-1.5 hover:bg-white/5 rounded-md transition-colors text-muted-foreground hover:text-white"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-auto p-4 flex flex-col gap-4 scrollbar-hide"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center gap-6 px-8 animate-in fade-in duration-700">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Welcome to CodeFlow AI</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tell me what you want to build. I can create projects, refactor code, 
                and deploy applications autonomously.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2 w-full max-w-xs">
              {[
                "Create a dark mode landing page",
                "Add a contact form with validation",
                "Explain the project structure"
              ].map((q, i) => (
                <button 
                  key={i}
                  className="p-3 text-xs text-left bg-white/[0.03] border border-white/5 rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all text-muted-foreground hover:text-white"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m) => (
            <div 
              key={m.id}
              className={`flex flex-col gap-2 ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-[90%] p-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-primary text-primary-foreground font-medium' 
                    : 'bg-white/[0.03] border border-white/5 text-white'
                }`}
              >
                {m.content}
              </div>
              
              {/* Tool Calls */}
              {m.parts?.map((part, i) => (
                part.type === 'tool-invocation' && (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-[#111] border border-white/5 rounded-full text-[10px] text-muted-foreground animate-pulse">
                    <Terminal className="w-3 h-3 text-primary" />
                    <span>Executing: {part.toolName}</span>
                  </div>
                )
              ))}
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/5 bg-[#0a0a0a]">
        <form onSubmit={onSubmit} className="relative group">
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Ask AI to build something..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 pr-14 text-sm resize-none focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all min-h-[100px] scrollbar-hide"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                onSubmit(e)
              }
            }}
          />
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            {isLoading ? (
              <button 
                type="button" 
                onClick={stop}
                className="p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors"
              >
                <StopCircle className="w-5 h-5" />
              </button>
            ) : (
              <button 
                type="submit" 
                disabled={!input.trim() || isSandboxLoading}
                className="p-2 bg-primary text-primary-foreground rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                <Send className="w-5 h-5" />
              </button>
            )}
          </div>
        </form>
        <div className="mt-2 flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-[10px] text-muted-foreground hover:text-white transition-colors">
              <Code2 className="w-3 h-3" />
              Attach Code
            </button>
            <button className="flex items-center gap-1.5 text-[10px] text-muted-foreground hover:text-white transition-colors">
              <Cpu className="w-3 h-3" />
              Model: Gemini 3 Flash
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground/50 italic">Shift + Enter for new line</p>
        </div>
      </div>
    </div>
  )
}
