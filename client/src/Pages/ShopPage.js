import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import { SocketContext, Roomsocket, Publicsocket } from '../api/socket'
import { makeStyles } from "@material-ui/core/styles";
import {useSelector} from 'react-redux';
import "./Shoppage.css"
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
  container: {
    background: "white",
    height: "1200px"
  },
}));


function createData(ID,Name,URL,point){  
  var Shoping_Table_Cell={ 
    Item_ID:ID,
    Alt_Name: Name,
    ImageURL:URL,
    Point:point,
  }
    return Shoping_Table_Cell ;
  
}

const rows = [                      
  createData(1,"ch1","img/ch1.png",9000),
  createData(2,"ch2","img/ch2.png",9000),
  createData(3,"ch3","img/ch3.png",9000),
  createData(4,"ch4","img/ch4.png",9000),
  createData(5,"ch5","img/ch5.png",9000),
  createData(6,"ch6","img/ch6.png",9000),
  createData(7,"ch7","img/ch7.png",9000),  
  createData(8,"ch8","img/ch8.png",9000),
  createData(9,"ch9","img/ch9.png",9000),
  createData(10,"ch10","img/ch10.png",9000),
  createData(11,"ch11","img/ch11.png",9000),
  createData(12,"ch12","img/ch12.png",9000),
  ];

function ShopPage(props) {
  var playerpoint= useSelector(state=>state.authReducer.authData.user.point);
  const classes = useStyles();
  
  const buyitem=(ID)=>{
    if(window.confirm(rows[ID].Point+"pt입니다. 구매하시겠습니까?\n현재 보유 pt:  "+playerpoint)){
      if(playerpoint>rows[ID].Point){
      alert("구매완료");
      playerpoint-=3000; //데이터베이스에서 빼야할듯?
      }
      else{
        alert("구매 실패");
      }
    }
    console.log(playerpoint);
  };



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
                <div className='buysection'><span className='shopspan'>9000pt</span>
                  <Button className="BuyBtn"  style={{backgroundColor: "#F5F5F5"}} onClick={()=>buyitem(row.Item_ID)}>구매하기</Button></div>
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