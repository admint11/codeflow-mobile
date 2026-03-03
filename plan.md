# CodeFlow Mobile - Project Plan

## Project Overview
Rebuild Microsoft VS Code as a mobile-first IDE with built-in AI agent capabilities, using:
- TypeScript + Vite (frontend)
- Rust (editor core - syntax, LSP, Git)
- Swift (iOS native UI)
- Alibaba OpenSandbox (cloud execution)
- Built-in AI Agent

---

## Architecture

### 1. Mobile-First Shell (Swift + React Native equivalent via JSI)
- Native iOS UI with Swift
- React Native-like experience using TurboModules/JSI
- Bridge-less communication between Swift and JS
- File system access, notifications, camera for code scanning

### 2. Editor Core (Rust)
- **Monaco-compatible editor** - Use rust-monaco or build custom
- **Tree-sitter** for syntax highlighting (fast, mobile-optimized)
- **LSP implementation** - Language Server Protocol in Rust
- **Git integration** - Using git2-rs for version control
- **File system** - WASM-based or Rust async fs

### 3. Frontend (TypeScript + Vite + React)
- Vite for 60fps HMR during development
- React for UI with mobile gestures
- TailwindCSS for styling
- Mobile-optimized components (touch-friendly)

### 4. AI Agent Core
- Claude/GPT API integration
- Code completion, refactoring, debugging assistance
- Natural language to code
- Agentic workflows (multi-step tasks)

### 5. Cloud Sandbox (OpenSandbox)
- Remote code execution
- Containerized environments per project
- VS Code in browser mode
- Network isolation for security

---

## Tech Stack Summary

| Layer | Technology |
|-------|------------|
| Mobile Shell | Swift + JSI/TurboModules |
| Editor Engine | Rust (tree-sitter, LSP, git2) |
| UI Framework | React + Vite + Tailwind |
| AI Layer | Claude API / OpenAI |
| Cloud | Alibaba OpenSandbox |
| Build | Cargo + npm workspaces |

---

## Key Features

### Mobile-Specific
- Touch-friendly code editor with gestures
- Mobile file browser
- Voice input for code (dictation)
- Camera scanning for code snippets
- Offline-first with sync

### Editor Features
- Syntax highlighting (100+ languages via tree-sitter)
- IntelliSense autocomplete
- Git integration (commit, push, pull, branches)
- Multi-file editing with tabs
- Terminal emulator

### AI Agent Features
- Inline code completion
- Natural language commands ("refactor this function")
- Bug detection and fixes
- Code explanation
- Test generation
- Auto-debugging

### Cloud Features
- Remote build execution
- Environment provisioning
- Team collaboration
- Deployment pipelines

---

## Phase 1: Core MVP (Weeks 1-4)

1. **Week 1**: Project setup, Swift shell, Vite + React frontend
2. **Week 2**: Rust editor core integration with Monaco
3. **Week 3**: Basic Git integration, file system
4. **Week 4**: AI agent basic integration

## Phase 2: Mobile Features (Weeks 5-8)

5. **Week 5-6**: Touch gestures, mobile UI polish
6. **Week 7-8**: Camera, voice, offline sync

## Phase 3: Cloud (Weeks 9-12)

9. **Week 9-10**: OpenSandbox integration
10. **Week 11-12**: Remote execution, deployment

---

## Repository Structure (Proposed)

```
codeflow-mobile/
├── apps/
│   ├── mobile/          # iOS Swift app
│   ├── web/             # Web version (PWA)
│   └── sandbox/         # OpenSandbox integration
├── packages/
│   ├── core/            # Shared Rust core
│   ├── editor/          # Rust editor engine
│   ├── ai-agent/        # AI agent logic
│   ├── lsp/             # Language server
│   └── ui/              # React components
├── services/
│   └── opensandbox/     # Cloud execution
└── README.md
```

---

## References
- VS Code: https://github.com/microsoft/vscode
- VS Code Generator: https://github.com/microsoft/vscode-generator-code
- OpenSandbox: https://github.com/alibaba/OpenSandbox
- Tree-sitter: https://tree-sitter.github.io
- Swift JSI: https://reactnative.dev/docs/native-modules-jsi
