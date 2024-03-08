import style from './index.module.scss'
import loading from '@/assets/imgs/loading.gif'
export default function Loading() {
  window.onmousemove = function (e) {
    const original = document.querySelector('.original')! as HTMLElement
    if(!original) return
    original.style.left = e.clientX + 'px'
    original.style.top = e.clientY + 'px'
  }
  return (
    <div className={style.root}>
      <div className="loading">
        <img src={loading} alt="loading" />
      </div>
      <div className="mouse original"></div>
    </div>
  )
}
