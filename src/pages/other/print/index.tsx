import styles from './index.module.scss'
import { Button, Flex, Modal, Input } from 'antd';
import printJS from 'print-js'
import { useState } from 'react';


export default function Print() {
  const printImg = () => {
    printJS({
      printable: [
        'https://img1.baidu.com/it/u=797193422,321383851&fm=253&fmt=auto&app=138&f=JPEG?w=600&h=356',
        'https://img2.baidu.com/it/u=1329976138,298238732&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=313'
      ],
      type: 'image',
      header: 'My cool image header',
      imageStyle: `display: block;margin: 0 auto;page-break-after: always;max-width:100%`
    })
  }

  const printJsonTable = () => {
    const myData = [
      {
        name: 'John Doe',
        email: 'john@doe.com',
        phone: '111-111-1111'
      },
      {
        name: 'Barry Allen',
        email: 'barry@flash.com',
        phone: '222-222-2222'
      },
      {
        name: 'Cool Dude',
        email: 'cool@dude.com',
        phone: '333-333-3333'
      }
    ]
    printJS({
      printable: myData, 
      type: 'json', 
      properties: ['name', 'email', 'phone'],
      gridHeaderStyle: 'color: red;  border: 2px solid #3971A5;',
      gridStyle: 'border: 2px solid #3971A5;'
    })
  }

  const { TextArea } = Input;
  const [inputValue, setInputValue] = useState('<h1>标题</h1>')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const printHtml = () => {
    printJS({ 
      printable: inputValue, 
      type: 'raw-html', 
      header: 'PrintJS - Form Element Selection' ,
      style: `@page { size: auto; } .paging{page-break-after: always;}`
    })
  }
  return (
    <div className={styles.root}>
      <Flex gap="small" wrap="wrap">
        <Button type="primary" onClick={printImg}>打印图片</Button>
        <Button type="primary" onClick={printJsonTable}>打印表格</Button>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>打印HTML</Button>
      </Flex>

      <Modal 
        title="自定义打印内容" 
        open={isModalOpen} 
        onOk={printHtml} 
        onCancel={() => setIsModalOpen(false)}>
          <TextArea
            rows={4} 
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue} />
      </Modal>
    </div>
  )
}
