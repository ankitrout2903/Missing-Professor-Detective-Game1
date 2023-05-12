import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function SignupForm() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();

    localStorage.clear();
    localStorage.setItem('email', email);
    const jsonContent = {
      name,
      email,
      password,
    };

    fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonContent),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.exists) {
          throw new Error('Email already exists');
        } else {
          navigate('/pregame', { replace: true });
        }
      })
      .catch((error) => {
        console.error(error);
        setEmailError(true);
      });
  };

  const handleEmailChange = (event) => {
    const email = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    setEmailError(!emailRegex.test(email));
    setEmail(email);
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setPasswordError(password.length < 8);
    setPassword(password);
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="name"
          label="Full Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          name="email"
          label="Email address"
          error={emailError}
          onChange={handleEmailChange}
          helperText={emailError && 'Please enter a valid email address'}
        />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          error={passwordError}
          helperText={passwordError && 'Password must be at least 8 characters'}
          onChange={handlePasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (password !== confirmPassword) {
              setConfirmPasswordError(true);
            } else {
              setConfirmPasswordError(false);
            }
          }}
          helperText={confirmPasswordError && 'Passwords do not match'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="agreeTerms" label="I agree to the terms" />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
        disabled={emailError || passwordError}
      >
        Sign up
      </LoadingButton>
    </>
  );
}
