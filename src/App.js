import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Route, Switch,withRouter } from 'react-router-dom';
import './App.css';
import loading from './components/loading';
import Login from './components/Auth/login'
import Register from './components/Auth/enregister'
import firebase from './components/firebase';
import Spinner from './components/spinner'
import { loadUser } from './components/actions/action-authencation';
import Dashboard from './components/Dashboard/Dashboard';
import { Logout} from './components/actions/action-authencation'
const App = (props) => {
  const dispatch = useDispatch();
  const loding = useSelector((state) => state.auThentication.loding);
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log(115,user);
      if(user){
        dispatch(loadUser(user))
        props.history.push("/Dashboard")
      }
      else{
        props.history.push("/login")
        dispatch(Logout())
      }
    })

  }, [])


  return (
    <>
{ loding ? <Spinner /> :
      <Switch>
        <Route exact path='/' component={loading} />
        <Route exact path='/Dashboard' component={Dashboard} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Switch>}
    </>
  );
}

export default withRouter(App);
