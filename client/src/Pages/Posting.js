import { useEffect, useState} from 'react'
import{Link} from "react-router-dom";
import './Posting.css'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import parse from 'html-react-parser'
import Axios from 'axios'
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import { SocketContext, Roomsocket, Publicsocket } from '../api/socket'
import { makeStyles } from "@material-ui/core/styles";
//참고 https://velog.io/@sky/React-node-js%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EA%B2%8C%EC%8B%9C%ED%8C%90


const useStyles = makeStyles((theme) => ({   //grid 속성
  container: {
    background: "white",
    height: "800px"
  },
}));


function Posting() { //임시로 null\

    const [movieContent, setMovieContent] = useState({
        title: '',
        content: ''
      })
    
      const [viewContent , setViewContent] = useState([]);
    
      const submitReview = ()=>{ // 입력포트값으로 정보 전달
        Axios.post('http://localhost:8000/api/insert', {
          title: movieContent.title,
          content: movieContent.content
        }).then(()=>{
          alert('등록 완료!');
          <Link to = '/community'></Link>
        })
      };
    
      const getValue = e => { // 입력물 확인
        const { name, value } = e.target;
        setMovieContent({
          ...movieContent,
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
        <div className='movie-container'>
          {viewContent.map(element =>
            <div className="title">
              <h2>{element.title}</h2>
              <div className="cont">
                {parse('<li>Item 1</li><li>Item 2</li>')}
              </div>
            </div>
          )}
        </div>
        <div className='form-wrapper'>
          <input className="title-input" // 제목
            type='text'
            placeholder='제목'
            onChange={getValue}
            name='title'
          />
          <CKEditor  //CKEditor 내용작성
            editor={ClassicEditor}
            onReady={editor => {
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
              setMovieContent({
                ...movieContent,
                content: data
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
        
        <button className="submit-button" onClick={submitReview}>입력</button>
        <Link to = '/community'><button className="submit-button">뒤로가기</button></Link>        
      </div>
        </Grid>
      </Container>



    </SocketContext.Provider>

        
      );
}

export default Posting