import React from 'react'
import { useState } from 'react';
import { baseUrl } from './App';

function TicketReservation() {

    const [passengerName, setPassengerName] = useState('');
    const [trainNumber, setTrainNumber] = useState('');
    const [sourceStation, setSourceStation] = useState('');
    const [destinationStation, setDestinationStation] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');

    const resetForm = () => {
        setPassengerName('');
        setTrainNumber('');
        setSourceStation('');
        setDestinationStation('');
        setDepartureDate('');
        setArrivalDate('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const passengerDTO = {
            passengerName: passengerName
        };
          
        fetch(baseUrl + 'passenger/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(passengerDTO)
        })
        .then(response => response.json()).then(passenger => {
            const trainDTO = {
                trainNumber: trainNumber,
                sourceStation: sourceStation,
                destinationStation: destinationStation
            };
        
            fetch(baseUrl + "train/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trainDTO)
            })
            .then(response => response.json()).then(train => {
                const ticketDTO = {
                    passenger: {
                        id: passenger.id,
                        passengerName: passenger.passengerName
                    },
                    train: {
                        trainNumber: train.trainNumber,
                        sourceStation: train.sourceStation,
                        destinationStation: train.destinationStation
                    },
                    departureTime: departureDate,
                    arrivalTime: arrivalDate
                };
        
                fetch(baseUrl + 'ticket/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ticketDTO)
                })
                .then(response => response.json()).then(ticket => {
                    resetForm();
                })
                .catch(err => {
                    console.log('Could not create the ticket' + err);
                });
            })
            .catch(err => {
                console.log('Could not create the train: ' + err);
            });
        })
        .catch(err => {
            console.log('Could not create the passenger: ' + err);
        });   
    }

    return (
        <>
            <h1>Ticket Reservation System</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    Passenger Name: <input type="text" value={passengerName} placeholder='Ex. John Doe' onChange={e => setPassengerName(e.target.value)} required/><br />
                    Train Number: <input type="text" value={trainNumber} placeholder='Ex. 123456' onChange={e => setTrainNumber(e.target.value)} required/><br />
                    Source Station: <input type="text" value={sourceStation} placeholder='Ex. ROM' onChange={e => setSourceStation(e.target.value)} required/><br />
                    Destination Station: <input type="text" value={destinationStation} placeholder='Ex. DAL' onChange={e => setDestinationStation(e.target.value)} required/><br />
                    Departure Date & Time: <input type="datetime-local" value={departureDate} onChange={e => setDepartureDate(e.target.value)} required/><br />
                    Arrival Date & Time: <input type="datetime-local" value={arrivalDate} onChange={e => setArrivalDate(e.target.value)} required/><br />
                    <input type="submit" value='Make Reservation' />
                </form>
            </div>
        </>
    )
}

export default TicketReservation;