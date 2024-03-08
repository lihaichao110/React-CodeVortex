interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_APP_API: string
  readonly VITE_APP_BASEURL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}