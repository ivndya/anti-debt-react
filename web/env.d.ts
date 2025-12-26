/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  // добавляй здесь другие переменные окружения при необходимости
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
