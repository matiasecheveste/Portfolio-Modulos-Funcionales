// src/components/Header.jsx
import React from "react";

function Header() {
  return (
    <header className="w-full bg-gray-900 text-white flex items-center justify-between px-6 py-3 fixed top-0 left-0 shadow-lg z-50">
      <div className="flex items-center gap-3">
        {/* Logo: puedes cambiar el src por tu logo real */}
        <img
          src="https://i.ibb.co/mrkSGtfN/file-00000000462061f88f16356f97d6527e.png"
          alt="Logo"
          className="h-10 w-10 object-contain"
        />
        <span className="font-semibold text-lg select-none">echevesteproject</span>
      </div>

      <a
        href="https://github.com/matiasecheveste/Portfolio-Modulos-Funcionales"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-blue-400"
      >
        Portfolio GitHub
      </a>
    </header>
  );
}

export default Header;