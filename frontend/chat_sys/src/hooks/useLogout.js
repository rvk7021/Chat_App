import { useState } from "react";
import { useAuthUser } from "../Savedlogin/authLogin";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthUser();  // Destructure correctly

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        headers: { "Content-Type": "application/json" }
      });

      // Check if response is not ok
      if (!res.ok) {
        const errorText = await res.text();  // Read the response text
        throw new Error(errorText);
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("authuser");
      setAuthUser(null);
    } catch (error) {
      console.error("Error in logout", error.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, logout };
}

export default useLogout;
