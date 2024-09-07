import React from 'react';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

export default function Home() {
  const [value, setValue] = useState('');

  useEffect(() => {
    async function retrieveData() {
      const response = await fetch('http://localhost:4000/api/home', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let key = await response.json();
      setValue(key.Email);
    }
    retrieveData();
  }, []); // Added empty dependency array to prevent infinite loops

  return (
    <div style={styles.container}>
      <Navbar />
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome to SecureHer</h1>
        <p style={styles.subtitle}>Empowering your safety, anytime, anywhere.</p>
      </header>
      <div style={styles.linkContainer}>
        <Link style={styles.link} to="/complaintpage">Send Alert</Link>
      </div>
      <div style={styles.content}>
        <div style={styles.loggedInInfo}>
          <p style={styles.emailText}>Logged in as:{value}</p>
        </div>
      </div>
      <footer style={styles.footer}>
        <p>© 2024 SecureHer. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    justifyContent: 'space-between',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    marginTop: '20px',
    padding: '0 20px',
  },
  title: {
    fontSize: '36px',
    color: '#007bff',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '20px',
    color: '#555',
  },
  linkContainer: {
    alignSelf: 'flex-center',
    margin: '20px 0',
    padding: '0 20px',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    backgroundColor: 'red',
    padding: '15px 30px',
    borderRadius: '5px',
    fontSize: '18px',
    transition: 'background-color 0.3s ease',
    textAlign: 'center',
  },
  content: {
    width: '90%',
    maxWidth: '800px',
    textAlign: 'center',
    marginTop: '20px',
    padding: '0 20px',
  },
  loggedInInfo: {
    marginBottom: '20px',
    backgroundColor: '#f0f8ff',
    borderRadius: '8px',
    padding: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  slogans: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '15px 20px',
    borderRadius: '8px',
    margin: '10px 0',
    width: '100%',
    textAlign: 'center',
    fontSize: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  footer: {
    textAlign: 'center',
    padding: '20px 0',
    backgroundColor: '#007bff',
    color: 'white',
    width: '100%',
    position: 'relative',
    bottom: 0,
  },
  // Responsive styles
  '@media (max-width: 768px)': {
    title: {
      fontSize: '28px',
    },
    subtitle: {
      fontSize: '16px',
    },
    link: {
      fontSize: '16px',
      padding: '12px 24px',
    },
    emailText: {
      fontSize: '18px',
    },
    box: {
      fontSize: '14px',
      padding: '12px 18px',
    },
  },
  '@media (max-width: 480px)': {
    title: {
      fontSize: '24px',
    },
    subtitle: {
      fontSize: '14px',
    },
    link: {
      fontSize: '14px',
      padding: '10px 20px',
    },
    emailText: {
      fontSize: '16px',
    },
    box: {
      fontSize: '12px',
      padding: '10px 16px',
    },
  },
};
