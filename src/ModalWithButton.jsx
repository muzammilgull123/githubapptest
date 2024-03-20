import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalWithButton = ({ onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [repoName, setRepoName] = useState('');
  const [userName, setUserName] = useState('');
  const [chanelId, setChanelId] = useState('');
  const [repoOwnerName, setRepoOwnerName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    resetForm();
  };
  const { oauthToken, userid } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate if all fields are filled
    if (!repoName || !repoOwnerName || !userName || !chanelId) {
      alert('All fields are required');
      return;
    }

    setSubmitted(true);
  };

  const resetForm = () => {
    setRepoName('');
    setRepoOwnerName('');
    setUserName('');
    setChanelId('');
  };

  useEffect(() => {
    if (submitted) {
      const sendRequest = async () => {
        try {
          const response = await axios.post('http://localhost:3000/github/webhookdetail', {
            token: oauthToken,
            userId: userid,
            repoName: repoName,
            repoOwner: repoOwnerName,
            userName: userName,
            chanelId: chanelId
          });

          if (response.status === 200) {
            onSuccess();
          
          } else {
            throw new Error('Failed to submit data');
          }
        } catch (error) {
          console.error('Error:', error.message);
          toast.error('Internal Server Error');
          closeModal();
        }
      };
      sendRequest();
      setSubmitted(false);
    }
  }, [submitted, onSuccess, repoName, repoOwnerName, userName, chanelId, oauthToken, userid]);

  return (

    <div className='flex flex-col items-center justify-center h-full' >
    <div className="w-full h-10 text-white font-bold bg-blue-500 py-2 px-4">
      REGISTER YOURE WEBHOOK 
    </div>
      {/* <button className=" mt-80 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded align-middle" onClick={openModal}>Register Webhook</button> */}
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative bg-white rounded-lg p-8 max-w-md">
              <button className="absolute top-0 right-0 m-4 text-lg" onClick={closeModal}>&times;</button>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="repoName" className="block text-gray-700 text-sm font-bold mb-2">Repository Name:</label>
                  <input type="text" id="repoName" name="repoName" value={repoName} onChange={(e) => setRepoName(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                  <label htmlFor="repoOwnerName" className="block text-gray-700 text-sm font-bold mb-2">Repository Owner Name:</label>
                  <input type="text" id="repoOwnerName" name="repoOwnerName" value={repoOwnerName} onChange={(e) => setRepoOwnerName(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                  <label htmlFor="setUserName" className="block text-gray-700 text-sm font-bold mb-2">User Name:</label>
                  <input type="text" id="setUserName" name="setUserName" value={userName} onChange={(e) => setUserName(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="flex justify-between">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                  {/* <button type="button" onClick={closeModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
  
      )}
      <ToastContainer />
    </div>
  );
};

export default ModalWithButton;
