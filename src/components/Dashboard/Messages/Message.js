import React from 'react';
import {Comment,Image} from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux'


const CallMessage=({messages,user})=>{
    
   
    const isOwne=()=>{
       
        return messages.User.id==user.uid?"selef_message":""

    }
    return(
        
    <Comment>
        <Comment.Avatar src={messages.User.avatar} />
        <Comment.Content className={isOwne()}>
<Comment.Author as="a"> {messages.User.name}</Comment.Author>
<Comment.Metadata>{messages.timestamp}</Comment.Metadata>
    <Comment.Text  >{messages.content}</Comment.Text>
    {messages.image? <Image src={messages.image} className='message__image'/> : ""}
        </Comment.Content>
    </Comment>)
}
export default CallMessage;