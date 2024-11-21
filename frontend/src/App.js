import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';


function App() {
  const StyledApp = styled.div`
    background-image: url('/space_background.svg');
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-family: Arial, sans-serif;
  `;
  return (
    <StyledApp>
      <h1 className="text-3xl font-bold underline">
      </h1>
    </StyledApp>
  )
}

export default App;
