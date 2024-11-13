import {useState} from 'react';
import {api} from '@/lib/api';

export default function useAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  return {
    error,
    auth: async () => {
      try {
        const response: any = await api.auth.get({
          headers: {
            authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        console.log('response', response);
        if (response.status === 200) {
          console.log('Authorized', response);
          return true;
        }
        setError(response?.message || 'Unauthorized');
        return false;
      } catch (error) {
        setError('Unauthorized');
        return false;
      }
    },
    login: async ({email, password}: {email: string; password: string}) => {
      try {
        const response: any = await api.login.post({
          email,
          password,
        });
        console.log(response);

        if (response.status === 200 && response.data.body.token) {
          // Save the token to local storage or cookies (you can choose your preferred storage method)
          localStorage.setItem('authToken', response.data.body.token);
          return response;
        } else {
          setError(response.message || 'Login failed');
          throw new Error(response.message || 'Login failed');
          return response;
        }
      } catch (err) {
        setError('An error occurred during login');
        return {status: 500, message: 'An error occurred during login' + err};
      }
    },
  };
}
