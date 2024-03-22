import React, { useState, useEffect } from 'react';
import agent from './../api/coach_agent';
import { TextField, Avatar } from '@mui/material';
import { CircularProgress } from '@mui/material';
import Chat from './Chat/Chat';
import Button from '@mui/material/Button';
import "../styles/components.css"
import avatarIcon from "./../assets/avatarIcon.jpg";
import ResponsiveAppBar from './../components/Navbar/ResponsiveAppBar';

const Sim = () => {
  const [audioSrc, setAudioSrc] = useState(null);
  const [messages, setMessages ] = useState([]);

      useEffect(() => {
        messages.forEach((message) => {
          var lastMessage = messages[messages.length - 1];
            if (!message.isUser) {
                getAudio(lastMessage.text);
            }
        });
    }, [messages]); 

    const getAudio = async (message) => {
      console.log("getAudio called", message);
        const response = await fetch("http://localhost:5000/speech", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  // sent request
            },
            // We can add more data to the body if necessary
            body: JSON.stringify({text: message}), 
        });

        // Assuming our server responds with a direct link to the audio file
        // Convert the blob response to a URL object and then to a URL string
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        // Update our state with the new audio source URL
        setAudioSrc(audioUrl);
        console.log("audio set");
    };

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  async function gptChatRequest(message) {
    const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}


  const handleSendMessage = async () => {
    if (inputValue.trim() === '') {
      return;
    }

    setLoading(true);

    try {
      const response = await gptChatRequest(inputValue);
      console.log("response: ", response);
      console.log("response.response: ", response.response);
      setMessages((prevMessages) => [...prevMessages, { text: inputValue, isUser: true }, { text: response.response, isUser: false }]);
      console.log("messsages just set!: ", messages);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setInputValue('');
    }
  };

  return (
    <>
      <ResponsiveAppBar sx={{position: 'fixed'}} />
      <div className='golem-background' style={{ display: 'flex', padding: '16px', flexDirection: 'column', minHeight: '100vh', marginBottom: '30px', borderRadius: '8px' }}>
        <Avatar
          alt="Remy Sharp"
          src={avatarIcon}
          sx={{ width: 150, height: 150, margin: 'auto' }}
        />
        <h3>Personal Avatar</h3>
        <p>Let's discuss about our feelings!</p>
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, marginBottom: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', overflowY: 'scroll', flex: 1 }}>
            {messages.map((message, index) => {
              console.log("messages not set", messages);
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    backgroundColor: message.isUser ? '#6262d5' : '#FFFFFF',
                    borderRadius: '4px',
                    padding: '8px',
                    textAlign: 'left',
                    marginBottom: '8px',
                    alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                    maxWidth: '70%',
                    color: message.isUser ? '#FFFFFF' : 'inherit',
                  }}
                >
                  {message.text}
                </div>
              )}
            )}
          </div>
          {loading && <CircularProgress />}
        </div>
        <div className='chatInputArea' style={{ display: 'flex', alignItems: 'center' }}>
          <TextField style={{ marginRight: '16px', flexGrow: 1 }} value={inputValue} onChange={handleInputChange} placeholder="Type a message" variant="outlined" />
          <Button variant="contained" onClick={handleSendMessage}>
            Send
          </Button>
        </div>
        {audioSrc && <audio controls src={audioSrc} autoPlay className='golem-audio'/>}
      </div>
    </>
  );
};

export default Sim;