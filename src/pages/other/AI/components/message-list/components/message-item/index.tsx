// import { Marked } from 'marked'
import { useMemo, useState } from "react";
// import { markedHighlight } from "marked-highlight";
// import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css'
import styles from './index.module.scss'
import classNames from 'classnames';
import Icon from '@/components/icon';
import Markdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
// import ClipboardJS from 'clipboard'

type MessageValueProps = {
  children: string
  role: 'user' | 'assistant'
}

export default function MessageItem({ children, role }: MessageValueProps) {

  // const marked = new Marked(
  //   markedHighlight({
  //     langPrefix: 'hljs language-',
  //     highlight(code, lang) {
  //       const language = hljs.getLanguage(lang) ? lang : 'plaintext';
  //       setPreHeader(language)
  //       return hljs.highlight(code, { language }).value;
  //     }
  //   })
  // );

  // const setPreHeader = (lang: string) => {
  //   const preAll = document.querySelectorAll('pre')
  //   if(!preAll || !preAll.length) return
  //   preAll.forEach((item) => {

  //     if(!item.querySelector('.hljs-header')) {   
  //       const copyDom = document.createElement('span')
  //       copyDom.innerText = '复制'
  //       copyDom.className = 'hljs_copy'     
  //       const hljsHeader = document.createElement('div')
  //       hljsHeader.innerText = lang
  //       hljsHeader.className = 'hljs-header'
  //       hljsHeader.appendChild(copyDom)
  //       item.appendChild(hljsHeader)
  //     }
  //   })
  // }
  // useEffect(() => {
  //   hljs.highlightAll()
  // }, [children])

  // const value = useMemo(() => {
  //   return marked.parse(children)

  //   // eslint-disable-next-line
  // }, [children])


  const [isCopySuccess, setIsCopySuccess] = useState(false)
  const handleCopy = (value: string) => {
    setIsCopySuccess(true)
    navigator.clipboard.writeText(value)

    setTimeout(() => {
      setIsCopySuccess(false)
    }, 2000);
  }
  return (
    <div className={classNames([
      styles.msg_item,
      role === 'user' && styles.msg_item_user
    ])}>
      <div className='message_item_box'>
        <div
          className={
            classNames([
              'talk-item',
              role === 'user' && 'talk-item-user',
            ])
          } 
          >
            <Markdown
              children={children}
              components={{
                code(props) {
                  const {children, className, ...rest} = props
                  const match = /language-(\w+)/.exec(className || '')
                  return match ? (
                    <SyntaxHighlighter
                      {...rest}
                      PreTag={CodeArea}
                      ref={null}
                      children={String(children).replace(/\n$/, '')}
                      language={match[1]}
                      style={atomDark}
                    />
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  )
                }
              }}
            />
          </div>
        <div className="action_bar" onClick={() => handleCopy(children)}>
          <div className="action_item">
            <Icon 
              style={{marginRight: 4}}
              iconName={isCopySuccess ? 'icon-chenggong' : 'icon-fuzhi'}></Icon>
            复制
          </div>
        </div>
      </div>
    </div>
  )
}

function CodeArea({children}: any) {
  const lang = useMemo(() => {
    const match = /language-(\w+)/.exec(children.props.className || '')
    return match ? match[1] : ''
  }, [children])
  return (
    <div className='code-area'>
      <div className="code-header">
        {lang}
        <span className="hljs_copy">
          <Icon 
            style={{marginRight: 4, fontSize: 14}}
            iconName={'icon-fuzhi'}></Icon>
          复制</span>
      </div>
      <code>{children}</code>
    </div>
  )
}