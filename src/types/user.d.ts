export type MenuItem = {
  label?: React.ReactNode, 
  key?: React.Key,  // 唯一标识，且是跳转地址
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group" | "divider",
  title?: string
}