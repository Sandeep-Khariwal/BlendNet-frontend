"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Grid, Button, Toolbar } from '@mui/material';
import {  StockData, TimeSeries } from '@/interfaces/data.interface';
import toast, {Toaster}  from 'react-hot-toast';
import { useRouter } from 'next/navigation'

const page = () => {
  const [stockDataArray,setStockDataArray] = useState([])
  const router = useRouter()

    useEffect(()=>{
        getAllStocks()
    },[])

    const getAllStocks = async()=>{
        const userId = localStorage.getItem("userId") || ''
        const {success, message,watchlist} = await axios.get('https://blendnet-backend.onrender.com/stock/getStocks', {
          params: { userId }
        }).then((response)=>response.data)
        if(success){
          const { watchList } = watchlist
          setStockDataArray(watchList)
        } else {
          toast.error(message)
        }
        
    }
    const removeWatchList = async(date:string)=>{
    const userId = localStorage.getItem("userId") || ''
    const {success, message,watchlist} = await axios.post('https://blendnet-backend.onrender.com/stock/remove',{userId,date}).then((response)=>response.data)
    if(success){
      const { watchList } = watchlist
      setStockDataArray(watchList)
      toast.success(message)
      router.push("/watchlists")
    } else {
      toast.error(message)
    }
    }
  return (<>
    <Button
      color="inherit"
      onClick={() => router.push("/dashboard")}
      sx={{
        marginLeft: 'auto', // Pushes the button to the right
        backgroundColor: 'red',
        margin:"1rem",
        borderRadius: 16, // Adjust the border radius as needed
        padding: '5px 20px', // Adjust padding as needed
        whiteSpace: "nowrap",
        color: "white",
        '&:hover': {
          backgroundColor: 'red'
        }
      }}>
      Dashboard
    </Button>
   {stockDataArray.map((item, index) => {
        const date = Object.keys(item)[0];
        const data = item[date];
        return (
          <Card key={index}>
            <Toaster />
            <CardContent>
              <Toolbar>
                <Typography variant="h6" component="div">
                  Stock Data for {date}
                </Typography>
                <Button
                  color="inherit"
                  onClick={() => removeWatchList(date)}
                  sx={{
                    marginLeft: 'auto', // Pushes the button to the right
                    backgroundColor: 'red',
                    borderRadius: 16, // Adjust the border radius as needed
                    padding: '5px 20px', // Adjust padding as needed
                    whiteSpace: "nowrap",
                    color: "white",
                    '&:hover': {
                      backgroundColor: 'red'
                    }
                  }}>
                  Remove -
                </Button>
              </Toolbar>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Open: {data["1. open"]}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    High: {data["2. high"]}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Low: {data["3. low"]}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Close: {data["4. close"]}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Volume: {data["5. volume"]}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      })}
    </>)
}

export default page
