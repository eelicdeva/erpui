// ||三斜线指令：https://www.tslang.cn/docs/handbook/triple-slash-directives.html

/// <reference types="vite/client" />

// ||以下设定用途作为代码提示
interface ImportMetaEnv {
  readonly VITE_TITLE: string
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
