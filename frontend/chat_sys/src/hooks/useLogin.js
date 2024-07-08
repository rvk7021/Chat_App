import { useState } from 'react';
import { useAuthUser } from '../Savedlogin/authLogin';
import toast from 'react-hot-toast';


function handleInputError(username, password){
    if(!username || !password)
    {
        toast.error('Please Fill the credentials');
        return false;
    }
    return true;
}

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthUser(); // Correct destructuring

  const login = async (username, password) => {
    const success = handleInputError(username, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      
      localStorage.setItem('authuser', JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error("Login Failed! Please Check the credentials");

    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
