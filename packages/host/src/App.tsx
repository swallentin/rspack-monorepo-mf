import './App.css';
import Provider1Button from 'remote1/Button';
import Provider2Button, { Paragraph } from 'remote2/Button';
import { orchestratorActor } from './orchestrator';
import { remote1Actor } from "remote1/stateMachine";
import { remote2Actor } from "remote2/stateMachine";
import { useSelector } from '@xstate/react';


const App = () => {
  const isActive = useSelector(remote1Actor, (state) => state.matches("active"));
  return (
    <div>
      <div className="header">
        <h1>Rsbuild with React</h1>
        <Paragraph />
        <p>Start building amazing things with Rsbuild.</p>
        <button onClick={() => orchestratorActor.send({ type: "START_REMOTE1" })}>
          Start Remote 1
        </button>
        <button onClick={() => orchestratorActor.send({type: 'START_REMOTE2'})}>
          Start Remote 2
        </button>
      </div>
      <div className="content">
        <div className="panel left-panel">
        <Provider1Button />
      </div>
      <div className="panel right-panel">
        <Provider2Button />
      </div>  
    </div>
    </div>
  );
};

export default App;
