import { Input } from "@chakra-ui/react";
import React, { useState } from "react";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  return (
    <form>
      <Input
        name="email"
        type="email"
        placeholder="email"
        mb={2}
        onChange={() => {}}
      ></Input>
      <Input
      name="password"
      type="password"
      placeholder="password"
      mb={2}
      onChange={() => {}}></Input>
    </form>
  );
};
export default Login;
