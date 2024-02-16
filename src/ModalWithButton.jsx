import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const ModalWithButton = ({ onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [repoName, setRepoName] = useState('');
  const [repoOwnerName, setRepoOwnerName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const {oauthToken}=useParams();
  console.log(oauthToken)
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true); // Set submitted to true to trigger the effect
  };

  useEffect(() => {
    if (submitted) {
      const sendRequest = async () => {
        try {
          const response = await axios.post('http://localhost:3000/webhookdetail', {
            token: oauthToken,
            repoName: repoName,
            repoOwner: repoOwnerName,
          });
          console.log("response",response)
          if (response.status === 200) {
            console.log("Repository Name:", repoName);
            console.log("Repository Owner Name:", repoOwnerName);
            setRepoName('');
            setRepoOwnerName('');
            setIsOpen(false)
             onSuccess(); // Call the onSuccess callback passed from the parent component
          } else {
            throw new Error('Failed to submit data');
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      };
      sendRequest();
      setSubmitted(false); // Reset submitted state after sending the request
    }
  }, [submitted, onSuccess, repoName, repoOwnerName,oauthToken, closeModal]);

  return (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={openModal}>Open Modal</button>
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
                <div className="flex justify-between">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                  <button type="button" onClick={closeModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalWithButton;
