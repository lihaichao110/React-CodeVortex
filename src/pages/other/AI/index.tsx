import { useState } from 'react'
import styles from './index.module.scss'
import { fetchDialogue } from '@/api/AI'
import type { ResponseParamsType, MsgItem } from './types'
import { Input, Button, Flex, Tooltip, message } from 'antd';
import MessageList from './components/message-list';
import Icon from '@/components/icon';
import EmptyComponent from './components/empty-component';

const { TextArea } = Input;

export default function AIChart() {
  const [messageApi, contextHolder] = message.useMessage();

  const [questionValue, setQuestionValue] = useState('')
  const [msg, setMessage] = useState<MsgItem[]>([])
  const handleSend = async () => {
    if(!questionValue) return messageApi.error('请输入内容')

    setMessage((value) => [...value, {
      role: 'user',
      content: questionValue,
      content_type: 'text'
    }, {
      role: 'assistant',
      content: '',
      content_type: 'text',
      type: 'loading'
    }])
    setQuestionValue('')
    try {
      await fetchDialogue({
        handleMessage: handleMessage,
        msg: questionValue
      })
    } catch(err) {
      return console.log(err)
    }
  }


  let str = ''
  const handleMessage = (ev: ResponseParamsType) => {
    console.log(ev, 'eee');
    if(ev.event === 'done') {
      console.log('全部完成');
      return
    } else {
      // console.log(ev.message, 'msg');
    }
    
    if(!ev.is_finish) {
      str += (ev.message.content || '')
      setMessage((value) => {
        value[value.length - 1] = {
          role: ev.message.role || 'assistant',
          content: str || '服务器繁忙！！！',
          content_type: ev.message.content_type || 'text',
          type: ev.message.type || "answer"
        }
        return [...value]
      })
    } else {
      str = ''
    }
  }
  return (
    <div className={styles.ai}>
      <div className="container">
        {contextHolder}
        <div className="message-list">
          {
            msg?.length 
            ? <MessageList messsgeList={msg}/>
            : <EmptyComponent />
          }
        </div>
        <div className="footer">
          <Flex className='footer-flex'>
            <TextArea
              className='chat-input'
              placeholder="发消息、Shift + Enter 换行" 
              autoSize 
              value={questionValue}
              onPressEnter={(e) => {
                e.preventDefault()
                handleSend()
              }}
              onChange={(e) => setQuestionValue(e.target.value)}
            />
            <Tooltip title="发送">
              <Button
                disabled={!questionValue}
                onClick={handleSend}
                className='send-btn'
                type="primary" 
                shape="circle">
                  <Icon 
                    iconName='icon-jiantou' 
                    style={{ fontSize: 24 }}
                  ></Icon>
              </Button>
            </Tooltip>
          </Flex>
        </div>
      </div>
    </div>
  )
}
