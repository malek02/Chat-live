import React from 'react';
import {Grid} from "semantic-ui-react"
import Messages from './Messages/Messages';
import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel'
import MetaPanel from './MetaPanel/MetaPanel'


const Dashboard=()=> {
  return (
    <Grid columns="equal"  style={{marginTop:0.5}} className='register' >
        <ColorPanel />
        
        <SidePanel />

        
        <Grid.Column style={{marginLeft:520,marginRight:300}}>
        <Messages />
        </Grid.Column>
        <Grid.Column width={2} >
        <MetaPanel />
        </Grid.Column>
    </Grid>
  );
}

export default Dashboard;
