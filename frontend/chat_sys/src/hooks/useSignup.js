import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthUser } from '../Savedlogin/authLogin';  // Adjust path as necessary

// Handle input errors
function handleInputError({ fullname, username, password, confirmpassword, gender }) {
  if (!gender || !fullname || !username || !confirmpassword || !password) {
    toast.error("Please fill all fields");
    return false;
  }
  
  if (password.length < 8) {
    toast.error("Password must be at least 8 characters long");
    return false;
  }
  
  if (password !== confirmpassword) {
    toast.error("Passwords do not match");
    return false;
  }
  
  return true;
}

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthUser();  // Destructure `setAuthUser` from context

  const signup = async ({ fullname, username, password, confirmpassword, gender }) => {
    const success = handleInputError({ fullname, username, password, confirmpassword, gender });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/signUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, username, password, confirmpassword, gender })
      });

      if (!res.ok) {
        throw new Error('Failed to sign up. Please try again.');
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);  // Remove the placeholder error message
      }

      localStorage.setItem("authuser", JSON.stringify(data));
      setAuthUser(data);
      toast.success('Signed up successfully!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
}

export default useSignup;
