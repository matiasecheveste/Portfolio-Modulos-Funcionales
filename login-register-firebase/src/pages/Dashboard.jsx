import React from "react";
import { useAuth } from "../hooks/useAuth";
import { auth } from "../firebase";
import { logoutUser } from "../firebase/Auth";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser(auth);
    navigate("/login");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h1 className="text-3xl font-bold mb-4">Bienvenido, {user?.email}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </div>
    </>
  );
}

export default Dashboard;