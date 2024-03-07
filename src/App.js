import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
// import Home from './Home'
// import ModalWithButton from "./ModalWithButton";
const Home = lazy(()=>import ('./Home'))
const ModalWithButton = lazy(()=>import('./ModalWithButton'))
// const SlackChaneld = lazy(()=>import('./slackInfo'))

function App() {
  return (
    <Routes>
      <Route path="/"  element={<Home/>} />
      <Route path="/thankyou/:oauthToken/:userName/:userid" element={<ModalWithButton/>} />
    {/* kam q nahi horrhas  */}
   {/* done challaa ga ab  */}
   {/* slack token undefinde arrha hain  */}
   {/* slack checking  */}
 {/* keflwmfel,wnkrwnkwnflewm */}
 {/* lfeqnjrwghjwvfjeqkfnf */}
 {/* lrwgkrwnjrwnjgrb */}
    </Routes>
  );
}


export default App;


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   const redirectToGithubLogin = () => {
    
//     window.location.href = 'http://localhost:3000/login/github'; 
//   };

//   return (
//     <div className='min-h-screen'>
//   <div className=' bg-blue-600 h-10 '>
//     <div class="relative h-32 w-32 ... ">
//   <div class="absolute inset-x-0 top-0  mt-2 ml-2	font-weight: 900 "><h1>Git Oath App</h1></div>
 
// </div>
   
//     </div>
//     <div className='h-screen flex items-center justify-center' > 
//     <button className=' bg-blue-600 h-10 py-2 px-4 rounded-md' onClick={redirectToGithubLogin} >
//         Log In Github OAth APP
//     </button>
//       </div>
//     </div>
  
 
//   );
// }

// export default App;
