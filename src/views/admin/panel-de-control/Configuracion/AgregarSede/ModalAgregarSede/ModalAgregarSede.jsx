import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { registrarSede } from '../../model/AdministrarSedes';

const AgregarSedeModal = ({ setShowModal, Refresgpag, token, userlogued }) => {
  const [creating, setCreating] = useState(false);
  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');
  const [estado, setEstado] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const showAlert = (title, text, icon) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar"
    }).then((result) => {
      if (result.isConfirmed) {
        setShowModal();
        Refresgpag();
      }
    });
  };

  const handleSaveSede = () => {
    setCreating(true);
    const newSede = { nombre, codigo, estado };
    registrarSede(newSede,token,userlogued)
      .then(() => {
        showAlert('¡Éxito!', 'Se ha asignado una Nueva Empresa', 'success');
      })
      .catch(error => {
        console.error('Error', error);
        showAlert('Error', 'Ha ocurrido un error al crear la sede', 'error');
      })
      .finally(() => {
        setCreating(false);
      });
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full p-4 relative">
        <button onClick={handleCloseModal} className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-800">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">Agregar Sede</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              required
              id="nombre"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">Código</label>
            <input
              type="text"
              required
              maxLength={4}
              id="codigo"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado</label>
            <input
                type="checkbox"
                id="activo"
                checked={estado}
                onChange={(e) => setEstado(e.target.checked)}
                className=" pointer form-checkbox text-blue-500 focus:ring-blue-500 h-6 w-6 bg-white"
                required
              />
          </div>
        </form>
        <div className="flex justify-end mt-4">
          <button
            disabled={creating}
            onClick={handleSaveSede} className="azul-btn text-white font-bold py-2 px-4 rounded">{creating ? 'Creando Sede...' : 'Registrar'}</button>
        </div>
      </div>
    </div>
  );
};

export default AgregarSedeModal;
