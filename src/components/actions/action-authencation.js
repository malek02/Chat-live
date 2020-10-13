


export const loadUser =(user,history)=> dispatch =>{
  

  
    dispatch({
        type:'USER_LOADED',
        payload:user
    })
    
    history.push("/Dashboard")
}


export  const Logout = (history) =>dispatch=>{


    dispatch({
        type: 'LOGOUT_NAVBAR',
       
    })
    history.push("/login")
  }

