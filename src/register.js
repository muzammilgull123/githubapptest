import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterUser = ({ onSuccess }) => {
//   const [isOpen, setIsOpen] = useState(false);
const id = localStorage.getItem('id');
  const [name, setName] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate()

//   const openModal = () => setIsOpen(true);
  const closeModal = () => {
    navigate("/");
  };
  const { oauthToken, userid } = useParams();

  const isValidEmail = (email) => {
    // Regular expression for validating email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate if all fields are filled
    if (!name || !lastname || !email || !password) {
      toast('All fields are required');
      return;
    }
    if (!isValidEmail(email)) {
      toast('Invalid email format');
      return;
    }
    setSubmitted(true);
  };

  const resetForm = () => {
    setName('');
    setlastname('');
    setEmail('');
    setpassword('');
  };

  useEffect(() => {
    if (submitted) {
      const sendRequest = async () => {

        if (!name || !lastname || !email || !password) {
          alert('All fields are required');
          return;
        }
        try {
          const response = await axios.post('http://localhost:3000/user/signup', {
            name:name,
            lastname:lastname,
             email:email,
              password:password,
              
          
            });
            if (response.status === 200) {
              const token = response.data.token;
              const id = response.data.id;
              localStorage.setItem('token', token);
              localStorage.setItem('id', id);
              console.log("id", id);
              console.log("token", token);
              navigate(`/home`);
            } else {
              throw new Error('Failed to submit data');
            }
          } catch (error) {
            console.error('Error:', error.message);
            toast.error('Internal Server Error');
          }
      };
      sendRequest();
      setSubmitted(false);
    }
  }, [submitted,name,password, lastname,email,onSuccess,]);

  return (

    <div className='flex flex-col items-center justify-center h-full' >
    <div className="w-full h-10 text-white font-bold bg-blue-500 py-2 px-4">
      USER REGISTERATION
    </div>
      
     
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative bg-white rounded-lg p-8 max-w-md">
              <button className="absolute top-0 right-0 m-4 text-lg" onClick={closeModal}>&times;</button>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="setName" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                  <input type="text" id="setName" name="setName" value={name} onChange={(e) => setName(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                  <label htmlFor="setlastname" className="block text-gray-700 text-sm font-bold mb-2">LastName:</label>
                  <input type="text" id="setlastname" name="setlastname" value={lastname} onChange={(e) => setlastname(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                  <label htmlFor="setEmail" className="block text-gray-700 text-sm font-bold mb-2">email:</label>
                  <input type="text" id="setEmail" name="setEmail" value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                  <label htmlFor="setpassword" className="block text-gray-700 text-sm font-bold mb-2"> Password</label>
                  <input type="text" id="setpassword" name="setpassword" value={password} onChange={(e) => setpassword(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="flex justify-between">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                  <button type="button" onClick={closeModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
  

      <ToastContainer />
    </div>
  );
};

export default RegisterUser;
