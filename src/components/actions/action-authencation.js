


export const loadUser =(user)=> dispatch =>{
  

  
    dispatch({
        type:'USER_LOADED',
        payload:user
    })
    

}


export  const Logout = () =>dispatch=>{


    dispatch({
        type: 'LOGOUT_NAVBAR',
        
    })

  }

