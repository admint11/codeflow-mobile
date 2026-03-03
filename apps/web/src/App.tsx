import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { useEditorStore } from './store/editorStore';

function App() {
  const { files, activeFile, setActiveFile, updateFile } = useEditorStore();
  const [aiPrompt, setAiPrompt] = useState('');

  const handleEditorChange = (value: string | undefined) => {
    if (activeFile && value !== undefined) {
      updateFile(activeFile, value);
    }
  };

  const handleAiSubmit = () => {
    // AI agent integration will be added here
    console.log('AI Prompt:', aiPrompt);
    alert('AI Agent coming soon! Prompt: ' + aiPrompt);
  };

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e] text-white">
      {/* Header */}
      <header className="h-14 bg-[#252526] border-b border-[#3c3c3c] flex items-center px-4 justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-[#007acc]">CodeFlow</h1>
          <span className="text-xs text-[#858585]">Mobile IDE</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-[#007acc] text-white text-sm rounded hover:bg-[#005a9e] transition">
            Run
          </button>
          <button className="px-3 py-1.5 bg-[#3c3c3c] text-white text-sm rounded hover:bg-[#4a4a4a] transition">
            Build
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - File Explorer */}
        <aside className="w-56 bg-[#252526] border-r border-[#3c3c3c] flex flex-col">
          <div className="p-3 text-xs font-semibold text-[#bbbbbb] uppercase tracking-wide">
            Explorer
          </div>
          <div className="flex-1 overflow-auto">
            {Object.keys(files).map((fileName) => (
              <button
                key={fileName}
                onClick={() => setActiveFile(fileName)}
                className={`w-full text-left px-4 py-1.5 text-sm flex items-center gap-2 hover:bg-[#2a2d2e] ${
                  activeFile === fileName ? 'bg-[#37373d] text-white' : 'text-[#969696]'
                }`}
              >
                <span className="text-[#858585]">
                  {fileName.endsWith('.ts') || fileName.endsWith('.tsx') ? '📘' : 
                   fileName.endsWith('.js') || fileName.endsWith('.jsx') ? '📒' :
                   fileName.endsWith('.css') ? '🎨' : '📄'}
                </span>
                {fileName}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Editor Area */}
        <main className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="h-9 bg-[#252526] flex items-center">
            {activeFile && (
              <div className="h-full px-4 bg-[#1e1e1e] border-t-2 border-[#007acc] text-sm flex items-center gap-2">
                <span className="text-[#858585]">
                  {activeFile.endsWith('.ts') || activeFile.endsWith('.tsx') ? '📘' : '📄'}
                </span>
                {activeFile}
              </div>
            )}
          </div>

          {/* Monaco Editor */}
          <div className="flex-1">
            {activeFile && files[activeFile] ? (
              <Editor
                height="100%"
                language={activeFile.endsWith('.ts') || activeFile.endsWith('.tsx') ? 'typescript' :
                         activeFile.endsWith('.js') || activeFile.endsWith('.jsx') ? 'javascript' :
                         activeFile.endsWith('.css') ? 'css' : 'plaintext'}
                theme="vs-dark"
                value={files[activeFile]}
                onChange={handleEditorChange}
                options={{
                  fontSize: 14,
                  fontFamily: "'Fira Code', 'Consolas', monospace",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: 'on',
                }}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-[#858585]">
                <div className="text-center">
                  <p className="text-2xl mb-2">📱</p>
                  <p>Select a file to edit</p>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* AI Agent Panel */}
        <aside className="w-72 bg-[#252526] border-l border-[#3c3c3c] flex flex-col">
          <div className="p-3 text-xs font-semibold text-[#bbbbbb] uppercase tracking-wide flex items-center gap-2">
            <span>🤖</span> AI Agent
          </div>
          <div className="flex-1 p-3 overflow-auto">
            <div className="text-sm text-[#858585] mb-4">
              Ask the AI to help with your code:
            </div>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g., 'Refactor this function' or 'Explain this code'"
              className="w-full h-32 bg-[#3c3c3c] text-white text-sm p-3 rounded resize-none border border-[#3c3c3c] focus:border-[#007acc] outline-none"
            />
            <button
              onClick={handleAiSubmit}
              className="w-full mt-3 py-2 bg-[#007acc] text-white text-sm rounded hover:bg-[#005a9e] transition flex items-center justify-center gap-2"
            >
              <span>✨</span> Ask AI
            </button>
          </div>
        </aside>
      </div>

      {/* Status Bar */}
      <footer className="h-6 bg-[#007acc] flex items-center px-3 text-xs text-white justify-between">
        <div className="flex items-center gap-4">
          <span>main*</span>
          <span>0 errors</span>
        </div>
        <div className="flex items-center gap-4">
          <span>TypeScript 5.3</span>
          <span>UTF-8</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
