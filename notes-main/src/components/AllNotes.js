import axios from 'axios'; // Importing axios library for making HTTP requests
import { useEffect, useState } from "react"; // Importing useEffect and useState hooks from React

export default function AllNotes() {
    const [notes, setNotes] = useState(''); // Using useState hook to manage state of 'notes'

    useEffect(() => { // Using useEffect hook to perform side effects (e.g., data fetching) in function components
        axios.get(`http://hyeumine.com/notesposted.php`) // Making a GET request to 'http://hyeumine.com/notesposted.php'
        .then((res) => { // Handling the response from the server
            setNotes(res.data); // Updating the 'notes' state with the data received from the server
        });
    }, []); // Passing an empty dependency array to ensure the effect runs only once after the initial render

    const createMarkup = (htmlString) => { // Defining a function to create HTML markup from a string
        return { __html: htmlString }; // Returning an object with '__html' key set to the provided string
    }

    return (
        <div>
            <h1>All Notes</h1>
            <div dangerouslySetInnerHTML={createMarkup(notes)} /> {/* Rendering the 'notes' as HTML using dangerouslySetInnerHTML */}
        </div>
    );
};
