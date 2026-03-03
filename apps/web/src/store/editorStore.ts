import { create } from 'zustand';

interface EditorState {
  files: Record<string, string>;
  activeFile: string | null;
  setActiveFile: (fileName: string) => void;
  updateFile: (fileName: string, content: string) => void;
  createFile: (fileName: string, content?: string) => void;
  deleteFile: (fileName: string) => void;
}

const defaultFiles: Record<string, string> = {
  'App.tsx': `import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>CodeFlow Mobile</h1>
      <p>Mobile-first IDE with AI Agent</p>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  );
}

export default App;
`,
  'index.css': `.App {
  text-align: center;
  padding: 2rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
`,
  'main.ts': `// Main entry point for the application
export function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet('CodeFlow Mobile'));
`,
};

export const useEditorStore = create<EditorState>((set) => ({
  files: defaultFiles,
  activeFile: 'App.tsx',
  
  setActiveFile: (fileName) => set({ activeFile: fileName }),
  
  updateFile: (fileName, content) => 
    set((state) => ({
      files: { ...state.files, [fileName]: content },
    })),
  
  createFile: (fileName, content = '') =>
    set((state) => ({
      files: { ...state.files, [fileName]: content },
      activeFile: fileName,
    })),
  
  deleteFile: (fileName) =>
    set((state) => {
      const { [fileName]: _, ...rest } = state.files;
      return {
        files: rest,
        activeFile: state.activeFile === fileName ? null : state.activeFile,
      };
    }),
}));
