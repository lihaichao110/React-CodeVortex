import { useLocation, useOutlet } from 'react-router-dom'
import { SwitchTransition, CSSTransition } from "react-transition-group";
import style from './index.module.scss'
// import { useRef } from 'react';

export default function AppMain() {
  const location = useLocation()
  const currentOutlet = useOutlet();
  return (
    <div className={style.root}>
      <div className="app_main">
        <SwitchTransition mode='out-in'>
          <CSSTransition 
            key={location.key}
            timeout={300}
            classNames="fade">
            {currentOutlet}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  )
}
