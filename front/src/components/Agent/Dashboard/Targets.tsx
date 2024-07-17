import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { Card, MenuItem, Select, Typography } from '@mui/material'
import moment from 'moment'
import { MONTH_HEBREW_1 } from '../../../helpers/arrayOfMonths'
import { themeColors } from '../../../styles/mui'
import hooks from '../../../hooks'

interface OptionType {
  value: string
  label: string
}

const Targets = () => {
  const [year, setYear] = useState(moment().year().toString())
  const dates: OptionType[] = [
    {
      value: (moment().year() - 1).toString(),
      label: (moment().year() - 1).toString(),
    },
    { value: moment().year().toString(), label: moment().year().toString() },
    {
      value: (moment().year() + 1).toString(),
      label: (moment().year() + 1).toString(),
    },
  ]
  const { data } = hooks.agent.useDataAgentTargets(year)
  const sales: IMonthAgenthSale[] = MONTH_HEBREW_1.map((item) => {
    const matchingData = data?.['hydra:member']?.find(
      (res) => item.name === res.month
    )
    return {
      y: matchingData ? matchingData.currentValue ?? 0 : 0,
      x: matchingData ? matchingData.month : '',
      goals: [
        {
          name: 'יעד מכירות',
          value: matchingData ? matchingData.targetValue ?? 0 : 0,
          strokeColor: themeColors.primary,
        },
      ],
    }
  })
  const seriesDesktop = [
    {
      name: 'מכירות',
      data: sales,
    },
  ]
  const optionsMob = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    colors: ['#FFAD0D'],
    dataLabels: {
      formatter: function (val: any, opt: any) {
        const goals =
          opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex].goals

        if (goals && goals.length) {
          return `${val} / ${goals[0].value}`
        }
        return val
      },
      enabled: false,
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['מכירות', 'יעד'],
      markers: {
        fillColors: ['#FFAD0D', '#6F3FF5'],
      },
      fill: {
        colors: ['#FFAD0D', '#6F3FF5'],
      },
    },
  }
  const optionsDesktop = {
    chart: {
      height: 350,
      width: 600,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        columnWidth: '60%',
      },
    },
    colors: ['#FFAD0D'],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['מכירות', 'יעד'],
      markers: {
        fillColors: ['#FFAD0D', '#6F3FF5'],
      },
    },
    fill: {
      colors: ['#FFAD0D', '#6F3FF5'],
    },
  }
  return (
    <Card sx={{ margin: '50px 0', padding: '0 50px' }}>
      <Typography variant="h6">עמידה ביעדים</Typography>

      <Select
        value={year}
        sx={{ height: '40px', minWidth: '150px' }}
        onChange={(e) => setYear(e.target.value)}
      >
        {dates?.map((item, index) => (
          <MenuItem value={item.value} key={index}>
            {item.value}
          </MenuItem>
        ))}
      </Select>
      {window.innerWidth > 1050 ? (
        <>
          <ReactApexChart
            //  @ts-ignore
            options={optionsDesktop}
            series={seriesDesktop}
            type="bar"
            height={350}
          />
        </>
      ) : (
        <>
          <ReactApexChart
            // @ts-ignore
            options={optionsMob}
            series={seriesDesktop}
            type="bar"
            height={550}
            styles
          />
        </>
      )}
    </Card>
  )
}

export default Targets
