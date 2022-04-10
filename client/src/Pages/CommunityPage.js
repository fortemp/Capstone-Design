/*
import React, { useEffect } from 'react'
import ChatSection from './LandingPage/Sections/ChatSection'
import BoardSection from './LandingPage/Sections/BoardSection'
import RoomSection from './LandingPage/Sections/RoomsSection'
import RankingSection from './LandingPage/Sections/RankingSection'
import Grid from '@material-ui/core/Grid';
import { SocketContext, Roomsocket, Publicsocket } from '../api/socket'
function CommunityPage() {
    const RankingStyle = { height: '740px' }
    const roomStyle = { height: '200px' }
    const chatStyle = { height: '532px'}
    const gameStyle = { height: '740px' }

  

    return (
        <SocketContext.Provider value={{ room: Roomsocket, public: Publicsocket }}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={3}>
                    <RankingSection style={RankingStyle} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <BoardSection style={gameStyle} />
                </Grid>

                <Grid item xs={12} md={3}>

                    <Grid
                        container
                        spacing={1}
                        direction="column" padding={"0 0 0 0"}>

                        <Grid item>
                            <RoomSection style={roomStyle} />
                        </Grid>

                        <Grid item>
                            <ChatSection style={chatStyle} />
                        </Grid>

                    </Grid>

                </Grid>
            </Grid>



        </SocketContext.Provider>
    )

}
*/

import{Link} from "react-router-dom";
import { useEffect, useState} from 'react'
import Axios from 'axios';
import parse from 'html-react-parser'
import './CommunityPage.css'
import {GetPost} from "../actions/index";
import {useDispatch} from 'react-redux'

function CommunityPage() { //임시로 null\
  
  const [inputData, setInputData] = useState([{
    post_id: '',
    title: '',
    description: '',
    language: '',
    posted_date: '',
    user_id:'',
    created_at:'',
    updated_at:'',
    deleted_at:''
  }])

  useEffect(async() => {
    try{
    // 데이터를 받아오는 동안 시간이 소요됨으로 await 로 대기
      const res = await Axios.get(GetPost())
      // 받아온 데이터로 다음 작업을 진행하기 위해 await 로 대기
      // 받아온 데이터를 map 해주어 rowData 별로 _inputData 선언
      const _inputData = await res.data.map((rowData) => ({
        post_id: rowData.post_id,
        title: rowData.title,
        description: rowData.description,
        language: rowData.language,
        user_id: rowData.user_id,
        created_at: rowData.created_at,
        updated_at: rowData.updated_at,
        deleted_at: rowData.deleted_at
            })
      )
      // 선언된 _inputData 를 최초 선언한 inputData 에 concat 으로 추가
      setInputData(inputData.concat(_inputData))
    } catch(e){
      console.error(e.message)
    }
  },[inputData])

  console.log('App :: inputData :: ', inputData)

  return(
    <div>
      <table className="table">
      <thead>
        <tr >
          <th className="thid">번호</th>
          <th className="thtitle">제목</th>
          <th className="th">시간</th>
          <th className="th">작성자</th>
          <th className="th">조회수</th>
        </tr>
      </thead>

      <tbody >
        <tr>
        <td className="tdid"></td>
        <td className="td" ></td>
        <td className="td" ></td>
        <td className="td" ></td>
        <td className="td" ></td>
        </tr>
      </tbody>

      </table>
  

      <Link to='/Posting'> 
        <button className="button"> 글작성 </button>
      </Link>
    </div>
  ); 
}


export default CommunityPage
