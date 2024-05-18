"use client"
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter()
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BlendNet.ai
        </Typography>
        <Button 
            onClick={()=>router.push("/dashboard")}
            color="inherit"
            sx={{
              backgroundColor: '#e75480',
              borderRadius: 16, // Adjust the border radius as needed
              padding: '10px 20px', // Adjust padding as needed
            }}
        >Dashboard
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
