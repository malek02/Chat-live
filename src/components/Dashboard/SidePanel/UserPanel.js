
import React from 'react';
import { Dropdown, Grid, Header, Icon,Image } from 'semantic-ui-react'
import firebase from '../../firebase'
import {useSelector,useDispatch } from 'react-redux';
import {Redirect} from "react-router-dom"
import {Logout} from '../../actions/action-authencation'
import {withRouter} from 'react-router-dom'

const UserPanel = ({history}) => {

    const user = useSelector((state) => state.auThentication.Authenticated);
    
    const dispatch=useDispatch();
    const drowpDownOption=()=>[
        {
            key:"user",
            text:<span>Signed in as<strong>User</strong></span>,
            disabled:true
        },
        {
            key:'avatar',
            text:"Change Avatar"
            
        },
        {
            key:"signout",
            text:<span onClick={e=>SingOut(e)}>Sign Out</span>
            
        }
    ]
     function SingOut(){
        firebase.auth().signOut()
        .then(()=>{dispatch(Logout(history));console.log(45454545454,"hello logout")} )

    }
    return (
        <Grid style={{ background: '#4c3c4c' }} >
            <Grid.Column >
                <Grid.Row style={{ padding: "1.2em", margin: 0 }}>

                    <Header inverted floated="left" as="h2">
                        <Icon name="address card" />
                        <Header.Content>LiveChat</Header.Content>
                    </Header>
                </Grid.Row>
<Header style={{padding:'0.25em'}} as='h4' inverted >
    <Dropdown text={user ?<span><Image src={user.photoURL} spaced='right' avatar /> {user.displayName}</span> : ''} options={drowpDownOption()} />
    
      
    
</Header>
            </Grid.Column>
        </Grid>
    );
}

export default withRouter(UserPanel);