import { fetchEventSource } from '@microsoft/fetch-event-source'
import { ResponseParamsType } from '@/pages/other/AI/types.d';

type ConfigType = {
  handleMessage?: (data: ResponseParamsType) => void,
  msg?: string
}
export function fetchDialogue(config: ConfigType) {
  return fetchEventSource('https://api.coze.cn/open_api/v2/chat', {
    method: 'POST',
    headers: {
      Authorization: `Bearer pat_V2wzn4QWkbTmqpO8EC9HvkdwxTP6epeP7FJB66tGmuM6amJ6nV1D1YG84tOH8Edu`,
      'Content-Type': 'application/json',
      Accept: '*/*',
      Host: 'api.coze.cn',
      Connection: 'keep-alive'
    },
    body: JSON.stringify({
      // conversation_id: "",
      bot_id: "7382494308215619647",
      user: "程序猿",
      query: config.msg,
      stream: true
    }),
    onmessage(ev) {
      const r = ev.data && JSON.parse(ev.data)
      config.handleMessage?.(r)
    }
  })
}