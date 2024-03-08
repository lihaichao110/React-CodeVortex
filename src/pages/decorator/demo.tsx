import { Component } from 'react'
import style from './index.module.scss' 

// 定义参数类型
interface PropsType {
  title: string
}
type LoginType = typeof Login | PropsType
function validateDecorator(target: LoginType) {
  // const targetClass = target as PropsType
  (target as unknown as PropsType).title = '测试'
}

@validateDecorator
export default class Login extends Component {
  render() {
    const { title } = Login as unknown as PropsType
    return (
      <>
        <div>{ title }</div>
        <div className={style.root}>
          <div className="box color"></div>
        </div>
      </>
    )
  }
}
