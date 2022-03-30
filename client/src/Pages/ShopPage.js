import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';
import { Container, Typography } from '@material-ui/core';
import { SocketContext, Roomsocket, Publicsocket } from '../api/socket'
import { makeStyles } from "@material-ui/core/styles";
import "./Shoppage.css"

const useStyles = makeStyles((theme) => ({
  container: {
    background: "white",
    height: "1200px"
  },
}));


function createData(            
    Item_ID: number,
    Alt_Name: string,
    ImageURL:string
  ) {
    return { Item_ID,  Alt_Name, ImageURL };
  } 

const rows = [                      
  createData(1,"ch1","img/ch1.png"),
  createData(2,"ch2","img/ch2.png"),
  createData(3,"ch3","img/ch3.png"),
  createData(4,"ch4","img/ch4.png"),
  createData(5,"ch5","img/ch5.png"),
  createData(6,"ch6","img/ch6.png"),
  createData(7,"ch7","img/ch7.png"),  
  createData(8,"ch8","img/ch8.png"),
  createData(9,"ch9","img/ch9.png"),
  createData(10,"ch10","img/ch10.png"),
  createData(11,"ch11","img/ch11.png"),
  createData(12,"ch12","img/ch12.png"),
  ];

function ShopPage(props) {
  const classes = useStyles();

  return (
    <SocketContext.Provider value={{ room: Roomsocket, public: Publicsocket }}>
      <Container fixed maxWidth="md" className={classes.container}>
        <Grid container spacing={3}>
        {rows.map((row) => (
          <Grid item xs={12} md={3}>
            <Box style={props.style} className="shopbox" >
              <div>
                <div>
                  <img className="phoneImage" alt={row.Alt_Name} src={row.ImageURL}/>
                </div>
                <div className='buysection'><span className='shopspan'>8000pt</span>
                  <input className="BuyBtn" type="button" value="구매하기" /></div>
              </div>
            </Box>
          </Grid>
        ))}
        </Grid>
      </Container>
    </SocketContext.Provider>
  )
}

export default ShopPage