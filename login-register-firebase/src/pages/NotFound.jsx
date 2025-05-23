import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function NotFound() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center text-center pt-20">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Página no encontrada</p>
        <Link to="/" className="text-blue-500 underline">
          Ir al inicio
        </Link>
      </div>
    </>
  );
}

export default NotFound;