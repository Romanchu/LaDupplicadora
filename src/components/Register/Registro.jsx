import React, { useState } from 'react';
import './Registro.css';
import ReCAPTCHA from 'react-google-recaptcha'; // Importamos reCAPTCHA

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [captchaValue, setCaptchaValue] = useState(null); // Estado para almacenar el valor del captcha

  // Maneja los cambios en los inputs del formulario
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!captchaValue) {
      alert('Por favor completa el captcha.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form, captchaValue }), // Enviamos los datos junto al valor del captcha
      });

      if (response.ok) {
        alert('Usuario registrado exitosamente');
      } else {
        alert('Error en el registro');
      }
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
      alert('Error en la conexión con el servidor');
    }
  };

  // Maneja el cambio en el captcha
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value); // Guardamos el valor del captcha cuando se resuelve
  };

  return (
    <div className="registro-container">
      <h2>Registro de Usuarios</h2>
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Nombre de usuario"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="campo">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="campo">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Componente reCAPTCHA */}
        <div className="captcha-container">
          <ReCAPTCHA
            sitekey="6Lfw51YqAAAAACpkSTnma9X1ZR2gUtTMhFKq1Vdm" // Sustituye con tu clave de sitio
            onChange={handleCaptchaChange}
          />
        </div>

        <button type="submit" className="boton2">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
