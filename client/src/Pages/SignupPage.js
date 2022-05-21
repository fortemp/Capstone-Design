import React,{ useState} from 'react'
import {useDispatch} from 'react-redux'
import {Formik} from "formik";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Typography } from '@material-ui/core';
import * as Yup from "yup"
import moment from "moment"
import {registerUser} from '../actions/index';
import { dupcheck } from '../api/auth';

function SignupPage(props) {

  const dispatch = useDispatch();
  const [dup, setDup] = useState(false);

  
    return (
      <div style={{height:'80vh'}}>
        <Formik
            initialValues={{
                id: '',
                name: '',
                email:'',
                password: '',
                passwordConfirm: ''
            }}
            validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .required('이름을 입력해주세요')
                        .min(2, '2글자 이상이여야 합니다.')
                        .max(10, '10글자 이하로 해주세요'),
                    id: Yup.string()
                        .required('아이디를 입력해주세요')
                        .min(5, '5글자 이상이여야 합니다.')
                        .max(15, '15글자 이하로 해주세요')
                        .test("Unique","중복입니다",function seedup(){
                          return !dup;
                        }),
                    email: Yup.string()
                        .email('이메일 형식으로 작성해주세요'),
                    password: Yup.string()
                        .required('비밀번호를 입력해주세요')
                        .min(4, '적어도 4글자 이상으로 해주세요'),
                    passwordConfirm: Yup.string()
                        .oneOf([
                            Yup.ref('password'), null
                        ], '비밀번호 확인이 일치하지 않습니다.')
                        .required('비밀번호확인을 입력해주세요')
                })}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    let data = {
                        id: values.id,
                        name: values.name,
                        email: values.email,
                        password: values.password,
                        image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
                    }
                    dispatch(registerUser(data))
                    .then(res=>{
                      if(res.payload.success){
                        alert('회원가입을 축하합니다!')
                        window.location.replace('/')
                      }else{
                        alert('오류가 발생했습니다.')
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

              <Paper elevation={7} style={{justifyContent: 'center', minHeight: '30vh' ,padding: '50px'}}>

              <Typography style={{textAlign:'center'}} component="h1" variant="h5">
                회원가입
              </Typography>
              <br/>
              <FormControl style={{width:'100%'}} onSubmit={handleSubmit} component="fieldset">
                <TextField
                  required
                  error={errors.name && touched.name}
                  name="name"
                  type="name"
                  id="outlined-basic" 
                  label="이름 입력"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  helperText={errors.name && touched.name ? errors.name : ""}
                  autoComplete="off"
                  autoFocus={true}
                  />
                  <br/>
                  <TextField
                  error={errors.id && touched.id}
                  required
                  name="id"
                  id="outlined-basic"
                  type="id"
                  label="아이디 입력"
                  value={values.id}
                  onChange={e=>{
                    handleChange(e);
                    let data = {
                      id:e.target.value
                    };
                    dupcheck(data)
                    .then(res=>{
                      if(res.data.success){
                        if(res.data.message==="dup"){
                          setDup(true);
                        }else{
                          setDup(false);
                        }
                      }
                    })
                  }}
                  onBlur={handleBlur}
                  variant="outlined"
                  helperText={errors.id && touched.id ? errors.id : ""}
                  autoComplete="off"
                  />
                  <br/>
                <TextField
                  error={errors.email && touched.email}
                  required
                  name="email"
                  id="outlined-basic"
                  type="email"
                  label="이메일 입력(선택)"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  helperText={errors.email && touched.email ? errors.email : ""}
                  autoComplete="off"
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
                  autoComplete="off"
                  />
                  <br/>
                <TextField
                  required
                  error={errors.passwordConfirm && touched.passwordConfirm}
                  name="passwordConfirm"
                  type="password"
                  id="outlined-basic" 
                  label="패스워드확인 입력"
                  value={values.passwordConfirm}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  helperText={errors.passwordConfirm && touched.passwordConfirm ? errors.passwordConfirm : ""}
                  autoComplete="off"
                  />
                  <br/>

                  <Button onClick={handleSubmit} variant="outlined" type="submit" disabled={isSubmitting}>
                    회원가입하기
                  </Button>

              </FormControl>
              </Paper>
            </div>
            )}
        </Formik>
        </div>
    )
}

export default SignupPage