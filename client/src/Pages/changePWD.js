import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Typography } from '@material-ui/core';
import * as Yup from 'yup';
import Axios from 'axios';

function ChangePWD() {

  return (
    <div style={{ height: '80vh' }}>


      <Formik
        initialValues={{
          password: '',
          change_password: '',
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string()
            .required('현재 비밀번호를 입력해주세요')
            .max(300, '최대 300자입니다.'),
          change_password: Yup.string()
            .required('변경할 비밀번호를 입력해주세요')
            .max(300, '최대 300자입니다.'),
        })}
        onSubmit={(values, { setSubmitting }) => {

          setTimeout(async () => {
            alert(sessionStorage.getItem('user_pwd'))
            alert(sessionStorage.getItem('user_id'))
            Axios.get('/api/auth/Changepwd', {
              params: {
                'password': values.change_password,
                'ID': sessionStorage.getItem('user_id')
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
        }) => (
          // 여기부터 form html작성
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '30%', minWidth: '350px' }}>

            <Paper elevation={7} style={{ justifyContent: 'center', minHeight: '25vh', padding: '40px' }}>

              <Typography style={{ textAlign: 'center' }} component="h1" variant="h5">
                CHANGE PASSWORD
              </Typography>
              <br />
              <FormControl style={{ width: '100%' }} onSubmit={handleSubmit} component="fieldset">
                <TextField
                  error={errors.password && touched.password}
                  required
                  name="password"
                  id="outlined-basic"
                  type="password"
                  label="현재 비밀번호 입력"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  inputProps={{ maxLength: 300 }}
                  helperText={errors.password && touched.password ? errors.password : ""}
                  autoFocus={true}
                />
                <br />
                <TextField
                  error={errors.change_password && touched.change_password}
                  required
                  name="change_password"
                  id="outlined-basic"
                  type="change_password"
                  label="변경할 비밀번호 입력"
                  value={values.change_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  inputProps={{ maxLength: 300 }}
                  helperText={errors.change_password && touched.change_password ? errors.change_password : ""}
                  autoFocus={true}
                />
              </FormControl>


              <FormControl style={{ width: '100%' }} onSubmit={handleSubmit} component="fieldset">

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

} export default ChangePWD