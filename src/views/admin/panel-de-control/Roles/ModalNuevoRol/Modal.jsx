import React, { useEffect } from 'react';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from '../../../../../store/auth';
import NewRol from '../model/NewRol';
import { Loading } from '../../../../components/Loading';
import { useNavigate } from 'react-router-dom';

const Modal = ({ closeModal }) => {
  const [rol, setRol] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState(false);
  const token = useAuthStore(state => state.token);
  const userlogued = useAuthStore(state => state.userlogued);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  
  const handleSubmit = async (event) => {
    setLoading(true)
    event.preventDefault();
    NewRol(rol, descripcion,estado,token,userlogued.sub)
      .then(data => {
        setLoading(false)
        window.location.reload();
      })
      .catch(error => {
        console.error('Error:', error)
      })
    // Aquí puedes enviar los datos por fetch o realizar cualquier otra acción
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-[400px]  relative">
        <FontAwesomeIcon
          icon={faTimes}
          className="absolute top-0 right-0 m-4 cursor-pointer text-gray-500"
          onClick={closeModal}
        />
        <h2 className="text-2xl font-bold mb-4 text-center">Nuevo Rol</h2>
        <form  autoComplete='off' >
          <div className="flex flex-col items-start justify-center w-auto">
            <div className='flex py-3 justify-center items-center w-full'>
              <label htmlFor="tipoDocumento" className="text-left w-full block text-sm font-medium text-gray-700">
                Nombre de Rol
              </label>
              <input
                type="text"
                required
                id="numeroDocumento"
                onChange={(e) => setRol(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none bg-white"
              />
            </div>
            <div className='flex py-3 justify-center items-center w-full'>
              <label htmlFor="numeroDocumento" className="text-left w-full block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <input
                type="text"
                required
                id="numeroDocumento"
                onChange={(e) => setDescripcion(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none bg-white"
              />
            </div>
            <div className="form-check py-4 form-switch pl-0 w-full flex justify-center items-center">
              <label className="form-check-label mr-8"  htmlFor="flexSwitchCheckDefault"> Estado </label>
              <input 
                className="form-check-input !w-10 !ml-0 " 
                type="checkbox" 
                role="switch"
                onChange={(e) => setEstado(e.target.checked)} 
                id="flexSwitchCheckDefault"/>
            </div>
          </div>
          <div className="flex justify-end">
            
            <button type="submit" onSubmit={handleSubmit} className="inline-flex justify-center items-center px-4 py-2 azul-btn rounded-md">
              Guardar
            </button>
          </div>
        </form>
      </div>
      {loading && <Loading/>}
    </div>
  );
};

export default Modal;