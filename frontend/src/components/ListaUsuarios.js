import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListaUsuarios = () => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const getUsuarios = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/usuarios');
        setLista(res.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    getUsuarios();
  }, []);

  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/usuarios/${id}`);
      // Elimina el usuario de la lista sin recargar la página
      setLista(lista.filter((user) => user._id !== id));
      alert('Usuario eliminado correctamente.');
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {lista.map((list) => (
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg rounded-lg p-6"
          key={list._id}
        >
          <div className="border-b pb-2 mb-4">
            <h5 className="text-2xl font-bold">Nombre: {list.nombre}</h5>
          </div>
          <div className="mb-4">
            <p className="text-lg">
              <span className="font-semibold">Apellido:</span> {list.apellido}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Edad:</span> {list.edad}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Teléfono:</span> {list.telefono}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Correo:</span> {list.correo}
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => eliminarUsuario(list._id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out"
            >
              Eliminar
            </button>
            <Link
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out"
              to={`/edit/${list._id}`}
            >
              Editar
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaUsuarios;
