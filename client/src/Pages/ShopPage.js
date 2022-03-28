import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';
import { Container, Typography } from '@material-ui/core';
import { SocketContext, Roomsocket, Publicsocket } from '../api/socket'
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  container: {
    background: "white",
    height: "1200px"
  },
}));



function ShopPage(props) {
  const classes = useStyles();
  const test = {
    height: '340px'
  }
  return (
    <SocketContext.Provider value={{ room: Roomsocket, public: Publicsocket }}>
      <Container fixed maxWidth="lg" className={classes.container}>
        <Grid container spacing={1}>  
          <Grid item xs={12} md={3}>
            <Box style={props.style} bgcolor={"#888888"} color={"#222222"}  >
              <div>
              <div style={test}>
                <img className="phoneImage" alt="ch1" src="img/ch1.png" />
                </div>
                <div><span>8000pt</span>
                <input className="BuyBtn"type="button" value="구매하기"/></div>
                </div>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box style={props.style} bgcolor={"#888888"} color={"#222222"}  >
              <div style={test}><img className="phoneImage" alt="ch1" src="img/ch1.png" />
              <input className="BuyBtn"type="button" value="구매하기"/></div>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box style={props.style} bgcolor={"#888888"} color={"#222222"}  >
              <div style={test}><img className="phoneImage" alt="ch1" src="img/ch1.png" />
              <input className="BuyBtn"type="button" value="구매하기"/></div>
            </Box>
          </Grid><Grid item xs={12} md={3}>
            <Box style={props.style} bgcolor={"#888888"} color={"#222222"}  >
              <div style={test}><img className="phoneImage" alt="ch1" src="img/ch1.png" />
              <input className="BuyBtn"type="button" value="구매하기"/></div>
            </Box>
          </Grid><Grid item xs={12} md={3}>
            <Box style={props.style} bgcolor={"#888888"} color={"#222222"}  >
              <div style={test}><img className="phoneImage" alt="ch1" src="img/ch1.png" />
              <input className="BuyBtn"type="button" value="구매하기"/></div>
            </Box>
          </Grid><Grid item xs={12} md={3}>
            <Box style={props.style} bgcolor={"#888888"} color={"#222222"}  >
              <div style={test}><img className="phoneImage" alt="ch1" src="img/ch1.png" />
              <input className="BuyBtn"type="button" value="구매하기"/></div>
            </Box>
          </Grid><Grid item xs={12} md={3}>
            <Box style={props.style} bgcolor={"#888888"} color={"#222222"}  >
              <div style={test}><img className="phoneImage" alt="ch1" src="img/ch1.png" />
              <input className="BuyBtn"type="button" value="구매하기"/></div>
            </Box>
          </Grid><Grid item xs={12} md={3}>
            <Box style={props.style} bgcolor={"#888888"} color={"#222222"}  >
              <div style={test}><img className="phoneImage" alt="ch1" src="img/ch1.png" />
              <input className="BuyBtn"type="button" value="구매하기"/></div>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box style={props.style} bgcolor={"#888888"} color={"#222222"}  >
              <div style={test}><img className="phoneImage" alt="ch1" src="img/ch1.png" />
              <input className="BuyBtn"type="button" value="구매하기"/></div>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box style={props.style} bgcolor={"#888888"} color={"#222222"}  >
              <div style={test}><img className="phoneImage" alt="ch1" src="img/ch1.png" />
              <input className="BuyBtn"type="button" value="구매하기"/></div>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box style={props.style} bgcolor={"#888888"} color={"#222222"}  >
              <div style={test}><img className="phoneImage" alt="ch1" src="img/ch1.png" />
              <input className="BuyBtn"type="button" value="구매하기"/></div>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box style={props.style} bgcolor={"#888888"} color={"#222222"}  >
              <div style={test}><img className="phoneImage" alt="ch1" src="img/ch1.png" />
              <input className="BuyBtn"type="button" value="구매하기"/></div>
            </Box>
          </Grid>
          </Grid>
          
      </Container>
    </SocketContext.Provider>
  )
}

export default ShopPage
/* <Container fixed maxWidth="xs" className={classes.container}>
        <Typography variant="h6" color="secondary">
          Fixed
        </Typography>
      </Container>*/