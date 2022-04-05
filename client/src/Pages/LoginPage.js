import React,{ useState } from 'react'
import {useDispatch} from 'react-redux'
import { loginUser } from '../actions';
import {Formik} from "formik";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Typography } from '@material-ui/core';
import * as Yup from 'yup';

function LoginPage() {

    const dispatch = useDispatch();

    return (
      <div style={{height:'530px'}}>

      
        <Formik
            initialValues={{  
                id: '',
                password: '',
            }}
            validationSchema={Yup.object().shape({
                id: Yup.string()
                    .required('아이디를 입력해주세요'),
                password: Yup.string()
                    .required('비밀번호를 입력해주세요')
            })}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    let data = {
                        id: values.id,
                        password: values.password,
                    }
                    dispatch(loginUser(data))
                    .then(res=>{
                      if(res.payload.success){
                        window.location.replace('/')
                      }else{
                        alert(res.payload.message.message);
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
                로그인
              </Typography>
              <br/>
              <FormControl style={{width:'100%'}} onSubmit={handleSubmit} component="fieldset">
                <TextField
                  error={errors.id && touched.id}
                  required
                  name="id"
                  id="outlined-basic"
                  type="id"
                  label="아이디 입력"
                  value={values.id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  helperText={errors.id && touched.id ? errors.id : ""}
                  autoFocus={true}
                  />
                  <br/>
                <TextField
                  required
                  error={errors.password && touched.password}
                  name="password"
                  type="password"
                  id="outlined-basic" 
                  label="패스워드 입력"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined" 
                  helperText={errors.password && touched.password ? errors.password : ""}
                  />
                  <br/>

                  <Button onClick={handleSubmit} variant="outlined" type="submit" disabled={isSubmitting}>
                    로그인하기
                  </Button>

              </FormControl>
              </Paper>
            </div>
            )}
        </Formik>
      </div>
    )
}

export default LoginPage