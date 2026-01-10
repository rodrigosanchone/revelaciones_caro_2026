"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="">
      <div className="flex flex-col items-center py-4 space-y-2">
        {/* Imagen central */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/blog-ca662.appspot.com/o/perfil.jpg?alt=media&token=42a2a5d7-f5b6-4b9b-b511-8b04b699354d"
            alt="Revelaciones de Caro"
            width={96}
            height={96}
            className="object-cover"
          />
        </div>

        {/* Título */}
        <h1 className="text-xl font-semibold text-gray-800">
          Revelaciones De Caro
        </h1>

        {/* Botón hamburguesa (solo móvil) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 hover:text-indigo-600 focus:outline-none mt-2"
        >
          ☰
        </button>

        {/* Menú de navegación */}
        <nav
          className={`
            ${menuOpen ? "flex" : "hidden"}
            flex-col items-center space-y-2 mt-2
            md:flex md:flex-row md:space-x-6 md:space-y-0
            text-gray-700
          `}
        >
          <Link href="/" className="hover:text-indigo-600">
            Inicio
          </Link>
          <Link href="/sobre-mi" className="hover:text-indigo-600">
            Sobre mí
          </Link>

          {/* Dropdown Sistema */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="hover:text-indigo-600"
            >
              Sistema ▼
            </button>
            {showDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-white shadow-md rounded px-4 py-2 text-sm">
                <Link
                  href="/sistema/parte1"
                  className="block py-1 hover:text-indigo-600"
                >
                  Parte 1
                </Link>
                <Link
                  href="/sistema/parte2"
                  className="block py-1 hover:text-indigo-600"
                >
                  Parte 2
                </Link>
              </div>
            )}
          </div>

          <Link href="/contacto" className="hover:text-indigo-600">
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}
