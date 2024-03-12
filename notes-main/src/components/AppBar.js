import * as React from "react"; // Importing React module
import { useState, useEffect, useRef } from "react"; // Importing useState, useEffect, and useRef hooks from React
import { AppBar, Box, Toolbar, Typography, Button, IconButton, TextField, } from "@mui/material"; // Importing components from Material-UI
import axios from "axios"; // Importing axios library for making HTTP requests
import { Link } from "react-router-dom"; // Importing Link component from React Router
import icon from "../components/notes-icon.png"; // Importing image file

export default function NotesAppBar() {
  const [showForm, setShowForm] = useState(false); // State to manage visibility of registration form
  const formRef = useRef(null); // Reference for the registration form
  const [ufirstname, setFName] = useState(localStorage.getItem("firstname") || ""); // State for user's first name
  const [ulastname, setLName] = useState(localStorage.getItem("lastname") || ""); // State for user's last name
  const [userID, setUID] = useState(localStorage.getItem("userID") || ""); // State for user ID retrieved from localStorage

  // Function to register a new user
  const registerUser = () => {
    axios
      .post(
        "http://hyeumine.com/newuser.php",
        {
          firstname: ufirstname,
          lastname: ulastname,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(function (response) {
        setUID(response.data.id); // Setting user ID in state
        localStorage.setItem("userID", response.data.id); // Storing user ID in localStorage
        setShowForm(false); // Hiding registration form
      });
  };

  // Effect hook to handle click outside of the registration form
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false); // Hiding form if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to handle click on the Register button
  const handleRegisterClick = () => {
    setShowForm(!showForm); // Toggling visibility of the registration form
  };

  // Function to handle text field changes
  const handleTxtChange = (e, nameType) => {
    const value = e.target.value;
    if (nameType === "firstname") {
      setFName(value); // Setting first name in state
      localStorage.setItem("firstname", value); // Storing first name in localStorage
    } else if (nameType === "lastname") {
      setLName(value); // Setting last name in state
      localStorage.setItem("lastname", value); // Storing last name in localStorage
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#333' }}>
        <Toolbar sx={{ display: 'flex', alignContent:'left' }}>
          <img src={icon} alt="Notes Icon" style={{ width: '45px', height: '45px', marginRight:'20px'}} />
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 10}}
          >
            NOTES APP
          </IconButton>
          <Typography variant="h6" component="div"/>
          <Link to="/usernotes" className="YourNotes" sx={{ color: 'inherit', textDecoration: 'none', mr: 2 }}>
           Your Notes
          </Link>
          <Link to="/allnotes" className="AllNotes" sx={{ color: 'inherit', textDecoration: 'none' }}>
            All Notes
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
          <Button size="large" color="inherit" onClick={handleRegisterClick}>
            REGISTER
          </Button>
        </Toolbar>
      </AppBar>
      {showForm && (
        <Box
          ref={formRef}
          sx={{
            position: "absolute",
            right: 0,
            width: "300px",
            bgcolor: "background.paper",
            padding: "16px",
          }}
        >
          <form>
            <TextField
              id="firstname"
              label="First Name"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(e) => handleTxtChange(e, "firstname")}
              value={ufirstname}
            />
            <TextField
              id="lastname"
              label="Last Name"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(e) => handleTxtChange(e, "lastname")}
              value={ulastname}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                registerUser();
              }}
              sx={{
                backgroundColor: 'gray',
                '&:hover': {
                  backgroundColor: 'silver',
                },
              }}
            >
              Submit
            </Button>
          </form>
        </Box>
      )}
    </Box>
  );
}
