"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { emailJsConfig } from "@/lib/firebase/environments";
import { FaEnvelope, FaPhone } from "react-icons/fa";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre || !formData.email || !formData.mensaje) {
      setStatus("❌ Por favor completa todos los campos.");
      return;
    }

    setStatus("Enviando...");

    try {
      await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          nombre: formData.nombre,
          email: formData.email,
          mensaje: formData.mensaje,
        },
        emailJsConfig.publicKey
      );

      setStatus("✅ Mensaje enviado con éxito");
      setFormData({ nombre: "", email: "", mensaje: "" });
    } catch (error: unknown) {
      console.error(
        error instanceof Error ? error.message : JSON.stringify(error, null, 2)
      );
      setStatus("❌ Error al enviar el mensaje");
    }
  };

  return (
    <div className="px-4 py-12 max-w-3xl mx-auto text-center">
      {/* Título principal */}
      <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
        Contacto
      </h1>
      <div className="text-center">
        <p className="text-lg">Consultas y orientación espiritual.</p>
      </div>

      {/* Grid de dos columnas */}
      <div className="my-10 grid md:grid-cols-2 gap-8">
        {/* Columna izquierda */}
        <div className="my-10">
          <h2 className="text-2xl font-semibold dark:text-white">Contacto</h2>
          <p className="mt-5 max-w-sm">Escríbeme y con gusto te atenderé</p>

          {/*    <div className="mt-5 space-y-2">
            
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <FaEnvelope className="h-4 w-4" />
              <a href="mailto:tuemail@ejemplo.com">tuemail@ejemplo.com</a>
            </div>

            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <FaPhone className="h-4 w-4" />
              <a href="tel:+50688888888">+506 8888-8888</a>
            </div>
          </div> */}
        </div>

        {/* Columna derecha: formulario */}
        <div>
          <form onSubmit={handleSubmit} className="my-10 space-y-5">
            <div>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full rounded-md border-2 px-4 py-3 outline-none placeholder:text-gray-800 focus:ring-4 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-200 border-gray-300 ring-gray-100 focus:border-gray-600 dark:border-gray-600 dark:ring-0 dark:focus:border-white"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-md border-2 px-4 py-3 outline-none placeholder:text-gray-800 focus:ring-4 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-200 border-gray-300 ring-gray-100 focus:border-gray-600 dark:border-gray-600 dark:ring-0 dark:focus:border-white"
              />
            </div>

            <div>
              <textarea
                name="mensaje"
                placeholder="Su mensaje"
                rows={5}
                value={formData.mensaje}
                onChange={handleChange}
                required
                className="h-36 w-full rounded-md border-2 px-4 py-3 outline-none placeholder:text-gray-800 focus:ring-4 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-200 border-gray-300 ring-gray-100 focus:border-gray-600 dark:border-gray-600 dark:ring-0 dark:focus:border-white"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-gray-900 px-7 py-4 font-semibold text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-200 focus:ring-offset-2 dark:bg-white dark:text-black"
            >
              Enviar
            </button>
          </form>

          {status && (
            <div
              className={`mt-5 p-4 text-center ${
                status.includes("✅") ? "bg-green-500" : "bg-red-500"
              } text-white`}
            >
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
