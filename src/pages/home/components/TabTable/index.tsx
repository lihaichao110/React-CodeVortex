import style from './index.module.scss'
import { Segmented, Table, Tag, Button, Switch, Rate } from 'antd';
import type { TableProps } from 'antd';
import { useState } from 'react';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
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
      title: '标题',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '作者',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '评级',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
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
      align: 'center',
    },
    {
      title: '开关',
      dataIndex: 'address',
      key: 'address',
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
      dataIndex: 'address',
      key: 'address',
      align: 'center',
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
      name: '李强',
      age: 32,
      address: '就按我的就看见阿德氨基酸',
      tags: ['success', 'developer'],
      tagType: 'success'
    },
    {
      key: '2',
      name: '虞书欣',
      age: 42,
      address: '几千万那你去问去问',
      tags: ['error'],
      tagType: 'error'
    },
    {
      key: '3',
      name: '李文文',
      age: 32,
      address: '群文件恩情文件筐请问',
      tags: ['success', 'teacher'],
      tagType: 'warning'
    },
    {
      key: '3',
      name: '李文文',
      age: 32,
      address: '群文件恩情文件筐请问',
      tags: ['success', 'teacher'],
      tagType: 'warning'
    },
    {
      key: '2',
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

        <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false}/>
      </div>
    </div>
  )
}
