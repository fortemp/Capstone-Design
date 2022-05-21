import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Typography } from '@material-ui/core';
import * as Yup from 'yup';
import  Axios  from 'axios';

function ChangeID() {

    return (
        <div style={{height:'80vh'}}>
  
        
          <Formik
              initialValues={{
                  name: '',              
              }}
              validationSchema={Yup.object().shape({
                name: Yup.string()
                      .required('닉네임을 입력해주세요')
                      .max(20,'닉네임은 최대 20자입니다.'),
              })}
              onSubmit={(values, {setSubmitting}) => {
  
                setTimeout(async () => {
                    Axios.get('/api/auth/Changeid', {
                        params: { 
                          'name': values.name,
                          'user': sessionStorage.getItem('user_id') 
                        }
                      })
                  setSubmitting(false);
                  window.location.replace('/');
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
                  닉네임 변경
                </Typography>
                <br/>
                <FormControl style={{width:'100%'}} onSubmit={handleSubmit} component="fieldset">
                  <TextField
                    error={errors.name && touched.name}
                    required
                    name="name"
                    id="outlined-basic"
                    type="name"
                    label="닉네임 입력"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    inputProps={{ maxLength: 20 }}
                    helperText={errors.name && touched.name ? errors.name : ""}
                    autoFocus={true}
                    />
                    <br/>
                </FormControl>
  
       
                  <FormControl style={{width:'100%'}} onSubmit={handleSubmit} component="fieldset">
  
                    <Button onClick={handleSubmit} variant="outlined" type="submit" disabled={isSubmitting}>
                      닉네임 변경
                    </Button>
  
                  </FormControl>
  
                </Paper>
              </div>
              )}
          </Formik>
        </div>
      )

} export default ChangeID