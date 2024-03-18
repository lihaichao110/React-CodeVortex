import style from './index.module.scss'
import { Segmented, Table, Tag, Button, Switch, Rate } from 'antd';
import type { TableProps } from 'antd';
import { useState } from 'react';

interface DataType {
  key: string;
  sku: string
  name: string;
  age: number;
  address: string;
  title: string
  tags: string[];
  tagType: string
}


export default function TabTable() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      width: 100,
      align: 'center',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 180,
      align: 'center',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '作者',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      align: 'center',
    },
    {
      title: '评级',
      dataIndex: 'pingji',
      key: 'pingji',
      align: 'center',
      width: 200,
      render: () => (
        <>
          <Rate />
        </>
      )
    },
    {
      title: '数量',
      dataIndex: 'age',
      key: 'age',
      width: 100,
      align: 'center',
    },
    {
      title: '开关',
      dataIndex: 'switch',
      key: 'switch',
      width: 100,
      align: 'center',
      render: () => (
        <>
          <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
        </>
      )
    },
    {
      title: '状态',
      key: 'tags',
      dataIndex: 'tags',
      align: 'center',
      width: 200,
      render: (_, { tags, tagType }) => (
        <>
          {tags.map((tag) => {
            return (
              <Tag color={tagType} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      width: 200,
      render: () => (
        <>
          <span>2024-03-13 17:38:00</span>
        </>
      )
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      fixed: 'right',
      width: 230,
      render: () => (
        <>
          <Button type="link">详情</Button>
          <Button type="link">编辑</Button>
          <Button type="link" danger>删除</Button>
        </>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      sku: 'E10001',
      title: '问世间情为何物',
      name: '李强',
      age: 32,
      address: '就按我的就看见阿德氨基酸',
      tags: ['success', 'developer'],
      tagType: 'success'
    },
    {
      key: '2',
      name: '虞书欣',
      title: '问世间情为何物',
      age: 42,
      sku: 'E10001',
      address: '几千万那你去问去问',
      tags: ['error'],
      tagType: 'error'
    },
    {
      key: '3',
      sku: 'E10001',
      name: '李文文',
      title: '问世间情为何物',
      age: 32,
      address: '群文件恩情文件筐请问',
      tags: ['success', 'teacher'],
      tagType: 'warning'
    },
    {
      key: '4',
      sku: 'E10001',
      name: '李文文',
      title: '问世间情为何物',
      age: 32,
      address: '群文件恩情文件筐请问',
      tags: ['success', 'teacher'],
      tagType: 'warning'
    },
    {
      key: '5',
      sku: 'E10001',
      title: '问世间情为何物',
      name: '虞书欣',
      age: 42,
      address: '几千万那你去问去问',
      tags: ['error'],
      tagType: 'error'
    },
  ];
  return (
    <div className={style.root}>
      <div className="tab-table-main">
        <Segmented
          style={{margin: '10px 0 10px 10px'}}
          options={['当天', '三日内', '七日内', '一月内', '一年内']}
          onChange={(value) => {
            console.log(value); // string
          }}
        />

        <Table 
          rowSelection={rowSelection} 
          columns={columns} 
          dataSource={data} 
          scroll={{ x: 'calc(700px + 50%)'}}
          pagination={false}/>
      </div>
    </div>
  )
}
