import React, { useEffect, useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'

const {Text, Title} = Typography
const {Option} = Select

const demoImage = 'https://cdn-icons-png.flaticon.com/512/5266/5266753.png'

const News = ({simplified}:{simplified:boolean}) => {

  const [category, setCategory] = useState('Cryptocurrency')
  const {data:news } = useGetCryptoNewsQuery({newsCategory:category,count:simplified?3:12})
  const {data:cryptos} = useGetCryptosQuery(100)

  if(!news?.value) return <h2>Loading...</h2>

  return (
    <Row gutter={[24,24]}>
      {!simplified?<Col span={24}>                                                                                                                                                 {/*alguna de las opciones contendra lo que voy escribiendo en el input*/}
        <Select showSearch className='select-news' placeholder='Select a Crypto' optionFilterProp='children' onChange={value => setCategory(value)} filterOption={(input,option) => (option?.children as unknown as string).toLowerCase().indexOf(input.toLowerCase())>=0}>
            <Option value='Cryptocurrency'>Cryptocurrency</Option>
            {cryptos?.data?.coins.map((coin:any) => <Option value={coin.name}>{coin.name}</Option>)}
        </Select>
      </Col>:null}

      {news?.value?.map((notice:any,i:number) => {
        return <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href={notice.url} target="_blank" >
              <div className='news-image-container'>
                <Title className='news-title' level={4}>{notice.name}</Title>
                <img style={{maxWidth:'125px',maxHeight:'125px'}} src={notice?.image?.thumbnail?.contentUrl || demoImage} alt='news'/>
              </div> 
              <p>
                {notice.description > 100?`${notice.description.substring(0,100)}...`:notice.description}
              </p>
              <div className='provider-container'> 
                <div>
                  <Avatar src={notice.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='news'/>
                  <Text className='provider-name'>{notice.provider[0].name}</Text>
                </div>
                  <Text>{moment(notice.datePublished).startOf("s").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      })}
      
    </Row>
  )
}

export default News