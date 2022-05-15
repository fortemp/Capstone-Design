//문제 생성 페이지
import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import {SetComment} from '../actions/index';
import {useDispatch} from 'react-redux'
import  './ProblemInsertpage.css';

function ProblemInsertpage (){
    const [tier,settier] = useState("1");
    const [title,settitle] = useState("");
    const [text,settext] = useState("");

const handleSelect = (e)=>{
    settier(e.target.value);
}
const handleTitle = (e)=>{
    settitle(e.target.value);
}
const handleText = (e)=>{
    settext(e.target.value);
}

const test = ()=>{
    Axios.get('/api/auth/insertproblem', {              //일단 이렇게 하면 방정보 가져오긴 함
        params: {
          'title':title,           //방 제목 가져옴
          'tier':tier,
          'text':text,
        }
      })
     if(window.confirm("문제 생성 완료")){
         window.location.replace("/");

     }
     
}

    return(
        <div className='problemapp'>
            <div className='problemsession'>
                <div className='problemtitle-tier'>
                    <h1>문제 만들기</h1>
                <select className='selecttier' onChange={handleSelect} value={tier}>
                    <option value={1} key={1}>1</option>
                    <option value={2} key={2}>2</option>
                    <option value={3} key={3}>3</option>
                </select>
                <input className='problemtitle' onChange={handleTitle} />   
                </div>
                <CKEditor  //CKEditor 내용작성
         editor={ClassicEditor}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log(data);
          settext(data);    
        }}
          />
            </div>
            <button onClick={test}>생성하기</button>
        </div>
    )
}export default ProblemInsertpage