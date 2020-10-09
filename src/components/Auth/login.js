import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import firebase from '../firebase'
import { Button,Header,Message,Icon,Segment,Grid,  Form } from 'semantic-ui-react'
import{Link} from 'react-router-dom';





const Login=()=>{


const [ authentication, setAuthentication]=useState({

  email:'',
  password:'',
  
})


const handelChange=(e)=>{
  const {value,name}=e.target
setAuthentication({...authentication,[name]:value})
console.log(11,authentication)
}
const handelSubmit=(e)=>{
  e.preventDefault();
  const {email,password}=authentication
 firebase.auth().signInWithEmailAndPassword(email,password)
 .then(data=>console.log(4545,data))
}


const {email,password}=authentication
  return (
    <Grid textAlign="center" verticalAlign='middle' className="register">
        <Grid.Column style={{maxWidth:'600px'}}>
          <Header as="h2" icon color="black" textAlign='center'>
            <Icon name="gripfire" color="blue"/>
            Register for chatlive
          </Header>
          <Form size="large" onSubmit={e=>handelSubmit(e)}>
            <Segment stacked>
              
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
               
              <Button color="blue" fluid size="large" type='submit'>Submit</Button>
            </Segment>
          </Form>
          <Message>Already a user..! <Link to="/register">Register</Link></Message>
        </Grid.Column>
    </Grid>
  );
}

export default Login;
