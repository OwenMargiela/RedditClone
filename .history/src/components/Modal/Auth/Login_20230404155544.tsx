import { Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import React, { useState } from "react";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const onSubmit = () => {};

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  {
    console.log(loginForm);
  }

  return (
    <form onSubmit={onSubmit}>
      <Input
        name="email"
        type="email"
        placeholder="email"
        mb={2}
        onChange={onChange}
      ></Input>
      <Input
        name="password"
        type="password"
        placeholder="password"
        mb={2}
        onChange={onChange}
      ></Input>
      <Button type="submit">Log in</Button>
    </form>
  );
};
export default Login;
