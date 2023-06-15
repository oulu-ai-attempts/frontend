import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { baseUrl } from './App';

function TrainTicketBoard() {

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        console.log("Use effect was called...")
        fetch(baseUrl + "ticket")
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setTickets(data);
          })
          .catch(error => {
            console.error('Error retrieving tickets: ', error);
          });
    }, []);

    return(
        <div>
            <h1>Ticket Board</h1>
            <table>
                <thead>
                    <tr>
                        <th>Passenger Name</th>
                        <th>Train Number</th>
                        <th>Source Station</th>
                        <th>Destination Station</th>
                        <th>Departure Time</th>
                        <th>Arrival Time</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets && tickets.map(ticket => 
                        <tr key={ticket.ticketId}>
                            <td>{ticket.passenger.passengerName}</td>
                            <td>{ticket.train.trainNumber}</td>
                            <td>{ticket.train.sourceStation}</td>
                            <td>{ticket.train.destinationStation}</td>
                            <td>{ticket.arrivalTime}</td>
                            <td>{ticket.departureTime}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )

}
export default TrainTicketBoard;