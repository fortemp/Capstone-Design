import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import { SocketContext, Roomsocket, Publicsocket } from '../api/socket'
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import "./Shoppage.css"
import Button from '@mui/material/Button';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    background: "white",
    height: "150vh",
    marginBottom: "30px"
  },
}));


function createData(ID, Name, URL, point) {
  var Shoping_Table_Cell = {
    Item_ID: ID,
    Alt_Name: Name,
    ImageURL: URL,
    Point: point,
  }
  return Shoping_Table_Cell;

}

const rows = [
  createData(0, "ch1", "img/ch1.png", 1000),
  createData(1, "ch2", "img/ch2.png", 1000),
  createData(2, "ch3", "img/ch3.png", 1000),
  createData(3, "ch4", "img/ch4.png", 1000),
  createData(4, "ch5", "img/ch5.png", 1000),
  createData(5, "ch6", "img/ch6.png", 1000),
  createData(6, "ch7", "img/ch7.png", 1000),
  createData(7, "ch8", "img/ch8.png", 1000),
  createData(8, "ch9", "img/ch9.png", 1000),
  createData(9, "ch10", "img/ch10.png", 1000),
  createData(10, "ch11", "img/ch11.png", 1000),
  createData(11, "ch12", "img/ch12.png", 1000),
];

function ShopPage(props) {
  var playerpoint = useSelector(state => state.authReducer.authData.user);
  const playername= useSelector(state=>state.authReducer.authData.user);
  const classes = useStyles();

  const [data, setdata] = useState([]);
  const buyitem = (ID) => {
    if (window.confirm(rows[ID].Point + "pt입니다. 구매하시겠습니까?\n현재 보유 pt:  " + playerpoint)) {
      if (playerpoint >= rows[ID].Point) {
        alert("구매완료");
        Axios.get('/api/auth/buyimg', {
          params: { 
            'url': rows[ID].ImageURL,
            'user': playername 
          }
        })
      }
    }
    else {
      alert("구매 실패");
    }
  };

  const changeitem = (ID) => {
    if (window.confirm("변경하시겠습니까?")) {
        Axios.get('/api/auth/changeimg', {
          params: { 
            'url': rows[ID].ImageURL,
            'user': playername 
          }
        })
        alert("변경 완료");
      }
  };




  return (

    <SocketContext.Provider value={{ room: Roomsocket, public: Publicsocket }}>
      <Container fixed maxWidth="md" className={classes.container}>
        <Grid container spacing={3}>
         <div className='shoptop'>
        <Link to='/'> 
          <button className="backbtn"> 뒤로가기 </button>
          </Link>
          </div>
          {rows.map((row) => (
            <Grid item xs={12} md={3}>
              <Box style={props.style} className="shopbox" >
                <div>
                  <div>
                    <img className="phoneImage" alt={row.Alt_Name} src={row.ImageURL} />
                  </div>
                  <div className='buysection'><span className='shopspan'>1000pt</span>
                    <Button className="BuyBtn" style={{ backgroundColor: "#F5F5F5" }} onClick={() => buyitem(row.Item_ID)}>구매하기</Button>
                    </div>
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