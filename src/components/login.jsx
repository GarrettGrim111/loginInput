import React, { useState } from "react";
import styled from "styled-components";
import { Button, Grid, TextField, Paper } from "@material-ui/core";

const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});

  const checkUsername = async (e) => {
    e.preventDefault();
    // simulate API response delay
    await new Promise((res) => setTimeout(res, 100));

    if (RegExp(/^[a-z-_.]+$/i).test(username) === false) {
      setErrors({
        error: "InvalidFormat",
        data:
          "username can only consist of characters a-z, A-Z, '-', '_' and '.'",
      });
    } else if (["admin", "null", "root"].includes(username)) {
      setErrors({
        error: "AlreadyExists",
        data: "this username is already taken",
      });
    } else {
      setEmail(`${username.toLowerCase()}@dig-it-ally.com`);
      setUsername("");
      setErrors({});
    }
  };

  return (
    <Wrapper>
      <Grid container className="container">
        <Grid item xs={12} sm={6}>
          <img src=".\images\spy-theme.jpg" alt="cover" className="cover" />
        </Grid>

        <Grid container item xs={12} sm={6} className="holder">
          <Form onSubmit={checkUsername}>
            <h2>Agent creation system</h2>
            <Grid container>
              <img src=".\images\fbi.jpg" alt="logo" className="logo" />
            </Grid>
            <Input
              label="Insert your credentials"
              margin="normal"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
            />

            {errors.error && <p>{errors.data} </p>}

            <Button color="primary" variant="contained" type="submit">
              Login
            </Button>
            {email && !errors.error && (
              <Paper elevation={3} className="output">
                <p>Welcome agent, your email is:</p>
                <span> {email}</span>
              </Paper>
            )}
          </Form>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .container {
    min-height: 100vh;
  }
  .cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .logo {
    width: 300px;
    height: 200px;
    object-fit: cover;
    margin: auto;
  }

  .holder {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .output {
    margin: 15px auto;
    padding: 15px;
    text-align: center;

    p {
      font-weight: bold;
      margin-bottom: 0.75rem;
    }
  }
`;

const Input = styled(TextField)`
  width: 300px;
  margin: 15px;
`;

const Form = styled.form`
  display: flex;
  width: auto;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  h2 {
    margin: 15px;
  }

  button {
    margin: 15px;
  }

  p {
    @media (max-width: 1100px) {
      width: 300px;
    }
  }
`;

export default Login;
