import classNames from "classnames"
import { MsgItem } from "../../types"
import styles from './index.module.scss'
import MessageLoading from "./components/message-loading"
import MessageItem from "./components/message-item"

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
                { 
                  item.type === 'loading' 
                  ? <MessageLoading />
                  : <MessageItem role={item.role}>
                    { item.content }
                  </MessageItem>
                }
            </div>
          )
        })
      }
    </div>
  )
}
