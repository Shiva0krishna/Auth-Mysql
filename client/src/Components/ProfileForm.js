import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function ProfileForm() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [fatherPhoneNumber, setFatherPhoneNumber] = useState('');
    const [motherPhoneNumber, setMotherPhoneNumber] = useState('');
    const [aadharCard, setAadharCard] = useState('');
    const [address, setAddress] = useState('');
    const [age, setAge] = useState('');

    async function getDetails(event) {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/ProfileForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    phoneNumber,
                    fatherPhoneNumber,
                    motherPhoneNumber,
                    aadharCard,
                    address,
                    age,
                }),
            });
            const info = await response.json();
            if (info.status === "data received") {
                navigate('/Home');
            } else {
                console.log("Data-Not found");
            }
            console.log(info);
        } catch (error) {
            console.log("Error Occurred:" + error);
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={getDetails}
                style={{
                    width: '55%',
                    height: "90%",
                    border: '1px solid lightgrey',
                    padding: '7%',
                    scrollbarWidth: 'none',
                    overflow: 'scroll',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 5px 5px lightgrey'
                }}>
                <h4 style={{ color: 'dodgerblue' }}>Complete Your Profile</h4>
                <div className="form-row">
                    <div className="col">
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                            required className="form-control" placeholder="Enter your Name" /> <br />
                    </div>
                    <div className="col">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            required className="form-control" placeholder="Email" /> <br />
                    </div>
                    <div className="col">
                        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                            required className="form-control" placeholder="Phone Number" /> <br />
                    </div>
                    <div className="col">
                        <input type="text" value={fatherPhoneNumber} onChange={(e) => setFatherPhoneNumber(e.target.value)}
                            className="form-control" placeholder="Emergency phone number 1" /> <br />
                    </div>
                    <div className="col">
                        <input type="text" value={motherPhoneNumber} onChange={(e) => setMotherPhoneNumber(e.target.value)}
                            className="form-control" placeholder="Emergency Phone number 2" /> <br />
                    </div>
                    <div className="col">
                        <input type="text" value={aadharCard} onChange={(e) => setAadharCard(e.target.value)}
                            required className="form-control" placeholder="Aadhar Card Number" /> <br />
                    </div>
                    <div className="col">
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                            required className="form-control" placeholder="Address" /> <br />
                    </div>
                    <div className="col">
                        <input type="number" value={age} onChange={(e) => setAge(e.target.value)}
                            required className="form-control" placeholder="Keyword" /> <br />
                    </div>
                    <input style={{ padding: '5px 20px', background: 'dodgerblue', border: 'none', borderRadius: '6px' }}
                        type='submit' value='Submit' />
                </div>
            </form>
        </div>
    );
}
