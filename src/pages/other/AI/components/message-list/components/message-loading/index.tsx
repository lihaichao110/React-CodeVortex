import styles from './index.module.scss'

export default function MessageLoading() {
  return (
    <div className={styles.loading}>
      <span className='loading-dot'></span>
      <span className='loading-dot'></span>
      <span className='loading-dot'></span>
    </div>
  )
}
