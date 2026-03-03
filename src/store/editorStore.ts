import { create } from 'zustand';

interface EditorState {
  files: Record<string, string>;
  activeFile: string | null;
  setActiveFile: (fileName: string) => void;
  updateFile: (fileName: string, content: string) => void;
  setFiles: (files: Record<string, string>) => void;
  previewUrl: string;
  setPreviewUrl: (url: string) => void;
  isBuilding: boolean;
  setIsBuilding: (building: boolean) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  files: {
    'App.tsx': '// App.tsx\nexport default function App() {\n  return <div>Hello World</div>\n}',
    'index.css': 'body { background: #000; color: #fff; }',
  },
  activeFile: 'App.tsx',
  setActiveFile: (fileName) => set({ activeFile: fileName }),
  updateFile: (fileName, content) =>
    set((state) => ({
      files: { ...state.files, [fileName]: content },
    })),
  setFiles: (files) => set({ files }),
  previewUrl: '',
  setPreviewUrl: (url) => set({ previewUrl: url }),
  isBuilding: false,
  setIsBuilding: (building) => set({ isBuilding: building }),
}));
