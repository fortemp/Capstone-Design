import { useEffect, useState} from 'react'
import{Link} from "react-router-dom";
import {useDispatch} from 'react-redux'
import './Posting.css'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import parse from 'html-react-parser'
import Axios from 'axios'
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import { SocketContext, Roomsocket, Publicsocket } from '../api/socket'
import { makeStyles } from "@material-ui/core/styles";
import {UserPosting} from '../actions/index';


const useStyles = makeStyles((theme) => ({   //grid 속성
  container: {
    background: "white",
    height: "800px"
  },
}));

function Posting() { //임시로 null\

  const dispatch = useDispatch();

  const [values, setContent] = useState({
    title: '' ,
    description: ''
  })
    
      const getValue = e => { // 입력물 확인
        const { name, value } = e.target;
        setContent({
          ...values,
          [name]: value
        })
      };
    
      const classes = useStyles();
      return (

        <SocketContext.Provider value={{ room: Roomsocket, public: Publicsocket }}>
         <Container fixed maxWidth="md" className={classes.container}>
        <Grid container spacing={3}>
        <div className="App">
        <h1>게시글작성</h1>

        <div className='form-wrapper'>
          <input className="title-input" // 제목
            type='text'
            placeholder='제목'
            onChange={getValue}
            name='title'
          />
          <CKEditor  //CKEditor 내용작성
          className='editor'
            editor={ClassicEditor}
            onReady={editor => {
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
              setContent({
                ...values,
                description: data
              })
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />
        </div>
        
        <button className="submit-button" onClick={() =>{ // 입력!
                          setTimeout(() => {
                            let data = {
                              title: values.title,
                              description: values.description,
                            }
                            dispatch(UserPosting(data))
                            .then(res=>{
                              if(res.payload.success){
                                alert('작성완료')
                              }else{
                                alert('오류가 발생했습니다.')
                              }
                            })
                        }, 500)
        }
        }>입력</button>
        <Link to = '/community'><button className="submit-button">뒤로가기</button></Link>        
      </div>
        </Grid>
      </Container>

    </SocketContext.Provider>
        
      );
}

export default Posting