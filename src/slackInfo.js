// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';


// const SlackChaneld= ({ onSuccess }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [chanelld, setChanelId] = useState('');
//   const [userName, setUsername] = useState('');
//   const [submitted, setSubmitted] = useState(false);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);
//   const {oauthToken,userid}=useParams();
//   console.log(oauthToken,userid)
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setSubmitted(true); // Set submitted to true to trigger the effect
//   };

//   useEffect(() => {
//     if (submitted) {
//       const sendRequest = async () => {
//         try {
//           const response = await axios.post('http://localhost:3000/webhookdetail', {
//             token: oauthToken,
//             userid:userid,
//             userName: userName,
//             chanelld: chanelld,
//           });
//           console.log("response",response)
//           if (response.status === 200) {
//             console.log("Repository Name:",oauthToken);
//             console.log("Repository OwnerName:", userName);
//             console.log("Repository userid:", userid);

//             setChanelId('');
//             setUsername('');
//             setIsOpen(false)
//              onSuccess(); // Call the onSuccess callback passed from the parent component
//              res.redirect()
//           } else {
//             throw new Error('Failed to submit data');
//           }
//         } catch (error) {
//           console.error('Error:', error.message);
//         }
//       };
//       sendRequest();
//       setSubmitted(false); // Reset submitted state after sending the request
//     }
//   }, [submitted, chanelld ,onSuccess, chanelld , userid, userName,oauthToken, closeModal]);

//   return (
//     <div>
//       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={openModal}>Add Slack Chanel</button>
//       {isOpen && (
//         <div className="fixed z-10 inset-0 overflow-y-auto">
//           <div className="flex items-center justify-center min-h-screen">
//             <div className="fixed inset-0 bg-black opacity-50"></div>
//             <div className="relative bg-white rounded-lg p-8 max-w-md">
//               <button className="absolute top-0 right-0 m-4 text-lg" onClick={closeModal}>&times;</button>
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                   <label htmlFor="chanel ld" className="block text-gray-700 text-sm font-bold mb-2">chanel ld:</label>
//                   <input type="text" id="chanelld" name="chanelld" value={chanelld} onChange={(e) => setChanelId(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 </div>
//                 <div className="mb-6">
//                   <label htmlFor="userName" className="block text-gray-700 text-sm font-bold mb-2"> user Name:</label>
//                   <input type="text" id="userName" name="userName" value={userName} onChange={(e) =>setUsername(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 </div>
//                 <div className="flex justify-between">
//                   <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
//                   <button type="button" onClick={closeModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SlackChaneld;
