

import './App.css';

function Home() {
  const redirectToGithubLogin = () => {
    
    window.location.href = 'http://localhost:3000/login/github'; 
  };

  return (
    <div className='min-h-screen'>
  <div className=' bg-blue-600 h-10 '>
    <div className="relative h-32 w-32 ... ">
  <div className="absolute inset-x-0 top-0  mt-2 ml-2	font-weight: 900 "><h1>Git Oath App</h1></div>
 
</div>
   
    </div>
    <div className='h-screen flex items-center justify-center' > 
    <button className=' bg-blue-600 h-10 py-2 px-4 rounded-md' onClick={redirectToGithubLogin} >
        Log In Github OAth APP
    </button>
      </div>
    </div>
  
 
  );
}

export default Home;