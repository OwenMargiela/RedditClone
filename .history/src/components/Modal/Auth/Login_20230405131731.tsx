import { Button, Flex } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        type="email"
        placeholder="email"
        mb={2}
        onChange={onChange}
        fontSize={"10pt"}
        _placeholder={{ color: "gray.500" }}
        _hover={{
          outline: "none",
          bg: "white",
          border: "1px solid black",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg={"gray.50"}
      ></Input>
      <Input
        required
        name="password"
        type="password"
        placeholder="password"
        mb={2}
        onChange={onChange}
        fontSize={"10pt"}
        _placeholder={{ color: "gray.500" }}
        _hover={{
          outline: "none",
          bg: "white",
          border: "1px solid black",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg={"gray.50"}
      ></Input>
      <Button width={"100%"} height={"36px"} type="submit">
        Log in
      </Button>
      <Text
        color={"red"}
        mb={4}
        fontSize={"9pt"}
        fontWeight={"500"}
        textAlign={"center"}
      >
       {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS ]}
      </Text>
      <Flex mt={4} fontSize={"9pt"} justifyContent={"center"}>
        <Text mr={1}>New here?</Text>
        <Text
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "signup",
            }))
          }
          color={"blue.500"}
          fontWeight={700}
          cursor={"pointer"}
        >
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
};
export default Login;
