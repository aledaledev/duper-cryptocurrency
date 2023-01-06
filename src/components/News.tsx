import React, { useEffect, useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'
import {Link} from 'react-router-dom'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'

const {Text, Title} = Typography
const {Option} = Select

const demoImage = 'https://cdn-icons-png.flaticon.com/512/5266/5266753.png'

const News = ({simplified}) => {

  const {data, isFetching} = useGetCryptoNewsQuery({newsCategory:'Cryptocurrencies',count:simplified?3:12})
  //const [news, setNews] = useState(data?.value)

  if(!data?.value) return <h2>Loading...</h2>


  console.log(data);

  return (
    <Row gutter={[24,24]}>

      {data?.value?.map((notice,i) => {
        return <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href={notice.url} target="_blank" >
              <div className='news-image-container'>
                <Title className='news-title' level={4}>{notice.name}</Title>
                <img style={{maxWidth:'200px',maxHeight:'200PX'}} src={notice?.image?.thumbnail?.contentUrl || demoImage} alt='news'/>
              </div> 
              <p>
                {notice.description > 100?`${notice.description.substring(0,100)}...`:notice.description}
              </p>
              <div className='provider-container'> 
                <div>
                  <Avatar src={notice.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='news'/>
                  <Text className='provider-name'>{notice.provider[0].name}</Text>
                </div>
                  <Text>{moment(notice.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      })}
      
    </Row>
  )
}

export default News