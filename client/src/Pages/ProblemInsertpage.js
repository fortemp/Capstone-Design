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
    const [langselect,setLangselect] = useState('cpp');
    const [compileButtonString, setCompileButtonString] = useState('컴파일하기')
    const [isCompileDone,setIsCompileDone] = useState(true);
    const [readyToSubmit, setReadyToSubmit] = useState(false);
    const [problem_id,setProblem_id] = useState('');

    const [input1,setinput1] = useState("");
    const [input2,setinput2] = useState("");
    const [input3,setinput3] = useState("");
    const [input4,setinput4] = useState("");

    const [output1,setoutput1] = useState("");
    const [output2,setoutput2] = useState("");
    const [output3,setoutput3] = useState("");
    const [output4,setoutput4] = useState("");

    useEffect(()=>{
    },[isCompileDone])

    const [values,setContent] = useState({
        title: '' ,
        description: '',
        tier:'1'
    });
    const onChangein1=(e)=>{
      setinput1(e.target.value)
    }
    const onChangein2=(e)=>{
      setinput2(e.target.value)
    }
    const onChangein3=(e)=>{
      setinput3(e.target.value)
    }
    const onChangein4=(e)=>{
      setinput4(e.target.value)
    }
    const onChangeout1=(e)=>{
      setoutput1(e.target.value)
    }
    const onChangeout2=(e)=>{
      setoutput2(e.target.value)
    }
    const onChangeout3=(e)=>{
      setoutput3(e.target.value)
    }
    const onChangeout4=(e)=>{
      setoutput4(e.target.value)
    }


    const getValue = e => { // 입력물 확인
            const { name, value } = e.target;
            setContent({
              ...values,
              [name]: value
            })
        };
    const getValueLang = (e)=> { // 입력물 확인
      const language = e.target.value;
      setLangselect(language)
    };
    const onChange=(e)=>{
      setCode(e);
    }
    const goCompile=()=>{
      if(isCompileDone)
      {
        setCompileButtonString('컴파일중...')
        setIsCompileDone(false);
        let data = {
          code:code,
          language:langselect,
          inputs:{
            input1,input2,input3,input4
          },
          outputs:{
            output1,output2,output3,output4,
          }
        }
        compilecode(data).
        then(res=>{
          setCompileButtonString('컴파일하기')
          setIsCompileDone(true);
          if(res.data.correct){
            setProblem_id(res.data.problem_id);
            setReadyToSubmit(true);
            alert('컴파일에 성공했습니다. 제출할수 있습니다.')
          }else{
            alert('컴파일에 실패했습니다. 입출력예제, 코드를 확인해주세요')
          }
        })
      }
      else{alert('현재 컴파일중입니다.');}
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
                  <option value={'c'}>C</option>
                  <option value={'cpp'}>C++</option>
                  <option value={'javascript'}>js</option>
                  <option value={'python'}>python</option>
                  <option value={'java'}>java</option>
              </select>
              <Button variant="outlined" onClick={goCompile} >{compileButtonString}</Button>
            <CodeSection style={{height: "600px",width: "100%"}} language ={langselect} onChange={onChange}/>

            <label>테스트케이스1</label>
            <textarea className="testCase" id="input1" onChange={onChangein1}></textarea> <textarea className="testCase" id="output1" onChange={onChangeout1}></textarea>
            <br/>
            <label>테스트케이스2</label>
            <textarea className="testCase" id="input2" onChange={onChangein2}></textarea> <textarea className="testCase" id="output2" onChange={onChangeout2}></textarea>
            <br/>
            <label>테스트케이스3</label>
            <textarea className="testCase" id="input3" onChange={onChangein3}></textarea> <textarea className="testCase" id="output3" onChange={onChangeout3}></textarea>
            <br/>
            <label>테스트케이스4</label>
            <textarea className="testCase" id="input4" onChange={onChangein4}></textarea> <textarea className="testCase" id="output4" onChange={onChangeout4}></textarea>
            <br/>
            <Button variant="outlined" onClick={() =>{
                setTimeout(() => {
                    let data = {
                      title: values.title,
                      description: values.description,
                      tier: values.tier,
                      problem_id:problem_id
                    }
                    if(readyToSubmit)
                    {
                      dispatch(InsertProblem(data))
                      .then(res=>{
                        if(res.payload.success){
                          alert('작성완료');
                          window.location.replace('/');
                        }else{
                          alert('오류가 발생했습니다.')
                        }
                      })
                    }
                    else{ alert('먼저 컴파일 해주세요.') }
                    
                }, 500)
            }}>생성하기</Button>
            
        </div>
        
    )
}export default ProblemInsertpage