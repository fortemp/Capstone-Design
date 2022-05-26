//문제 생성 페이지
import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {useDispatch} from 'react-redux'
import  './ProblemInsertpage.css';
import {InsertProblem} from '../actions/index';
import CodeSection from '../components/codeSection/CodeSection'
import { Button } from '@material-ui/core';
import { compilecode } from '../api/post';
function ProblemInsertpage (){
    const dispatch = useDispatch();
    const [code, setCode] = useState("");
    const [langselect,setLangselect] = useState('c_cpp');
    const [values,setContent] = useState({
        title: '' ,
        description: '',
        tier:'1'
    });
    const getValue = e => { // 입력물 확인
            const { name, value } = e.target;
            setContent({
              ...values,
              [name]: value
            })
        };
    const getValueLang = (e)=> { // 입력물 확인
      const language = e.target.value;
      console.log(language)
      setLangselect(language)
    };
    const onChange=(e)=>{
      setCode(e);
    }
    const goCompile=()=>{
      let data = {
        code:code
      }
      compilecode(data);
    }
    useState(()=>{
    },[langselect])
    return(
        <div className='problemapp'>
          
            <div className='problemsession'>
                <div className='problemtitle-tier'>
                    <h1>문제 만들기</h1>
                <select className='selecttier' onChange={getValue} value={values.tier} name='tier'>
                    <option value={1} key={1}>1</option>
                    <option value={2} key={2}>2</option>
                    <option value={3} key={3}>3</option>
                </select>
                <input className="problemtitle" // 제목
                type='text'
                placeholder={'제목'}
                onChange={getValue}
                name='title'
                 />
                </div>

        <CKEditor  //CKEditor 내용작성
          className='editor'
            editor={ClassicEditor}
            data = {'<p></p>'}
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
            <h1 className='coderowtitle'>정답 코드 작성</h1> 
              <select className='languageSelect' onChange={getValueLang} value={langselect} name='tier'>
                  <option value={'c_cpp'}>C</option>
                  <option value={'c_cpp'}>C++</option>
                  <option value={'javascript'}>js</option>
                  <option value={'python'}>python</option>
                  <option value={'java'}>java</option>
              </select>
              <Button variant="outlined" onClick={goCompile} >컴파일 하기</Button>
            <CodeSection style={{height: "600px",width: "100%"}} language ={langselect} onChange={onChange}/>
            <Button variant="outlined" onClick={() =>{
                setTimeout(() => {
                    let data = {
                      title: values.title,
                      description: values.description,
                      tier: values.tier
                    }
                    console.log(data)
                    dispatch(InsertProblem(data))
                    .then(res=>{
                      if(res.payload.success){
                        alert('작성완료');
                        window.location.replace('/');
                      }else{
                        alert('오류가 발생했습니다.')
                      }
                    })
                }, 500)
            }}>생성하기</Button>
            
        </div>
        
    )
}export default ProblemInsertpage