'use client';

import Image from 'next/image';
import getStripe from './utils/get-stripe';
import { SignedIn, SignedOut, useClerk, useUser } from '@clerk/nextjs';
import Head from 'next/head';
import { AppBar, Button, Container, Toolbar, Typography, Box, Grid, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();

  const theme = createTheme({
    typography: {
      fontFamily: `'Roboto', sans-serif`,
      h2: { fontSize: '2.5rem', fontWeight: '700' },
      h5: { fontSize: '1.5rem', fontWeight: '400' },
      h6: { fontSize: '1.25rem', fontWeight: '500' },
    },
    palette: {
      primary: {
        main: '#0d47a1', // Dark blue
      },
      secondary: {
        main: '#212121', // Dark black
      },
    },
  });

  const handleButtonClick = () => {
    router.push('/generate');
  };

  const handleSubmit = async () => {
    try {
      const checkoutSession = await fetch('/api/checkout_session', {
        method: 'POST',
      });

      const checkoutSessionJson = await checkoutSession.json();

      if (checkoutSessionJson.error) {
        console.error(checkoutSessionJson.error.message);
        return;
      }

      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if (error) {
        console.warn(error.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit2 = async () => {
    try {
      const checkoutSession = await fetch('/api/checkout_session2', {
        method: 'POST',
      });

      const checkoutSessionJson = await checkoutSession.json();

      if (checkoutSessionJson.error) {
        console.error(checkoutSessionJson.error.message);
        return;
      }

      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if (error) {
        console.warn(error.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="100%" sx={{ bgcolor: 'linear-gradient(135deg, #0d47a1 30%, #212121 90%)', minHeight: '100vh', py: 4, textAlign: 'center' }}>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
          <title>AI Flashcard Maker</title>
          <meta name="description" content="Create flashcards from your text" />
        </Head>

        <AppBar position="static" sx={{ bgcolor: theme.palette.primary.main }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff' }}>
              Made By: Joey Vos
            </Typography>
            <SignedOut>
              <Button color="inherit" href="/sign-in">Login</Button>
              <Button color="inherit" href="/sign-up">Sign Up</Button>
            </SignedOut>
            <SignedIn>
              <Button color="inherit" onClick={() => signOut()}>Sign Out</Button>
            </SignedIn>
          </Toolbar>
        </AppBar>

        <Box sx={{ my: 4 }}>
          <Typography variant="h2" gutterBottom sx={{ color: 'black' }}>
            Welcome to the AI Flashcard Maker
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
            The easiest way to make flashcards from scratch. 
          </Typography>
          <Button variant="contained" sx={{ bgcolor: '#0d47a1', color: '#fff', mt: 2, '&:hover': { bgcolor: '#1e88e5' } }} onClick={handleButtonClick}>
            Get Started
          </Button>
        </Box>

        <Divider sx={{ my: 3, bgcolor: '#64b5f6' }} />

        <Box sx={{ my: 3 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#fff' }}>
            Features
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Box sx={{ bgcolor: '#212121', p: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#64b5f6' }}>
                  Easy Text Input
                </Typography>
                <Typography sx={{ color: '#cfd8dc' }}>
                  Simply input your text and let our software do the rest. Creating flashcards has never been easier.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={10} md={4}>
              <Box sx={{ bgcolor: '#212121', p: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#64b5f6' }}>
                  Smart Flashcards
                </Typography>
                <Typography sx={{ color: '#cfd8dc' }}>
                  Our AI intelligently breaks down your texts into flashcards, perfect for studying.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ bgcolor: '#212121', p: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#64b5f6' }}>
                  Accessible Anywhere
                </Typography>
                <Typography sx={{ color: '#cfd8dc' }}>
                  Access your flashcards from any device at any time. Laptop, PC, Tablet, or Phone.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 5, bgcolor: '#64b5f6' }} />

        <Box sx={{ my: 2, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#fff' }}>
            Pricing
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  border: '1px solid',
                  borderColor: '#64b5f6',
                  borderRadius: 2,
                  bgcolor: '#0d47a1',
                  boxShadow: 3,
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ color: '#fff' }}>
                  Basic
                </Typography>
                <Typography variant="h5" gutterBottom sx={{ color: '#cfd8dc' }}>
                  $5 / Month
                </Typography>
                <Typography sx={{ color: '#cfd8dc' }}>
                  Access to basic flashcard features and limited storage.
                </Typography>
                <Button variant="contained" sx={{ bgcolor: '#64b5f6', mt: 2, color: '#fff' }} onClick={handleSubmit2}>
                  Choose Basic
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  border: '1px solid',
                  borderColor: '#64b5f6',
                  borderRadius: 2,
                  bgcolor: '#0d47a1',
                  boxShadow: 3,
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ color: '#fff' }}>
                  Pro
                </Typography>
                <Typography variant="h5" gutterBottom sx={{ color: '#cfd8dc' }}>
                  $10 / Month
                </Typography>
                <Typography sx={{ color: '#cfd8dc' }}>
                  Unlimited flashcards and storage with priority support.
                </Typography>
                <Button variant="contained" sx={{ bgcolor: '#64b5f6', mt: 2, color: '#fff' }} onClick={handleSubmit}>
                  Choose Pro
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
