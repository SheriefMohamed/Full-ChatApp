import React from "react";
import hi from "../assets/hi.gif";
import styled from "styled-components";
import Logout from "./Logout";

const Welcome = ({ currentUser }) => {
  return (
    <Container>
      <div className="logout">
        <Logout className='logout'/>
      </div>
      <img src={hi} alt="hi" />
      <h1>
        Welcome, <span>{currentUser.username}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  .logout{
    margin-right: 27px
  }
  img {
    height: 15rem;
  }
  span {
    color: #4e0eff;
  }
`;

export default Welcome;
