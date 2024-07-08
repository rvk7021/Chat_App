import React from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import useLogout from "../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <button className="mt-auto" onClick={logout} disabled={loading}>
      {!loading ? (
        <RiLogoutBoxLine className="w-6 h-6 text-white cursor-pointer" />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </button>
  );
}

export default LogoutButton;
