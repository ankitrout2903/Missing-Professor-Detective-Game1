import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const apiEndpoint = 'http://localhost:3001/login';
  const navigate = useNavigate();
  const [helperText, setHelperText] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const adminMail = 'demo@mail.com';
  const adminPassword = 'thisisapassword';

  const handleSubmit = async (event) => {
    event.preventDefault();
    localStorage.clear();
    localStorage.setItem('email', email);

    if (email === adminMail && password === adminPassword) {
      navigate('/dashboard/app', { replace: true });
      return;
    }

    const jsonContent = {
      email,
      password,
    };

    fetch(apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonContent),
    }).then((response) => {
      if (response.ok) {
        navigate('/pregame', { replace: true });
      } else {
        setHelperText('Incorrect email or password');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          helperText={helperText}
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
        <Checkbox name="remember" label="Remember Me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained">
        Login
      </LoadingButton>
    </form>
  );
}
