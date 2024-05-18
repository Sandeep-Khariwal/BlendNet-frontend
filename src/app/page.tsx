import React from 'react';
import { Container, Typography } from '@mui/material';

const Home = () => {
  return (
    <Container className="flex min-h-screen flex-col items-center justify-between p-24">
      <Typography variant="h2" align="center" gutterBottom>
        BlendNet.ai Landing Page
      </Typography>
    </Container>
  );
}

export default Home;
