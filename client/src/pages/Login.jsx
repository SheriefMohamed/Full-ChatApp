import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.png';
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  
  useEffect(()=> {
    if(localStorage.getItem('chat-app-user')){
      navigate('/')
    }
  }, [navigate])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()){
      try{
        const { username, password } = values;
        const { data } = await axios.post(loginRoute, {
          username,
          password
        });
        if (data.status === true) {
          localStorage.setItem('chat-app-user',JSON.stringify(data.user));
          navigate("/");
        }
      }catch(err){
        toast.error(err.response.data.errorMessage, toastOptions);
      }
    }
  }

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  const handleValidation = () => {
    const { username, password } = values;
    if (password.length === "") {
      toast.error(
        "email and password is required",
        toastOptions
      );
      return false;
    } else if (username.length === "") {
      toast.error(
        "email and password is required",
        toastOptions
      );
      return false;
    }

    return true;
  };

  return (
    <Fragment>
      <FormContainer>
      <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>chatty</h1>
          </div>
          <input type="text" placeholder="Username" name="username" min="3" onChange={(event) => handleChange(event)}/>
          <input type="password" placeholder="Password" name="password" onChange={(event) => handleChange(event)}/>
          <button type="submit">Login</button>
          <span>
            Don't have an account ? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </Fragment>
  )
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img {
    height: 5rem;
  }
  h1 {
    color: white;
    text-transform: uppercase;
  }
}
form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #00000076;
  border-radius: 2rem;
  padding: 3rem 5rem;
}
input {
  background-color: transparent;
  padding: 1rem;
  border: 0.1rem solid #ff7404;
  border-radius: 0.4rem;
  color: white;
  width: 100%;
  font-size: 1rem;
  &:focus {
    border: 0.1rem solid #997af0;
    outline: none;
  }
}
button {
  background-color: #4e0eff;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
    background-color: #4e0eff;
  }
}
span {
  color: white;
  text-transform: uppercase;
  a {
    color: #ff7404;
    text-decoration: none;
    font-weight: bold;
  }
}`;

export default Login
