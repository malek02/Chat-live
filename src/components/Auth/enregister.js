import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import firebase from '../firebase'
import { Button,Header,Message,Icon,Segment,Grid,  Form } from 'semantic-ui-react'
import{Link} from 'react-router-dom';
import md5 from 'md5'




const Register=()=>{
const [ authentication, setAuthentication]=useState({
  username:"",
  email:'',
  password:'',
  confirmPassword:""
})
const [useref, setUseref]=useState(firebase.database().ref('malektest'))

const handelChange=(e)=>{
  const {value,name}=e.target
setAuthentication({...authentication,[name]:value})
console.log(11,authentication)
}
const handelSubmit=(e)=>{
  e.preventDefault();
  const {email,password,username}=authentication
  firebase.auth().createUserWithEmailAndPassword(email,password)
  .then(data=>{
    console.log(555,data.user);
  data.user.updateProfile({displayName:username,
     photoURL:`http://gravatar.com/avatar/${md5(data.user.email)}?d=identicon`
  })
  .then(()=>{userSave(data)
  .then(()=>{console.log("user save")})}
  )
})

  .catch(err=>console.error(err.message))
}



const userSave=(x)=>{
  return useref.child(x.user.uid).set({
    name:x.user.displayName,
    email:x.user.email,
    avatar:x.user.photoURL
  })
}

const {email,password,username,confirmPassword}=authentication
  return (
    <Grid textAlign="center" verticalAlign='middle' className="register">
        <Grid.Column style={{maxWidth:'600px'}}>
          <Header as="h2" icon color="black" textAlign='center'>
            <Icon name="users" color="green"/>
            Register for chatlive
          </Header>
          <Form size="large" onSubmit={e=>handelSubmit(e)}>
            <Segment stacked>
              <Form.Input fluid name="username" 
              icon='user' iconPosition="left" 
              placeholder="Username" 
              type="text" value={username} onChange={e=>handelChange(e)} />
               <Form.Input fluid name="email" 
              icon='mail' iconPosition="left"
              onChange={e=>handelChange(e)}  
              placeholder="email adrees" 
              type="email"  value={email} />
               <Form.Input fluid name="password" 
              icon='lock' iconPosition="left" 
              placeholder="Password"
              onChange={e=>handelChange(e)}  
              type="password" 
              value= {password} />
               <Form.Input fluid name="confirmPassword" 
              icon='repeat' iconPosition="left" 
              placeholder="confirm Password" 
              onChange={e=>handelChange(e)} 
              type="password" value={confirmPassword} />
              <Button color="green" fluid size="large" type='submit'>Submit</Button>
            </Segment>
          </Form>
          <Message>Already a user..! <Link to="/login">Login</Link></Message>
        </Grid.Column>
    </Grid>
  );
}

export default Register;
