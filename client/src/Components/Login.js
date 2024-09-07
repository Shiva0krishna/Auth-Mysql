import React, { useContext, createContext, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

let userContext = createContext({ level: false, logged: () => {} });

function Login() {
  const auth = useContext(userContext);
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  async function LoginUser(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        pass,
      }),
    });
    const data = await response.json();
    if (data.status === "User-Found") {
      setErr("Correct Credentials");
      setTimeout(() => {
        navigate('/Home');
      }, 0);
      auth.level = true;
    } else if (data.status === "User-NotFound") {
      auth.level = false;
      navigate('/login');
      setErr("Email or Password is incorrect");
    }
    console.log(data);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Login</h1>
      <p style={styles.error}>{err}</p>
      <form onSubmit={LoginUser} style={styles.form}>
        <input
          style={styles.input}
          value={email}
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder='Email'
        />
        <input
          style={styles.input}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type='password'
          required
          placeholder='Password'
        />
        <button type='submit' style={styles.submitButton}>Login</button>
      </form>
      <h6 style={styles.registerText}>Not registered yet?</h6>
      <Link to="/register" style={styles.registerLink}>Register</Link>
      <Outlet />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: '32px',
    color: '#333',
    marginBottom: '20px',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '2px solid lightgrey',
    fontSize: '16px',
  },
  submitButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  submitButtonHover: {
    backgroundColor: '#0056b3',
  },
  registerText: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#555',
  },
  registerLink: {
    textDecoration: 'none',
    color: '#007bff',
    marginTop: '5px',
    fontSize: '16px',
  },
};

// Responsive styles
const mediaStyles = {
  '@media (max-width: 768px)': {
    title: {
      fontSize: '28px',
    },
    form: {
      width: '80%',
    },
    input: {
      fontSize: '14px',
      padding: '8px',
    },
    submitButton: {
      fontSize: '14px',
      padding: '8px',
    },
  },
  '@media (max-width: 480px)': {
    title: {
      fontSize: '24px',
    },
    input: {
      fontSize: '12px',
      padding: '6px',
    },
    submitButton: {
      fontSize: '12px',
      padding: '6px',
    },
  },
};

export default Login;
