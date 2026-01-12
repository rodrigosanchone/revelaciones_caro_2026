"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="flex flex-col items-center py-4 space-y-2">
      <div className="text-center text-sm">
        Copyright © {new Date().getFullYear()}
        Derechos reservados
      </div>
      <div className="mt-1 flex justify-center gap-1 text-center text-sm text-gray-500 dark:text-gray-600">
        <span>
          {" "}
          Creado por:
          <a href="https://www.rodricode.com/" rel="noopener" target="_blank">
            rodricode.com
          </a>
        </span>

        <span>&middot;</span>
        <span>
          {" "}
          <a
            href="https://github.com/web3templates/stablo"
            rel="noopener"
            target="_blank"
          ></a>
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="mt-5"></div>
      </div>
    </div>
  );
}
