import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from './../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined)

  useEffect(() => {
    async function setData(){
      if(!localStorage.getItem('chat-app-user')){
        navigate('/login')
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')))
      }
    }
    setData();
  }, [navigate])

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        async function setData(){
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        }
        setData();
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser, navigate]);

  return (
    <Container>
      {
        currentUser ? (<div className='container'>
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
        {
          currentChat === undefined 
          ? <Welcome currentUser={currentUser} /> 
          : <ChatContainer currentChat={currentChat}/> 
        }
      </div>) : ''
      }
    </Container>
  )
}

const Container = styled.div`  
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.container {
  height: 85vh;
  width: 85vw;
  background-color: #00000076;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: 35% 65%;
  }
}
`;

export default Chat;

