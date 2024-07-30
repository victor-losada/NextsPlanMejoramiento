"use client";

import React from 'react';

export default function Page() {
  async function listarVendedores() {
    try {
      const response = await fetch('http://localhost:3000/api/clientes');
      const data = await response.json();
      console.log(data); 
    } catch (error) {
      console.error('Error al listar los vendedores:', error);
    }
  }

  return (
    <div>
      <h1>Listar Vendedores</h1>
      <button onClick={listarVendedores}>Listar </button>
    </div>
  );
}
