export interface ResponseParamsType {
  conversation_id: string
  event: string
  index: number
  is_finish: boolean
  seq_id: number
  message: {
    content: string
    content_type: "text" | 'answer'
    role: 'user' | 'assistant'
    type: string
  }
  error_information: {
    err_code: number
    err_msg: string
  }
}

export interface MsgItem {
  role: 'user' | 'assistant'
  type?: string
  content_type: "text" | 'answer'
  content: string
}