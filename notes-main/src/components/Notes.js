import * as React from "react"; // Importing React module
import { experimentalStyled as styled } from "@mui/material/styles"; // Importing styled from MUI for custom styling
import { Box, Paper, Grid, Button, TextField } from "@mui/material"; // Importing components from MUI
import axios from 'axios'; // Importing axios library for making HTTP requests
import { useEffect, useState } from "react"; // Importing useEffect and useState hooks from React

// Styling the Paper component using MUI's styled function
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body1,
    padding: theme.spacing(2),
    textAlign: "center",
    height: '150px',
    width: '170px',
    color: theme.palette.text.secondary,
    backgroundColor: "seashell",
    border: "1px solid #ccc",
  }));


export default function UserNotes() {
    const [userID, setUID] = useState(localStorage.getItem("userID") || ""); // State for user ID retrieved from localStorage
    const [myNotes, setMyNotes] = useState([]); // State for storing user's notes
    const [showForm, setShowForm] = useState(false); // State to manage visibility of note addition form
    const [noteText, setNoteText] = useState(''); // State for storing text of the note to be added

    // Effect hook to fetch user's notes from the server when user ID changes
    useEffect(() => {
        axios.get(`http://hyeumine.com/mynotes.php?id=${userID}`)
        .then((res) => {
            setMyNotes(res.data.notes); // Updating state with user's notes from the server response
        });
    }, [userID]);

    // Function to add a new note to the server
    const addNote = () => {
        axios
      .post(
        "http://hyeumine.com/newnote.php",
        {
          id: localStorage.getItem("userID"),
          note: noteText,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    }

    // Function to handle click event for adding a note
    const handleAddNote = () => {
        setShowForm(true); // Showing the note addition form
    };

    // Function to handle form submission for adding a note
    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(); // Adding the note to the server
        setMyNotes([...myNotes, [noteText]]); // Adding the note to the local state
        setNoteText(''); // Clearing the note text field
        setShowForm(false); // Hiding the note addition form
    };

  return (
    <>
      <Box textAlign="left">
        <Button
          variant="contained"
          sx={{
            height: "55px",
            backgroundColor: "gray",
            "&:hover": {
              backgroundColor: "silver",
            },
          }}
          onClick={handleAddNote}
        >
          Add a note
        </Button>
        {showForm && (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Note"
              multiline
              rows={4}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              fullWidth
              required
              variant="outlined"
              margin="normal"
            />
            <Button
            type="button"
            variant="contained"
            sx={{
              backgroundColor: "lightgray",
              "&:hover": {
                backgroundColor: "silver",
              },
              marginRight: '20px'
            }}
            onClick={() => {
              setShowForm(false);
              setNoteText('');
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: 'gray',
              '&:hover': {
                backgroundColor: 'silver',
              },
            }}
          >
            Save Note
          </Button>
          </form>
        )}
        <h2>My Notes</h2>
        <Grid
          container
          spacing={{ xs: 2, md: 1 }}
          columns={{ xs: 4, sm: 8, md: 8 }}
        >
          {myNotes.map((note, index) => (
            <Grid item key={index}>
              <Item>
                {note[0]}
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
