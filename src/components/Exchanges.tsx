import { Table } from 'antd'
import React from 'react'
import { useGetCryptoExchangeQuery } from '../services/cryptoApi'
import millify from 'millify'

const Exchanges = () => {

  const {data, isFetching} = useGetCryptoExchangeQuery()

  if(isFetching) return <h3>Loading...</h3>

  const exchanges = data.data.exchanges as {name:string,iconUrl:string,uuid:string,numberOfMarkets:number,rank:number,price:string,['24hVolume']:string}[]
  
  const rowData = exchanges.map(({name,iconUrl,numberOfMarkets,rank,price,['24hVolume']:volume}) => ({
    key:String(rank),
    exchange:[String(rank),iconUrl,name],
    volume:millify(Number(volume)),
    markets:numberOfMarkets,
    btcPrice:`$${Number(price).toFixed(2)}`,
  }))

  const columns = [
    {
      title: 'Exchange',
      dataIndex: 'exchange',
      key: 'exchange',
      render:(_,{exchange}) => {
        console.log(exchange);
        
        const [rank,iconUrl,name] = exchange
        return <div style={{display:'flex',alignItems:'center',gap:'.6rem'}}>
          <span style={{fontWeight:'600'}}>{rank}.</span>
          <img src={iconUrl} width={26} alt="image" />
          <span>{name}</span>
        </div>
      }
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
      title: 'Btc price',
      dataIndex: 'btcPrice',
      key: 'btcPrice',
    }
  ]
  
  return (
    <div>
      <h2>Exchanges</h2>
      <div>
        <Table columns={columns} dataSource={rowData}/>
      </div>
    </div>
  )
}

export default Exchanges