import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4462862_hbzle8bc385.js', // iconfont
    '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js', // icon-javascript, icon-java, icon-shoppingcart (overrided)
  ],
});
const Icon = ({ iconName }: { iconName: string }) => {
  return (
    <IconFont type={iconName} />
  )
}

export default Icon