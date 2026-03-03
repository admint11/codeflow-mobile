import Editor from '@monaco-editor/react'
import { useEditorStore } from '@/store/editorStore'
import { X, FileCode } from 'lucide-react'

export function CodeEditor() {
  const { files, activeFile, setActiveFile, updateFile } = useEditorStore()

  const handleEditorChange = (value: string | undefined) => {
    if (activeFile && value !== undefined) {
      updateFile(activeFile, value)
    }
  }

  const getLanguage = (fileName: string) => {
    if (fileName.endsWith('.tsx') || fileName.endsWith('.ts')) return 'typescript'
    if (fileName.endsWith('.jsx') || fileName.endsWith('.js')) return 'javascript'
    if (fileName.endsWith('.css')) return 'css'
    if (fileName.endsWith('.html')) return 'html'
    if (fileName.endsWith('.json')) return 'json'
    return 'plaintext'
  }

  return (
    <div className="h-full flex flex-col bg-[#0a0a0a]">
      {/* Tabs */}
      <div className="h-10 border-b border-white/5 flex items-center bg-[#0a0a0a] overflow-x-auto no-scrollbar">
        {Object.keys(files).map((fileName) => (
          <div
            key={fileName}
            onClick={() => setActiveFile(fileName)}
            className={`h-full px-4 flex items-center gap-2 text-xs cursor-pointer border-r border-white/5 transition-colors group ${
              activeFile === fileName 
                ? 'bg-white/[0.03] text-white border-t-2 border-primary' 
                : 'text-muted-foreground hover:bg-white/[0.02] hover:text-white'
            }`}
          >
            <FileCode className={`w-3.5 h-3.5 ${activeFile === fileName ? 'text-primary' : 'text-muted-foreground'}`} />
            {fileName}
            <button className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-white/10 rounded transition-opacity">
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Monaco */}
      <div className="flex-1 relative">
        {activeFile ? (
          <Editor
            height="100%"
            language={getLanguage(activeFile)}
            theme="vs-dark"
            value={files[activeFile]}
            onChange={handleEditorChange}
            options={{
              fontSize: 14,
              fontFamily: "'Geist Mono', 'Fira Code', 'Consolas', monospace",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on',
              padding: { top: 16 },
              cursorBlinking: 'smooth',
              cursorSmoothCaretAnimation: 'on',
              smoothScrolling: true,
              lineNumbers: 'on',
              renderLineHighlight: 'all',
              scrollbar: {
                vertical: 'hidden',
                horizontal: 'hidden'
              }
            }}
            loading={
              <div className="h-full w-full flex items-center justify-center bg-[#0a0a0a]">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            }
          />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground flex-col gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
              <CodeCode className="w-8 h-8 text-primary/50" />
            </div>
            <p className="text-sm">Select a file to edit</p>
          </div>
        )}
      </div>
    </div>
  )
}

function CodeCode(props: any) {
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
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}
