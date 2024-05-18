"use client"
import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, {Toaster}  from 'react-hot-toast';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const router = useRouter()

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    const {success, message, token, userId} = await axios.post('https://blendnet-backend.onrender.com/auth/signup',formData).then((response)=>response.data)
    if(success){
      localStorage.setItem("accessToken",token)
      localStorage.setItem("userId",userId)
      toast.success(message)
      setTimeout(()=>{
        router.push("/dashboard")
      },1000)
    } else {
      toast.error(message)
    }
  };

  return (
    <Box
      sx={{
        backgroundColor:"white",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Toaster/>
      <Typography variant="h4" sx={{color:"black"}} gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ width: 300 }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" sx={{marginTop:"2rem"}} variant="contained" fullWidth>
            Sign Up
          </Button>
          <Button onClick={()=>router.push("/login")} sx={{marginTop:"2rem",backgroundColor:"red"}} variant="contained" fullWidth>
            Log In
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SignupPage;
