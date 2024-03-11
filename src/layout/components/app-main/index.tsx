import { Outlet } from 'react-router-dom'
import style from './index.module.scss'

export default function AppMain() {
  return (
    <div className={style.root}>
      <div className="app_main">
        <Outlet />
      </div>
    </div>
  )
}
