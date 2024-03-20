import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogInUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const { id } = useParams(); 
     

  const isValidEmail = (email) => {
    // Regular expression for validating email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate if all fields are filled
    if (!email || !password) {
      toast('All fields are required');
      return;
    }
    if (!isValidEmail(email)) {
      toast('Invalid email format');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/user/login', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        const id = response.data.id;
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
        navigate(`/home`);
      } else {
        throw new Error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error:', error.message);
      if (error.response && error.response.status === 401) {
        // Unauthorized user
        toast.error('Unauthorized: Invalid email or password');
      } else {
        // Other errors
        toast.error('Internal Server Error');
      }
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <div className="w-full h-10 text-white font-bold bg-blue-500 py-2 px-4">
        USER LOG IN
      </div>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg p-8 max-w-md">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="setEmail" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                <input type="text" id="setEmail" name="setEmail" value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-6">
                <label htmlFor="setpassword" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input type="password" id="setpassword" name="setpassword" value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                <Link to="/signuppage" className="text-blue-500 hover:text-blue-700 font-bold py-2 px-4">Register User</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LogInUser;
