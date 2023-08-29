import React from "react";
import Navbar from "../Navbar/Navbar";

interface MyComponentProps {
  children: React.ReactNode;
}

export default function Layout({ children }: MyComponentProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
