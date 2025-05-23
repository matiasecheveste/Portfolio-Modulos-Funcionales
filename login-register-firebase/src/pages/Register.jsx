import React, { useState } from "react";
import { registerUser } from "../firebase/Auth";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function firebaseErrorToSpanish(error) {
  if (!error || !error.code) return "Ha ocurrido un error inesperado, probablemente datos incorrectos.";

  switch (error.code) {
    case "auth/invalid-email":
      return "El correo electrónico no es válido.";
    case "auth/email-already-in-use":
      return "El correo electrónico ya está en uso.";
    case "auth/weak-password":
      return "La contraseña es muy débil.";
    case "auth/network-request-failed":
      return "Error de red. Verifica tu conexión.";
    default:
      return "Error: " + (error.message || "Error desconocido.");
  }
}

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !repeatPassword) {
      return setError("Todos los campos son obligatorios.");
    }

    if (password.length < 6) {
      return setError("La contraseña debe tener al menos 6 caracteres.");
    }

    if (password !== repeatPassword) {
      return setError("Las contraseñas no coinciden.");
    }

    const { user, error: firebaseError } = await registerUser(email, password);

    if (firebaseError) {
      return setError(firebaseErrorToSpanish(firebaseError));
    }

    navigate("/dashboard");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h1 className="text-3xl font-bold mb-4">Crear cuenta</h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-80 gap-4">
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
          <input
            type="password"
            placeholder="Repetir contraseña"
            className="border p-2 rounded"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Registrarse
          </button>
        </form>

        <p className="mt-4 text-sm">
          ¿Ya tienes cuenta?{" "}
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

export default Register;