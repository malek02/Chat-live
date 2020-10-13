import React,{useEffect} from 'react'
import {Route, Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux';


 const PrivateRouter=({component:Component,...otherprops})=>{
    
   
   
   
    const user = useSelector((state) => state.auThentication.Authenticated)
      const loding= useSelector(state=>state.auThentication.loding)
      
   
  
   
   
   return(
   
   
<>
<Route {...otherprops} render={() => user && !loding ? (
        <Component {...otherprops}  />) : (<Redirect to='/login'/>)}

    />
    </>
 )
}



    
 
 

 export default PrivateRouter ;