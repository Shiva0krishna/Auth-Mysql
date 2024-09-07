import React, { useEffect, useState } from 'react';

export default function Authority() {
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:4000/api/geolocations', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setCombinedData(data.combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1 style={{ marginLeft: "3%", color: "dodgerblue" }}>Authority Dashboard</h1>
      
      <div style={{ padding: "1.4%", display: "flex", flexDirection: "column", gap: "20px",background:"dodgerblue" }}>
        {combinedData.length > 0 ? (
          combinedData.map((item) => (
            <div className="card bg-light text-dark" key={item.id}>
              <div className="card-body">
                <p><strong>Name:</strong> {item.name}</p>
                <p><strong>Email:</strong> {item.email}</p>
                <p><strong>Phone Number:</strong> {item.phone_number}</p>
                <p><strong>Emergency Contact 1</strong> {item.father_phone_number}</p>
                <p><strong>Emergency Contact 2</strong> {item.mother_phone_number}</p>
                <p><strong>Aasdhar Card:</strong> {item.aadhar_card}</p>
                <p><strong>Address:</strong> {item.address}</p>
                <p><strong>Key word :</strong> {item.age}</p>
                <p><strong>Latitude:</strong> {item.latitude}</p>
                <p><strong>Longitude:</strong> {item.longitude}</p>
                <p><strong>Timestamp:</strong> {item.timestamp}</p>
                <p><strong>Created At:</strong> {item.created_at}</p>
                <p><strong>Updated At:</strong> {item.updated_at}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
}
