// src/components/StockCard.js

import React from 'react';
import { Card, CardContent, Typography, Grid, Button, Toolbar } from '@mui/material';
import { StockData } from '@/interfaces/data.interface';
import axios from 'axios';
import toast, {Toaster}  from 'react-hot-toast';

interface StockCardProps {
    date: string;
    data: StockData;
  }

const StockCard:React.FC<StockCardProps>  = ({ date, data }) => {

    const AddToWatchList = async(date:string,data:StockData) =>{
    const userId = localStorage.getItem("userId")
    
    // const addData: { [key: string]: StockData } = {};
    // addData[date] = data
    // console.log("data : ",userId,addData);
    
    const {success, message} = await axios.post('https://blendnet-backend.onrender.com/stock/create',{
      userId,
      date,data
    }).then((response)=>response.data)
    if(success){
      toast.success(message)
    } else {
      toast.error(message)
    }
}
  return (
    <Card>
      <Toaster/>
      <CardContent>
      <Toolbar>
      <Typography variant="h6" component="div">
        Stock Data for {date}
      </Typography>
      <Button
        color="inherit"
        onClick={()=>AddToWatchList(date,data)}
        sx={{
          marginLeft: 'auto', // Pushes the button to the right
          backgroundColor: 'green',
          borderRadius: 16, // Adjust the border radius as needed
          padding: '5px 20px', // Adjust padding as needed
          whiteSpace:"nowrap",
          color:"white",
          '&:hover': {
            backgroundColor: 'green'
          }
        }}>
        Watchlist +
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
};

export default StockCard;
