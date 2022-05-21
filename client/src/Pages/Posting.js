import { useEffect, useState} from 'react'
import{Link, useLocation } from "react-router-dom";
import {useDispatch} from 'react-redux'
import './Posting.css'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import {UserPosting,PostUpdata} from '../actions/index';


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
    description: '',
    language:'All'
  })
    
      const getValue = e => { // 입력물 확인
        const { name, value } = e.target;
        setContent({
          ...values,
          [name]: value
        })
      };
    
      const classes = useStyles();

      const Options =[
        {key:"All", value:"All"},
        {key:"C", value:"C"},
        {key:"js", value:"js"},
        {key:"Python", value:"Python"},
        {key:"C++", value:"C++"},
        {key:"JAVA", value:"JAVA"}
      ]
      const location = useLocation()
      const updata = location.state

      return (
         <Container fixed maxWidth="md" className={classes.container}>
        <Grid container spacing={3}>
        <div className="App" >
        <h1>게시글작성</h1>

        <div className='form-wrapper'>
          <input className="title-input" // 제목
            type='text'
            placeholder={updata?updata.title.split('V',1):'제목'}
            onChange={getValue}
            name='title'
          />

	<select className='language-input' onChange={getValue} value={values.language} name='language'>
		{Options.map((item, index)=>(
			<option key={item.key} value={item.key}>{item.value}</option>
		))}
    </select>
    
          <CKEditor  //CKEditor 내용작성
          className='editor'
            editor={ClassicEditor}
            data = {updata?updata.description
            :'<p></p>'}
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
        {updata?
                          setTimeout(() => {
                            let data = {
                              title: values.title,
                              description: values.description,
                              language: values.language,
                            }
                            console.log(data)
                            dispatch(PostUpdata(data))
                            .then(res=>{
                              if(res.payload.success){
                                alert('수정완료');
                                window.location.replace('/community');
                              }else{
                                alert('오류가 발생했습니다.')
                              }
                            })
                        }, 500)
                        :setTimeout(() => {
                          let data = {
                            title: values.title,
                            description: values.description,
                            language: values.language
                          }
                          dispatch(UserPosting(data))
                          .then(res=>{
                            if(res.payload.success){
                              alert('작성완료');
                              window.location.replace('/community');
                            }else{
                              alert('오류가 발생했습니다.')
                            }
                          })
                      }, 500)
                      }
        }
        }>입력</button>
        <Link to = '/community'><button className="submit-button">뒤로가기</button></Link>        
      </div>
        </Grid>
      </Container>

      );
}

export default Posting