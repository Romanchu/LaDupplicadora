import React from 'react';
import './Body.css'; // Importamos los estilos del body
import { Link } from 'react-router-dom';

const Body = () => {
  return (
    <main className="body">
      <h1>Bienvenidos a Mayorista de Impresiones</h1>
      <Link to="/personalizacion" className="link-nav">
          <button className="btn-nav">Personalización</button>
      </Link>
    </main>
  );
};

export default Body;

