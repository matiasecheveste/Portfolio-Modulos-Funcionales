import React, { useState } from "react";
import { loginUser } from "../firebase/Auth";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function firebaseErrorToSpanish(error) {
  if (!error || !error.code) return "Ha ocurrido un error inesperado, probablemente datos incorrectos.";

  switch (error.code) {
    case "auth/invalid-email":
      return "El correo electrónico no es válido.";
    case "auth/user-disabled":
      return "La cuenta ha sido deshabilitada.";
    case "auth/user-not-found":
      return "No existe una cuenta con este correo.";
    case "auth/wrong-password":
      return "Contraseña incorrecta.";
    case "auth/too-many-requests":
      return "Demasiados intentos fallidos. Intenta más tarde.";
    case "auth/network-request-failed":
      return "Error de red. Verifica tu conexión.";
    default:
      return "Error: " + (error.message || "Error desconocido.");
  }
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setError("Todos los campos son obligatorios.");
    }

    const { user, error: firebaseError } = await loginUser(email, password);

    if (firebaseError) {
      return setError(firebaseErrorToSpanish(firebaseError));
    }

    navigate("/dashboard");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h1 className="text-3xl font-bold mb-4">Iniciar sesión</h1>
        <form onSubmit={handleLogin} className="flex flex-col w-80 gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="mt-4 text-sm">
          ¿No tienes cuenta?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 underline hover:text-blue-800 cursor-pointer"
          >
            Crear una
          </button>
        </p>

        <button
          onClick={() => navigate("/reset-password")}
          className="mt-2 text-sm text-gray-600 underline hover:text-gray-800"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>
    </>
  );
}

export default Login;