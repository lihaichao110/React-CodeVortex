interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_APP_API: string
  readonly VITE_APP_BASEURL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

type RouteType = {
  path?: string
  element?: React.ReactNode
  Component?: React.ComponentType
  children?: RouteType[]
  index?: boolean
  label?: string
  icon?: React.ReactNode
}
