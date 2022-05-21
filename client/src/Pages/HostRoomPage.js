import React,{ useState } from 'react'
import { createRoom } from '../api/room'
import {Formik} from "formik";
import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Typography } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import * as Yup from 'yup';
import { useSelector } from 'react-redux'

function HostRoomPage() {

    const user_id = useSelector(state=>state.authReducer.authData.user._id);

    return (
      <div style={{height:'80vh'}}>

      
        <Formik
            initialValues={{
                title: '',
                password:'',
                language:"c",
                maxpeople:2,
                rounds:1,
            }}
            validationSchema={Yup.object().shape({
                title: Yup.string()
                    .required('방제목을 입력해주세요')
                    .max(19,'방제목은 최대 19자입니다.'),
                maxpeople: Yup.number()
                    .required('방 인원을 입력해주세요'),
                password: Yup.string()
                    .max(5,'비밀번호는 5글자이하입니다.')
            })}
            onSubmit={(values, {setSubmitting}) => {

              setTimeout(async () => {
                let data = {
                    title: values.title,
                    password: values.password,
                    maxpeople: values.maxpeople,
                    language: values.language,
                    rounds: values.rounds,
                    user_id: user_id,
                }
                await createRoom(data)
                .then(res=>{
                  if(res.data.success){
                    window.location.replace('/');
                  }
                })
                setSubmitting(false);
            }, 500)
            }}
            >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            })=>(
            // 여기부터 form html작성
            <div style={{position:'absolute',top:'50%' ,left:'50%' ,transform: 'translate(-50%,-50%)',width:'30%',minWidth:'350px'}}>

              <Paper elevation={7} style={{justifyContent: 'center', minHeight: '25vh' ,padding:'40px'}}>

              <Typography style={{textAlign:'center'}} component="h1" variant="h5">
                HOST GAME
              </Typography>
              <br/>
              <FormControl style={{width:'100%'}} onSubmit={handleSubmit} component="fieldset">
                <TextField
                  error={errors.title && touched.title}
                  required
                  name="title"
                  id="outlined-basic"
                  type="title"
                  label="방제목 입력"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  inputProps={{ maxLength: 19 }}
                  helperText={errors.title && touched.title ? errors.title : ""}
                  autoFocus={true}
                  />
                  <br/>
                  <TextField
                  error={errors.password && touched.password}
                  name="password"
                  id="outlined-basic"
                  type="password"
                  label="패스워드 입력(optional)"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  inputProps={{ maxLength: 5 }}
                  helperText={errors.password && touched.password ? errors.password : ""}
                  />
                  <br/>
                  <label style={{fontSize:'13px'}}>인원선택</label>
                  <Select
                    label="방 인원"
                    name="maxpeople"
                    id="outlined-basic"
                    type="select"
                    onChange={handleChange}
                    value={values.maxpeople}
                  >
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem> 
                  </Select>
                  <br/>

              </FormControl>

              <FormControl style={{width:'100%'}} onSubmit={handleSubmit} component="fieldset">

              <label style={{fontSize:'13px'}}>언어선택</label>
                  <Select
                    label="언어"
                    name="language"
                    id="outlined-basic"
                    type="select"
                    onChange={handleChange}
                    value={values.language}
                  >
                    <MenuItem value={"c"}>C</MenuItem>
                    <MenuItem value={"javascript"}>js</MenuItem>
                    <MenuItem value={"python"}>Python</MenuItem>
                    <MenuItem value={"cpp"}>C++</MenuItem>
                    <MenuItem value={"java"}>JAVA</MenuItem>
                  </Select>
                  <br/>



                </FormControl>
                <FormControl style={{width:'100%'}} onSubmit={handleSubmit} component="fieldset">

                <label style={{fontSize:'13px'}}>라운드수</label>
                  <Select
                    label="라운드"
                    name="rounds"
                    id="outlined-basic"
                    type="select"
                    onChange={handleChange}
                    value={values.rounds}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                  <br/>

                  <Button onClick={handleSubmit} variant="outlined" type="submit" disabled={isSubmitting}>
                    방만들기
                  </Button>

                </FormControl>

              </Paper>
            </div>
            )}
        </Formik>
      </div>
    )
}

export default HostRoomPage