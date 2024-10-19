import './App.css';
import Provider1Button from 'remote1/Button';
import Provider2Button, { Paragraph } from 'remote2/Button';
import { orchestratorActor } from './orchestrator';

const App = () => {

  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <Provider1Button />
      <Provider2Button />
      <Paragraph />
      <p>Start building amazing things with Rsbuild.</p>

      <button onClick={() => orchestratorActor.send({ type: "START_REMOTE1" })}>
        Start Remote 1
      </button>
      <button onClick={() => orchestratorActor.send({type: 'START_REMOTE2'})}>
        Start Remote 2
      </button>
    </div>
  );
};

export default App;
