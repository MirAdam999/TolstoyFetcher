import Fetcher from "./comps/Fetcher";
import { URLProvider } from "./comps/URLProvider";
import './css/App.css'

function App() {
  return (
    <div className="App" data-testid="app-comp">
      <URLProvider>

        <h1>Welcome to <span>Fetcher!</span></h1>
        <h3>Let's fetch some metadata:</h3>
        <Fetcher />

      </URLProvider>
    </div>
  );
}

export default App;
