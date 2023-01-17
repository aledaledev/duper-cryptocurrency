import React from 'react'
import {Line} from 'react-chartjs-2'
import {Col, Row, Typography} from 'antd'
import { Chart as ChartJS,registerables } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
ChartJS.register(...registerables);

const {Title} = Typography

const LineChart = ({coinHistory,currentPrice,coinName}:{coinHistory:{change:string,history:{price:string,timestamp:number}[]},currentPrice:number,coinName:string}) => {

  const coinTimestamp = coinHistory?.history?.map(({timestamp}:{timestamp:number}) => (new Date(Number(timestamp+'000')).toLocaleDateString())).reverse()
  const coinPrice = coinHistory?.history?.map(({price}) => price).reverse()

  const data = {
    labels: coinTimestamp,
    datasets:[
        {
            label: 'Price in USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor:'#0071bd',
        }
    ]
  }

  const options = {
      plugins: {
        title: {
          display: true,
          text: `${coinName} market`
        },
        legend: {
        display: false
      }
    }
  }
  
  return (
    <>
    <Row className='chart-header'>
        <Title level={2} className='chart-title'>{coinName} Price Chart</Title>
        <Col>
            <Title level={5} className='price-change'>Change: {coinHistory?.change}%</Title>
            <Title level={5} className='current-price'>Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
    </Row>
    <Line data={data} options={options} datasetIdKey="id"/>
    </>
  )
}

export default LineChart