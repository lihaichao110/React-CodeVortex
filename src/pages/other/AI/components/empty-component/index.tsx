import style from './index.module.scss'
import Icon from '@/components/icon'


export default function EmptyComponent() {
  return (
    <div className={style.empty}>
      <div className="content">
        <div className='title'>你好，程序猿</div>
        <div className="title">让我们一起度过美好的一天！</div>
        <div className="example-box">
          <div className="example-item">
            <div className="create-icon">
              <Icon iconName='icon-gaojisousuo' style={{ fontSize: '20px' }}></Icon>
            </div>
            <div className="create-text">
              <div className="text">AI 搜索</div>
              <div className="sub-text">搜索最新资讯，让信息搜集效率翻倍</div>
            </div>
          </div>
          <div className="example-item">
          <div className="create-icon">
            <Icon iconName='icon-tupianshengcheng' style={{ fontSize: '20px' }}></Icon>
          </div>
            <div className="create-text">
              <div className="text">图像生成</div>
              <div className="sub-text">按照你的想象，生成各类风格的图像</div>
            </div>
          </div>
          <div className="example-item">
          <div className="create-icon">
            <Icon iconName='icon-xiezuopingtai' style={{ fontSize: '20px' }}></Icon>
          </div>
            <div className="create-text">
              <div className="text">帮我写作</div>
              <div className="sub-text">提供写作灵感，驾驭各类体裁和风格</div>
            </div>
          </div>
          <div className="example-item">
          <div className="create-icon">
            <Icon iconName='icon-yuedu' style={{ fontSize: '20px' }}></Icon>
          </div>
            <div className="create-text">
              <div className="text">阅读总结</div>
              <div className="sub-text">速读各类文章，迅速了解摘要和洞察</div>
            </div>
          </div>
        </div>
        <div className="example-txt">试试这些例子</div>
        <div className="examples-create">  
          <div className="example-item-txt">
            搜索一下: Meta 宣布启动硬件部门最大规模重组，有什么新变化？
            <Icon iconName='icon-arrowRight' style={{fontSize: 18, marginLeft: 10}}></Icon>
          </div>
          <div className="example-item-txt">
            图像生成: 荒凉星球上的猛犸象        
            <Icon iconName='icon-arrowRight' style={{fontSize: 18, marginLeft: 10}}></Icon>
          </div>
          <div className="example-item-txt">
            写一篇作文：探讨人工智能的广泛应用带来的影响以及相应的思考
            <Icon iconName='icon-arrowRight' style={{fontSize: 18, marginLeft: 10}}></Icon>
          </div>
          <div className="example-item-txt">
            总结文章的主要内容: 发布版 InfoQ 大模型测评报告2024.pdf
            <Icon iconName='icon-arrowRight' style={{fontSize: 18, marginLeft: 10}}></Icon>
          </div>
        </div>
      </div>
    </div>
  )
}
