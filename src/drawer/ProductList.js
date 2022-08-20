
import React from 'react';

import Grid from '@mui/material/Grid'
import ImageComponent from './imageComponent';
import Container from '@mui/material/Container';

import NavigationIcon from '@mui/icons-material/Navigation';
import Fab from '@mui/material/Fab';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { AppContext } from '../App';
import { Typography } from '@mui/material';
export default function ProductList(props) {




  return (
    <AppContext.Consumer>
      {({ fetchingProducts, products, selectedSubcategory, availableProducts }) => {
        return <div style={{ position: 'relative' }}>

          <div style={{ display: fetchingProducts ? 'block' : 'none', width: '100%', height: '100vh', backgroundColor: '#fafafa', position: 'absolute', top: 0, bottom: 0, zIndex: 10, opacity: 0.7, color: 'white' }}>  <Box sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress color="inherit" />
          </Box></div>

          <Container sx={{ paddingLeft: 0, marginTop: 2 }}>
            {products.length > 0 && <Typography sx={{ color: '#757575' }}>toplam:{availableProducts} ürün bulundu</Typography>}
            <Grid container justifyContent="center" spacing={1} margin={0} padding={0}>
              {products.length > 0 && products.map((item, i) => {

                return <Grid margin={0} padding={0} item key={i} xs={6} sm={2}  sx={{ display: 'flex', justifyContent: 'center' }}>

                  <ImageComponent selectedSubcategory={selectedSubcategory && selectedSubcategory.subcategory} plcHolder={item.plcHolder} imageUrl={item.imageUrl} title={item.title} marka={item.marka} link={item.link} timestamp={item.timestamp} price={item.priceNew} />

                </Grid>


              })}


            </Grid>

            <Fab variant="extended" sx={{ position: 'fixed', bottom: 55, right: 5, fontSize: 10 }} color="" >
              {products.length - 1}/{availableProducts}
            </Fab>

            <Fab id="nav-top-btn" variant="extended" sx={{ position: 'fixed', bottom: 5, right: 5, display: 'none' }} color="primary" onClick={() => { window.scrollTo({ top: 0 }); }}>
              <NavigationIcon />
            </Fab>
            {products.length > 0 && (products.length-1) === availableProducts && <Typography sx={{ color: '#757575',marginBottom:10 }}>toplam:{availableProducts}ürün görüntilendi</Typography>}
          </Container>
        </div>
      }}
    </AppContext.Consumer>

  );
}


