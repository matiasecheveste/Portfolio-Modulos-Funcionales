import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!email) {
      return setError("Por favor ingresa tu correo electrónico.");
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Se envió un correo para restablecer la contraseña.");
    } catch (err) {
      setError("Error al enviar correo: " + err.message);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h1 className="text-3xl font-bold mb-4">Recuperar contraseña</h1>
        <form onSubmit={handleReset} className="flex flex-col w-80 gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-600 text-sm">{message}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Enviar correo de recuperación
          </button>
        </form>

        <p className="mt-4 text-sm">
          ¿Recordaste tu contraseña?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 underline hover:text-blue-800 cursor-pointer"
          >
            Iniciar sesión
          </button>
        </p>
      </div>
    </>
  );
}

export default ResetPassword;