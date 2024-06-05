

import { useEffect, useState } from "react";
import axios from "axios";

export const AdminEvent = () => {
    const [events, setEvents] = useState([]);

    const getAllEventsData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/admin/events', {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`, // Ensure the token is set in .env
                    'Content-Type': 'application/json'
                }
            });

            console.log(response); // Log the response to inspect

            if (response.status !== 200) {
                throw new Error(`Error: ${response.statusText}`);
            }
            
            const data = response.data;
            console.log('events', data); // Log the data to inspect
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        getAllEventsData();
    }, []); // Empty dependency array ensures this runs only once on mount

    return (

        <>

        
        <section className="admin-user-section">
            <div className="container">
                <h2 style={{color:"brown"}}> Admin Events Data </h2>
                <table className="table table-success table-striped">
                    <thead>
                        <tr>
                            <th> Uploaded Date </th>
                            <th> Event Name </th>
                            <th> Starting Date </th>
                            <th> Ending Date </th>
                            <th> Guest </th>
                            <th> Description </th>
                            <th> Edit </th>
                            <th> Delete </th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.length > 0 ? (
                            events.map((curEvent, index) => (
                                <tr key={index}>
                                    <td>{curEvent.uploadedDate}</td>
                                    <td>{curEvent.eventName}</td>
                                    <td>{curEvent.startingDate}</td>
                                    <td>{curEvent.endingDate}</td>
                                    <td>{curEvent.guest}</td>
                                    <td>{curEvent.description}</td>
                                    <td><button>Edit</button></td>
                                    <td><button>Delete</button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No events found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
        </>
    );
};

export default AdminEvent;
