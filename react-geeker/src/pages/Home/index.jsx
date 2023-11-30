import React from 'react'
import * as echarts from 'echarts'
import { useEffect } from 'react'

export default function Home() {

  const chartRef = React.useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);
    const option = {
      xAxis: {
        type: 'category',
        data: ['Vue', 'React', 'Angular']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150],
          type: 'bar'
        }
      ]
    };

    option && myChart.setOption(option);

  }, [])


  return (
    <div>Home
      <div ref={chartRef} style={{ width: '500px', height: '300px' }}></div>
    </div>
  )
}
