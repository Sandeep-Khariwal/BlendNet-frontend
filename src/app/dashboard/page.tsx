"use client"
import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { StockData, TimeSeries } from '@/interfaces/data.interface';
import StockCard from '@/component/Stock';

const page = () => {
  const router = useRouter()
  const [stockData,setStockData] = useState<TimeSeries>({})
  useEffect(()=>{
    getData()
  },[])

  const getData = async()=>{
    const data = await axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo").then((response)=>response.data)
    const seriesData = data["Time Series (5min)"];
    const limitedSeries = Object.entries(seriesData).slice(0, 20).reduce((obj, [key, value]) => {
      obj[key] = value as StockData;
      return obj;
    }, {} as TimeSeries);
    setStockData(limitedSeries);
  }
  return (
    <Box>
    <Toolbar>
    <Button 
        onClick={()=>router.push("/watchlists")}
        color="inherit"
        sx={{
          backgroundColor: '#e75480',
          borderRadius: 16, // Adjust the border radius as needed
          padding: '10px 20px', // Adjust padding as needed
        }}>
        See WatchList
    </Button>
  </Toolbar>
    {Object.entries(stockData).map(([date, data]) => (
          <StockCard key={date} date={date} data={data} />
    ))}
    </Box>
  )
}

export default page
