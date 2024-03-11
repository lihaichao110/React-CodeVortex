import { Layout } from "antd";
import styles from './index.module.scss'

export default function AppFooter() {
  const { Footer } = Layout;
  return (
    <div className={styles.root}>
      <Footer className="footer">
        2024 © 李海超 {new Date().getFullYear()} Created by Ant UED
      </Footer>
    </div>
  )
}
