import React from 'react';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import {
  Typography,
  Container,
  Paper,
  Grid,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Box,
  Link,
} from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    color: '#333',
  },
  palette: {
    primary: {
      main: '#333',
    },
    text: {
      primary: '#333',
    },
  },
});

const AboutUsPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" style={{ marginTop: '100px' }}>
        <Paper style={{ padding: '20px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <Typography variant="h4" gutterBottom align="center">
            About Oaxaca Restaurant
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" align="justify">
                Welcome to Oaxaca, a taste of Mexico right in the heart of Fresno! Our restaurant is named after
                the beautiful state of Oaxaca, known for its rich culinary traditions and vibrant flavors. At Oaxaca
                Restaurant, we strive to bring authentic Mexican cuisine to your table, crafted with love and
                dedication.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="justify">
                Our menu features a wide range of classic Mexican dishes, from savory tacos and enchiladas to flavorful
                tamales and refreshing aguas frescas. Each dish is carefully prepared using fresh, locally sourced
                ingredients and traditional recipes passed down through generations.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="justify">
                At Oaxaca, we believe in creating a welcoming atmosphere where friends and family can gather to enjoy
                delicious food and good company. Whether you're craving a quick bite for lunch or planning a special
                dinner outing, we're here to make your dining experience memorable.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="justify">
                Come join us at Oaxaca Restaurant and embark on a culinary journey through the vibrant flavors of
                Mexico. We look forward to serving you soon!
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: '20px' }}>
              <Box bgcolor="#f0f0f0" p={2} textAlign="center">
                <Typography variant="body1">
                  Follow us on social media!
                </Typography>
                <Link href="https://www.instagram.com/oaxacarestaurant" target="_blank" rel="noopener" style={{ marginRight: '20px', color: '#333' }}>
                <InstagramIcon style={{ fontSize: 20, marginRight: 5 }} />
                  Instagram
                </Link>
                <Link href="https://twitter.com/oaxacarestaurant" target="_blank" rel="noopener" style={{ color: '#333' }}>
                    <XIcon style={{ fontSize: 20, marginRight: 5 }} />
                  Twitter
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default AboutUsPage;
