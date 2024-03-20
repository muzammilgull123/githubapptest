import './App.css';
function SlackLoginButton() {
  const redirectSlacLogin = () => {

    window.location.href = 'http://localhost:3000/slack/login/slack';
  };
  return (
    <div className='min-h-screen'>
      <div className=' bg-blue-600 h-10 '>
        <div className="relative h-32 w-32 ... ">
          <div className="absolute inset-x-0 top-0  mt-2 ml-2	text-white font-bold w-full "><h1>SLACK APP</h1></div>
          </div>
 
      </div>
      <div className='h-screen flex items-center justify-center' >
        <button className='text-white font-bold bg-blue-600 h-10 py-2 px-4 rounded-md' onClick={redirectSlacLogin} >
          login With Slack App
        </button>
      </div>
    </div>


  );
}




export default SlackLoginButton;