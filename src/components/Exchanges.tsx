import { Table } from 'antd'
import React from 'react'
import { useGetCryptoExchangeQuery } from '../services/cryptoApi'

const columns = [
  {
    title: 'Exchange',
    dataIndex: 'exchange',
    key: 'exchange',
  },
  {
    title: '24h Trade Volume',
    dataIndex: 'volume',
    key: 'volume',
  },
  {
    title: 'Markets',
    dataIndex: 'markets',
    key: 'markets',
  },
  {
    title: 'Change',
    key: 'change',
    dataIndex: 'change',
  }
]

const rowData = [
  {
    key: '1',
    exchange: 'John Brown',
    volume: 32,
    markets: 'New York No. 1 Lake Park',
    change: '242k'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const Exchanges = () => {

  const {data, isFetching} = useGetCryptoExchangeQuery()

  if(isFetching) return <h3>Loading...</h3>

  const exchanges = data.data.exchanges as {name:string,iconUrl:string,uuid:string,numberOfMarkets:number,rank:number,price:string,['24hVolume']:string}[]
  
  console.log(exchanges);
  
  return (
    <div>
      <h2>Exchanges</h2>
      <div>
        {exchanges.map(({name,iconUrl,uuid,numberOfMarkets,rank,price,['24hVolume']:volume}) => (
          <div key={uuid}>
            <h4>{name}</h4>
            <img src={iconUrl} width={22} alt="image" />
            <p>{numberOfMarkets}</p>
            <p>{rank}</p>
            <p>{price}</p>
            <p>{volume}</p>
          </div>
        ))}
        <Table columns={columns} dataSource={rowData}/>
      </div>
    </div>
  )
}

export default Exchanges