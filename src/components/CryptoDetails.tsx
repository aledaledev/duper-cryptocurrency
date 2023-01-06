import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import {useParams} from 'react-router-dom'
import millify from 'millify'
import {Col, Row, Typography, Select} from 'antd'
import { useGetCryptoDetailsQuery } from '../services/cryptoApi'
import { CheckOutlined, DollarCircleOutlined, ExclamationCircleOutlined, FundOutlined, MoneyCollectOutlined, NumberOutlined, StopOutlined, ThunderboltOutlined, TrophyOutlined } from '@ant-design/icons'

const {Title, Text} = Typography
const { Option } = Select

const CryptoDetails = () => {

  const {coinId} = useParams()
  const [timePeriod, setTimePeriod] = useState('7d')
  const {data, isFetching,error} = useGetCryptoDetailsQuery(coinId)
  const crypto = data?.data?.coin
  console.log(crypto);
  
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${crypto?.price && millify(crypto?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: crypto?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${crypto?.['24hVolume'] && millify(crypto?.['24hVolume'])} `, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${crypto?.marketCap && millify(crypto?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${crypto?.allTimeHigh?.price && millify(crypto?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: crypto?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: crypto?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: crypto?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${crypto?.supply?.total && millify(crypto?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${crypto?.supply?.circulating && millify(crypto?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className='coin-datail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {crypto?.name} ({crypto?.symbol}) Price
        </Title>
        <p>
          {crypto?.name} live proice in US dollars.
          View value statistics, market cap and supply.
        </p>
      </Col>                                                                               {/*este select nos permite hacer esta locura*/}
      <Select defaultValue='7d' className='select-timeperiod' placeholder='Select Time Period' onChange={value => setTimePeriod(value)}>
        {time.map(date => <Option key={date}>{date}</Option>)}
      </Select> 
      <Col className='stats-container'>
          <Col className='coin-value-statistics'>
            <Col className='coin-value-statistics-heading'>
              <Title level={3} className='coin-datailes-heading'>
                {crypto?.name} Value Statistics
              </Title>
              <p>
                An overview showing the stats of all cryptocurrencies
              </p>
            </Col>
            {stats.map(({icon,title,value}) => (
              <Col className='coin-stats' key={title}>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className='stats'>{value}</Text>
              </Col>
            ))}
          </Col>
          <Col className='other-stats-info'>
            <Col className='coin-value-statistics-heading'>
              <Title level={3} className='coin-datailes-heading'>
                {crypto?.name} Value Statistics
              </Title>
              <p>
                An overview showing the stats of {crypto?.name}
              </p>
            </Col>
            {genericStats.map(({icon,title,value}) => (
              <Col className='coin-stats' key={title}>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className='stats'>{value}</Text>
              </Col>
            ))}
          </Col>
      </Col>
      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Title level={3} className='coin-details-heading'>
              What is {CryptoDetails.name}?
              {HTMLReactParser(crypto?.description)}
          </Title>
        </Row>
        <Col className='coin-links'>
            <Title level={3} className='coin-details-heading'>
              {crypto?.name} Links
            </Title>
            {crypto?.links.map((link:any) => (
              <Row className='coin-link' key={link.url}>
                <Title level={5} className='link-name'>
                  {link.type}
                </Title>
                <a href={link.url} target='_blank' rel='noreferrer'>{link.name}</a>
              </Row>
            ))}
        </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails