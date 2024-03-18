import { useState, useEffect } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

export default function RichText() {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null) 

  // 编辑器内容
  const [html, setHtml] = useState('<p>hello</p>')

  useEffect(() => {
    setTimeout(() => {
        setHtml(`<h1>正文标题</h1><p><strong>加粗文字</strong></p><p><span style="color: rgb(54, 88, 226);">hello world😂</span></p>
          <pre><code class="language-jsx">const arr = [1, 2, 3, 4]</code></pre><p><br></p>`)
    }, 500)
  }, [])

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = { } 

  const editorConfig: Partial<IEditorConfig> = {    
    placeholder: '请输入内容...',
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])
  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100}}>
        <Toolbar
            editor={editor}
            defaultConfig={toolbarConfig}
            mode="default"
            style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
            defaultConfig={editorConfig}
            value={html}
            onCreated={setEditor}
            onChange={editor => setHtml(editor.getHtml())}
            mode="default"
            style={{ height: '500px', overflowY: 'hidden' }}
        />
    </div>
    {/* <div style={{ marginTop: '15px' }}>
        {html}
    </div> */}
    </>
  )
}
