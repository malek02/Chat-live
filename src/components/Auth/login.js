import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import firebase from '../firebase'
import { Button,Header,Message,Icon,Segment,Grid,  Form } from 'semantic-ui-react'
import{Link} from 'react-router-dom';





const Login=()=>{

  const [errors, setErrors] = useState([])
const [ authentication, setAuthentication]=useState({

  email:'',
  password:'',

  
})

const isValidation = () => {
  let error 
  if ( !email.length || !password.length ) {
    let error =  [{message:"one of your email password  not requeir"}] 
    setErrors( error)
    return false
  } else if (password.length < 6 ) {
    let error =  [{message:" password must be more than 6 caracter" }]
    setErrors(error)
    return false
  }
else{
    return true
  }

}
const handelChange=(e)=>{
  const {value,name}=e.target
setAuthentication({...authentication,[name]:value})
console.log(11,authentication)
}
const handelSubmit=(e)=>{
  e.preventDefault();
  if (isValidation()) {
  const {email,password}=authentication
 firebase.auth().signInWithEmailAndPassword(email,password)
 .then(data=>console.log(4545,data))
 .catch(err=>{console.log(12,err);setErrors([{message:err.message}])})
}
}
const dispalayError=(x)=>{ return x.map((e,i)=><p key={i}>{e.message}</p>)}

const messageErorr=(name)=>{
  
  let result=(errors.some(e=>e.message.toLowerCase().includes(name))?'error':"")
  console.log(6,result)
  return result
  
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
              type="email"  value={email} className={messageErorr("email")} />
               <Form.Input fluid name="password" 
              icon='lock' iconPosition="left" 
              placeholder="Password"
              onChange={e=>handelChange(e)}  
              type="password" 
              value= {password} className={messageErorr("password")} />
               
              <Button color="blue" fluid size="large" type='submit'>Submit</Button>
            </Segment>
          </Form>
          {errors.length>0 ?<Message error >
            <h3>Error</h3>
          {dispalayError(errors)}
          </Message>: ""}
          <Message>Already a user..! <Link to="/register">Register</Link></Message>
        </Grid.Column>
    </Grid>
  );
}

export default Login;
