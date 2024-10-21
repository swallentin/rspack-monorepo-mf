import { useSelector } from "@xstate/react";
import { remote2Actor } from "./stateMachine";
import { useCallback, useState } from "react";

export default function Button() {
  const isWaiting = useSelector(remote2Actor, (state) => state.matches("waiting"));
  const isProcessing = useSelector(remote2Actor, (state) => state.matches("processing"));

  const [message, setMessage] = useState("");

  const handleProcessMessage = useCallback(() => {
    remote2Actor.send({ type: "PROCESS", message });
    setMessage("");
  }, [message]);

  const handeComplete = useCallback(() => {
    remote2Actor.send({ type: "COMPLETE" });
    setMessage("");
  }, []);

  return <div>
    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
    <button disabled={!isWaiting} onClick={handleProcessMessage} type="button">
          Process message
    </button>    
    <button disabled={!isProcessing} onClick={handeComplete} type="button">
          Send processed message
    </button>    

  </div>
}
export const Paragraph = () => <div>lore ipsum dolor sit amet more content</div>
