import React from 'react';
import {Comment} from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux'


const CallMessage=({messages})=>{
    
    console.log(11111111,messages)
    
    return(
        
    <Comment>
        <Comment.Avatar src={messages.User.avatar} />
        <Comment.Content >
<Comment.Author as="a"> {messages.User.name}</Comment.Author>
<Comment.Metadata>{messages.timestamp}</Comment.Metadata>
    <Comment.Text>{messages.content}</Comment.Text>
        </Comment.Content>
    </Comment>)
}
export default CallMessage;