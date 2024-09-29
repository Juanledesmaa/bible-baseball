import './App.css';
import MainContainer from './components/mainContainer/MainContainer';
import WheelWithButton from './components/roulette/WheelWithButton';
import Header from './components/header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <MainContainer></MainContainer>
      <WheelWithButton style={{ position: 'relative', zIndex: 2 }} />
    </div>
  );
}

export default App;
