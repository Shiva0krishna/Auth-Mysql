import React, { useEffect, useState } from 'react';

export default function Complaintpage() {
  const [value, setValue] = useState('');

  useEffect(() => {
    async function retrieveData() {
      try {
        const response = await fetch('http://localhost:4000/api/home', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const key = await response.json();
        setValue(key.Email);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    retrieveData();
  }, []); 

  const sendLocationToBackend = async (latitude, longitude) => {
    try {
      const response = await fetch('http://localhost:4000/api/geolocation', { // Make sure the endpoint matches the backend route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude,
          longitude,
          email: value, // Pass the value as 'email'
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          sendLocationToBackend(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px',flexDirection:'column' }}>
      <p style={{fontSize:"24px"}}>{value}</p>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: "#233",
          color: 'whitesmoke',
          padding: '15px 30px',
          fontSize: '16px',
          border: 'none',
          cursor: 'pointer',
          flex: 1,
          marginRight: '10px',
        }}
      >
        Alert the authority
      </button>
    </div>
  );
}



