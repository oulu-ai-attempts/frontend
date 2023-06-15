import React  from 'react';
import TicketReservation from './TicketReservation';
import TrainTicketBoard from './TrainTicketBoard';
import './App.css';

export const baseUrl = "http://localhost:8080/";

function App() {

  return (
    <div className="App">
        <TicketReservation />
        <TrainTicketBoard />
    </div>
  );
}

export default App;
