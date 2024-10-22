import Player from "./components/Player.jsx";
import TimerChallenge from "./components/TimerChallenge.jsx";

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimerChallenge title="Easy" targetTime={1} />
        <TimerChallenge title="Easy" targetTime={5} />
        <TimerChallenge title="Easy" targetTime={10} />
        <TimerChallenge title="Easy" targetTime={15} />
      </div>
    </>
  );
}

export default App;
