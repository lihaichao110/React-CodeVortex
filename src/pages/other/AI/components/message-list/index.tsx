import classNames from "classnames"
import { MsgItem } from "../../types"
import styles from './index.module.scss'
import MessageLoading from "./components/message-loading"
type MessageListProps = {
  messsgeList: MsgItem[]
}
export default function MessageList({ messsgeList }: MessageListProps) {
  return (
    <div className={styles.msgls}>
      {
        messsgeList.map((item, index) => {
          return (
            <div 
              key={index}
              className={
                classNames([
                  'message-box', 
                  item.role === 'user' && 'message-box-user',
                ])
              }>
              <div 
                className={
                  classNames([
                    'talk-item',
                    item.role === 'user' && 'talk-item-user',
                  ])
                }>
                  { 
                    item.type === 'loading' 
                    ? <MessageLoading />
                    : <MessageItem>
                      { item.content }
                    </MessageItem>
                  }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

type MessageValueProps = {
  children: string
}
function MessageItem({ children }: MessageValueProps) {
  return (
    <>
      { 
        children
      }
    </>
  )
}
