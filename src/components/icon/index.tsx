import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4462862_5keyiv7vpe6.js', // iconfont
    '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js', // icon-javascript, icon-java, icon-shoppingcart (overrided)
  ],
});
const Icon = ({ iconName, style }: { iconName: string, style?: any }) => {
  return (
    <IconFont type={iconName} style={style}/>
  )
}

export default Icon