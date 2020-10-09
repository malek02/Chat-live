
import React from 'react';
import { Dropdown, Grid, Header, Icon,Image } from 'semantic-ui-react'
import firebase from '../../firebase'
import {useSelector } from 'react-redux'



const UserPanel = () => {

    const user = useSelector((state) => state.auThentication.Authenticated);
    console.log(66666,user.displayName)
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
        .then(()=>console.log("Sign out succuses"))
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
    <Dropdown text={<span><Image src={user.photoURL} spaced='right' avatar /> {user.displayName}</span>} options={drowpDownOption()} />
    
      
    
</Header>
            </Grid.Column>
        </Grid>
    );
}

export default UserPanel;