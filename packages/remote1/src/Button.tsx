import { useState } from "react";
import { remote1Actor } from "./stateMachine";
import { useActor, useSelector } from "@xstate/react";

export default function Button() {
  const messages = useSelector(remote1Actor, (state) => state.context.messages);
  const isActive = useSelector(remote1Actor, (state) => state.matches("active"));

  return (
    <div style={{ border: "2px solid white", padding: "10px" }}>
      <div>Remote 1: isActive: {isActive === true ? "true" : "false"}</div>
      <div>Messages: {messages.map((message, index) => <div key={`${message}-${index}`}>{message}</div>)}</div>
    </div>
  );
}