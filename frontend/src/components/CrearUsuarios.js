import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CrearUsuarios = () => {
  const valorInicial = {
    nombre: '',
    apellido: '',
    edad: 18,
    telefono: '',
    correo: '',
  };

  let { id } = useParams();
  const [usuario, setUsuario] = useState(valorInicial);

  // Función para manejar el cambio en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
  };

  const GuardarDatos = async (e) => {
    e.preventDefault();
    const newUser = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      edad: usuario.edad,
      telefono: usuario.telefono,
      correo: usuario.correo,
    };

    try {
      if (id) {
        await axios.put(`http://localhost:4000/api/usuarios/${id}`, newUser);
        alert('Usuario actualizado correctamente.');
      } else {
        await axios.post('http://localhost:4000/api/usuarios', newUser);
        alert('Usuario creado correctamente.');
      }
      setUsuario({ ...valorInicial });
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };

  const obtUno = async (valorId) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/usuarios/${valorId}`
      );
      setUsuario({
        nombre: res.data.nombre,
        apellido: res.data.apellido,
        telefono: res.data.telefono,
        edad: res.data.edad,
        correo: res.data.correo,
      });
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };

  useEffect(() => {
    if (id) {
      obtUno(id);
    }
  }, [id]);

  return (
    <div>
      <form className="max-w-sm mx-auto" onSubmit={GuardarDatos}>
        <div className="mb-3">
          <label
            htmlFor="nombre"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="apellido"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Apellido
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={usuario.apellido}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="edad"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Edad
          </label>
          <input
            type="number"
            id="edad"
            name="edad"
            value={usuario.edad}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="telefono"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Teléfono
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={usuario.telefono}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="correo"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Correo
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={usuario.correo}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          {id ? 'Actualizar' : 'Guardar'}
        </button>
      </form>
    </div>
  );
};

export default CrearUsuarios;
