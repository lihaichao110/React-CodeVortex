import { useEffect, useState } from 'react'
import Editor from 'for-editor'
import style from './index.module.scss'
export default function MarkDown() {
  const [markdown, setMarkdown] = useState(``)

  useEffect(() => {
    setTimeout(() => {
      setMarkdown(`<div align="center">
      <h1> CodeVortex
      <img width="200" src="https://img.shields.io/github/last-commit/chuzhixin/vue-admin-beautiful?style=flat-square&logo=GitHub"/>
        <img width="100" src="https://img.shields.io/github/stars/chuzhixin/vue-admin-beautiful?style=flat-square&logo=GitHub"/>
      </h1>
    </div>
    
  ## 欢迎使用 CodeVortex
    
  -[🎉 react + ant design](https://lihaichao.cn)`
    )
    }, 1000)
  }, [])

  const handleChange = (value: string) => {
    console.log(value, 'value')
    setMarkdown(value)
  }
  return (
    <div className={style.root}>
      <Editor 
        height='100%'
        preview={true}
        subfield={true}
        value={markdown} 
        onChange={(value) => handleChange(value)} />
    </div>
  )
}
