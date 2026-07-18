import "./app.scss";
import Dock from "./components/Dock";
import Nav from "./components/Nav";
import Github from "./components/windows/Github";
import Note from "./components/windows/Note";
import Resume from "./components/windows/Resume";
import Spotify from "./components/windows/spotify";

function App() {
  return (
    <main>
      <Nav />
      <Dock />

      <Github />
      <Note/>
      <Resume/>
      <Spotify/>
    </main>
  );
}

export default App;
