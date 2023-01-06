import React, { useEffect, useState } from 'react'
import millify from 'millify'
import {Link} from 'react-router-dom'
import {Card, Row, Col, Input} from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'

const Cryptocurrencies = ({simplified}:{simplified:boolean}) => {
  const count = simplified ? 10: 100

  const {data, isFetching,error} = useGetCryptosQuery(count)
  //console.log(data);

  const [cryptos, setCryptos] = useState(data?.data?.coins)
  const [searchTerm,setSearchTerm] = useState('')

  useEffect(() => {
    const filteredData = data?.data?.coins.filter((coin:any) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setCryptos(filteredData)
  },[data,searchTerm])

  if(isFetching) return <h2>Loading...</h2>

  return (
    <>
      <div className='search-crypto'>
        {!simplified?<Input placeholder='Search Cryptocurrency' value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>:null}
      </div>  
      <Row gutter={[32,32]} className='crypto-card-container'>
        {cryptos?.map((currency:{uuid:string,rank:number,name:string,iconUrl:string,price:string}) => {
          return <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
            <Link to={`crypto/${currency.uuid}`}>
              <Card title={`${currency.rank}. ${currency.name}`}
                extra={<img src={currency.iconUrl} className='crypto-image'/>}
                hoverable>
                  <p>Price: {millify(Number(currency.price))}</p>
                  <p>Market Cap: {millify(Number(currency.price))}</p>
                  <p>Daily Change: {millify(Number(currency.price))}</p>
              </Card>
            </Link>
          </Col>
        })}
      </Row>
    </>
  )
}

export default Cryptocurrencies