import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import firebase from '../firebase'
import { Button, Header, Message, Icon, Segment, Grid, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import md5 from 'md5'




const Register = () => {
  const [authentication, setAuthentication] = useState({
    username: "",
    email: '',
    password: '',
    confirmPassword: ""

  })
  const [errors, setErrors] = useState([])
  console.log(7,errors)
  const [useref, setUseref] = useState(firebase.database().ref('malektest'))

  const handelChange = (e) => {
    const { value, name } = e.target
    setAuthentication({ ...authentication, [name]: value })
    console.log(11, authentication)
  }
  const handelSubmit = (e) => {
    if (isValidation()) {
      e.preventDefault();
      const { email, password, username } = authentication
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(data => {
          console.log(555, data.user);
          data.user.updateProfile({
            displayName: username,
            photoURL: `http://gravatar.com/avatar/${md5(data.user.email)}?d=identicon`
          })
            .then(() => {
              userSave(data)
                .then(() => { console.log("user save") })
            }
            )
        })

        .catch(err => console.error(err.message))
    }
  }

const dispalayError=(x)=>{ return x.map((e,i)=><p key={i}>{e.message}</p>)

}
  const isValidation = () => {
    let error 
    if (!username.length || !email.length || !password.length || !confirmPassword.length) {
      let error =  [{message:"one of your username email password confirmPassword not requeir"}] 
      setErrors( error)
      return false
    } else if (password.length < 6 || confirmPassword.length < 6) {
      let error =  [{message:" password must be more than 6 caracter" }]
      setErrors(error)
      return false
    } else if(password !== confirmPassword){
      let error =  [{message:"password and confirmPassword not valid"}] 
      setErrors(error)
      return false
    }else{
      return true
    }

  }



const messageErorr=(name)=>{
  
  let result=(errors.some(e=>e.message.toLowerCase().includes(name))?'error':"")
  console.log(6,result)
  return result
  
}

  const userSave = (x) => {
    return useref.child(x.user.uid).set({
      name: x.user.displayName,
      email: x.user.email,
      avatar: x.user.photoURL
    })
  }

  const { email, password, username, confirmPassword } = authentication
  return (
    <Grid textAlign="center" verticalAlign='middle' className="register">
      <Grid.Column style={{ maxWidth: '600px' }}>
        <Header as="h2" icon color="black" textAlign='center'>
          <Icon name="users" color="green" />
            Register for chatlive
          </Header>
        <Form size="large" onSubmit={e => handelSubmit(e)}>
          <Segment stacked>
            <Form.Input fluid name="username"
              icon='user' iconPosition="left"
              placeholder="Username"
              type="text" value={username} onChange={e => handelChange(e)} className={messageErorr("username")} />
            <Form.Input fluid name="email"
              icon='mail' iconPosition="left"
              onChange={e => handelChange(e)}
              placeholder="email adrees"
              type="email" value={email} className={messageErorr("email")}  />
            <Form.Input fluid name="password"
              icon='lock' iconPosition="left"
              placeholder="Password"
              onChange={e => handelChange(e)}
              type="password"
              value={password} className={messageErorr("password")} />
            <Form.Input fluid name="confirmPassword"
              icon='repeat' iconPosition="left"
              placeholder="confirm Password"
              onChange={e => handelChange(e)}
              type="password" value={confirmPassword} className={messageErorr("confirmpassword")}  />
            <Button color="green" fluid size="large" type='submit'>Submit</Button>
          </Segment>
        </Form>
        {errors.length>0 ?<Message error>
          <h3>Error</h3>
         {dispalayError(errors)}
        </Message>:""}
        <Message>Already a user..! <Link to="/login">Login</Link></Message>
      </Grid.Column>
    </Grid>
  );
}

export default Register;
