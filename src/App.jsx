import "./app.scss";
import Dock from "./components/Dock";
import Nav from "./components/Nav";
import MacWindow from "./components/windows/MacWindow";

function App() {
  return (
    <main>
      <Nav />
      <Dock />

      <MacWindow />
    </main>
  );
}

export default App;
