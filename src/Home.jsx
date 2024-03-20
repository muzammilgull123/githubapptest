import { useEffect, useState } from 'react';
import './App.css';
import { useTable } from 'react-table';

import axios from 'axios';
import { Card } from 'flowbite-react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Navigate, useNavigate, useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';



function Home() {
    const [data,setData]=useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [repoName, setRepoName] = useState('');
    const [userName, setUserName] = useState('');
    const [repoOwnerName, setRepoOwnerName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [selectedrows,setSelectedRows]= useState([])
    const [detailmodal,setDetailModal]=useState(false);
    const [slackopen,setslackopen]=useState(false);

    const [tabledata, setTableData]= useState()
    const[Modal,setOnModal]=useState(false);
    const [nonActiveRepositories, setNonActiveRepositories] = useState([])
    const [NonConnectedRepo,setNonconnectRepo] = useState([]);
    const [selectedRepo, setSelectedRepo] = useState({ name: '', owner: '' });
    const [access_token,setAccesToken]=useState()
    const [table, setTable] = useState([]);
    const [git_account_id,setgitAccountId]=useState([]);
    const [register_webhook_id,setRegisterWebhookID]=useState([]);
    const [user_id,setUserID]=useState([]);
    const [chanelId,setChanelID]=useState([]);
    // const {token } = useParams();
    var id = localStorage.getItem('id');
    var token = localStorage.getItem('token')
    
    console.log('ID:', id);
    console.log('Token:', token);
    

    console.log("id",id);
    const getData = async () => {
    try {
      const response = await axios.post('http://localhost:3000/github/getgithubaccountbyid',{
        id:id,
      },{
        headers: {
            'Authorization': `Bearer ${token}` // Add token to headers
        }
    })
      setData(response.data.data);
      console.log("dataaaaaaaaaaaaa", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

    useEffect(() => {
      getData();
    }, []);
    useEffect(() => {
      const fetchData = async () => {
          try {
              
              const response = await axios.get("http://localhost:3000/slack/getslackaccount", {
                  params: { id: id },
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              });
              console.log("response", response.data);
              setTable(response.data);
          } catch (error) {
              console.log(error);
              toast.error("Error fetching Slack accounts");
          }
      };
      fetchData();
  }, [])
    console.log("data1",data)
    const sendRequest = async () => {
      try {
          const response = await axios.post('http://localhost:3000/slack/chanelid', {
              chanelId: chanelId,
              user_id: user_id,
              git_account_id: git_account_id,
              register_webhook_id: register_webhook_id
          }, {
              headers: {
                  'Authorization': `Bearer ${token}` // Add token to headers
              }
          });
  
          if (response.data.status === 200) {
              // Success, show success message
              console.log("response.data.resp", response)
              toast.success(response.data.resp);
              setOnModal(false);
  
          } else {
              toast.error(response.data.resp)
              // Handle unexpected response status
              throw new Error('Failed to register webhook');
          }
      } catch (error) {
          console.error('Error:', error);
          setOnModal(false);
      }
  };
  
     
   

    const columns = [
      { name: 'ID', selector: row => row.id, sortable: true },
      { name: 'User ID', selector: row => row.user_id, sortable: true },
      { name: 'Access Token', selector: row => row.access_token, sortable: true },
      { name: 'User Name', selector: row => row.user_name, sortable: true },
      { name: 'GitHub User ID', selector: row => row.git_Userid, sortable: true },
      { name: 'Status', selector: row => row.status, sortable: true },
      {
        name: 'ADD Slack CHANNEL',
        selector: (row) => (
          <button   className='text-white font-bold bg-blue-600 h-10 py-2 px-4 rounded-md'
            style={{ backgroundColor: 'blue', color: 'white' }} // Inline styles to make button blue
            onClick={() => handleDetailButton(row.id)}
          >
            Detail
          </button>
        ),
      },
      {
        name: 'ADD weebhook',
        selector: (row) => (
          <button   className='text-white font-bold bg-blue-600 h-10 py-2 px-4 rounded-md'
            style={{ backgroundColor: 'blue', color: 'white' }} // Inline styles to make button blue
            onClick={() => OnModal (row.id,row.git_Userid,row.access_token,row.user_id)}
          >
             NonActive weebhook
          </button>
        ),
      },
    ];
    const columns2 = [
      { name: 'ID', selector: row => row.id, sortable: true, },
      { name: 'git_account_id', selector: row => row.git_account_id, sortable: true, },
      { name: 'RepoName', selector: row => row.repo_name, sortable: true, },
      { name: 'OwnerName', selector: row => row.repo_owner, sortable: true, },
      { name: 'user_id', selector: row => row.user_id, sortable: true, },

      // { name: 'GitHub User ID', selector: row => row.response_json, sortable: true },
      { name: 'Status', selector: row => row.status, sortable: true},
      {
        name: 'Add Slack Channel',
        selector: row => (
          <button 
            className='text-white font-bold bg-blue-600 h-10 py-2 px-4 rounded-md'
            style={{ backgroundColor: 'blue', color: 'white' }}
            onClick={() => handleAddSlackChanel(row.id,row.user_id,row.git_account_id)}
          >
            ADD Slack
          </button>
        ),
        button: true // This property is necessary to render JSX content in the cell
      }
      
    
    ];


    const columns3 =[
      { name: 'NAme', selector: row => row.name, sortable: true, },
      { name: 'owner ', selector: row => row.owner, sortable: true, },
      {
        name: 'Add Slack Channel',
        selector: row => (
          <button 
            className='text-white font-bold bg-blue-600 h-10 py-2 px-4 rounded-md'
            style={{ backgroundColor: 'blue', color: 'white' }}
            onClick={() => handleDetailButton(row.id)}
          >
            ADD Slack
          </button>
        ),
        button: true // This property is necessary to render JSX content in the cell
      }
    ]

  
    const handleDetailButton = async (id) => {
      setSelectedRows(id);
      setDetailModal(true);
      try {
          const response = await axios.get('http://localhost:3000/github/registerdwebhook', {
              params: {
                  id: id
              }
          }, {
            headers: {
                'Authorization': `Bearer ${token}` // Add token to headers
            }
        });
          console.log("response",response.data.data)
          
          setTableData(response.data.data);
          if (response.status === 200) {
             
          } else {
              throw new Error('Failed to submit data');
          }
         
      } catch (error) {
          console.error('Error:', error);
          toast.error("Failed to register Webhook");
      }
  };

  const  handleAddSlackChanel = (id,user_id,git_account_id) =>{
   setgitAccountId(git_account_id);
   setUserID(user_id);
   setRegisterWebhookID(id);
   setIsOpen(true);
   }
    
  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }
  const OnModal = async (id, user_id, access_token, git_Userid) => {
    setOnModal(true);
    console.log("id, user_id, access_token, git_Userid", id, user_id, access_token, git_Userid);
    setAccesToken(access_token);
    try {
      const response = await axios.post("http://localhost:3000/github/getnonactiverepo", {
        id: id,
        user_id: user_id,
        access_token: access_token,
        git_Userid: git_Userid
      }, {
        headers: {
            'Authorization': `Bearer ${token}` // Add token to headers
        }
    });
      const nonActive = response.data; // Assuming the response contains non-active repositories
       await console.log("Non-active repositories:", nonActive.data);
       await setNonActiveRepositories(nonActive.data); // Set the non-active repositories state
       await setNonconnectRepo(nonActive.data)
    } catch (error) {
      console.error("Error fetching non-active repositories:", error);
      // Handle error
    }
  }
  
  
  const  CloseOnModal = () =>{
    setOnModal(false);
  }
  const closedetailmodal = () =>{
    setDetailModal(false)
  }
  const redirecToSlackLogin = () =>{
     try {
     const redirectUrl="http://localhost:3000/slack/login/slack"
     window.location.href = redirectUrl;
     } catch (error) {
      console.log(error)
      
     }

  }
  const handleClick = async (repo) => {
    console.log(`Repository ${repo.name} ${repo.owner} clicked`);
    setRepoName(repo.name);
    setRepoOwnerName(repo.owner);

    console.log("repo.name",repo.name)
    console.log("repo.owner",repo.owner);

    // Attempt to register webhook
    try {
        const response = await axios.post('http://localhost:3000/github/registerwebhook',
            {
                id: id,
                repoName: repoName,
                repoOwner: repoOwnerName,
                access_token: access_token,
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        if (response.status === 200) {
            // Display success toast
            console.log(response.data);
            toast.success('Webhook registered successfully.');
        } else {
            // Display error toast
            toast.error('Failed to register webhook.');
        }
    } catch (error) {
        // Display error toast
        console.error(error);
        toast.error('Failed to register webhook.');
    }

    // Close the modal after selecting the repository
    setOnModal(false);
};


  // const handleSubmit = (e) => {

  //   e.preventDefault();
  //     // Validate if all fields are filled
  //     if (!repoName || !repoOwnerName || !userName ) {
  //       alert('All fields are required');
  //       return;
  //     }
  //   setSubmitted(true);
  // };

  const Logout = () => {
    localStorage.clear();
    window.location.href = "/"; 
}

   const redirecToSlackAccount =()=>{
   const   redrectUrl=`/slackaccount`
   window.location.href = redrectUrl;
   }
  
  
  const redirectToGithubLogin = () => {

    const redirectUrl = `http://localhost:3000/github/login/github?token=${token}&id=${id}`;
    window.location.href = redirectUrl;
  };
  return (
    <div className='min-h-screen'>
    <div className='bg-blue-600 h-10 flex justify-between'>
    <div className="relative h-32 w-32">
        <div className="absolute inset-x-0 top-0 mt-2 ml-2 text-white font-bold"><h1>Home</h1></div>
    </div>
    <div className="flex items-end mt-3 mr-2 text-white font-bold" onClick={Logout}><button>LOG OUT</button></div>
</div>
      {/* <div className=' mt-9 h-2 flex items-start justify-start text-white font-bold' >
        <button className='text-white font-bold bg-blue-600 h-10 py-2 px-4 rounded-md' onClick={redirectToGithubLogin} >
          Log In Github OAth APP
        </button>
       </div> */}
      <div className='fkex items-center jsutify-center'>
     
       <Card > 
       <div  className=' mt-4 h-10 shadow-2xl font-bold flex items-center justify-center' >
        <h1 >REGITERED WEBWOOKS </h1>
        </div>
       </Card>
     
      <div className=' mt-3 shadow-md'>
       
      <div className=' mt-1 h-2 flex items-start justify-start text-white font-bold' >
        <button className='text-white font-bold bg-blue-600 h-10 py-2 px-4 rounded-md' onClick={redirectToGithubLogin} >
          Log In Github OAth APP
        </button>
        <div>
          <button className='text-white font-bold bg-blue-600 h-10 ml-5 rounded-md px-4' onClick={redirecToSlackLogin} > login Slack App  </button>
        </div>
        <div>
          <button className='text-white font-bold bg-blue-600 h-10 ml-5 rounded-md px-4' onClick={redirecToSlackAccount} >  Slack Account  </button>
        </div>
       </div>
      <div className=' mt-9 flex justify-end  '>
        
       {/* <button className='text-white font-bold bg-blue-600 h-10 py-2 px-4 rounded-md' onClick={openModal} >
          ADD WEBHOOk
        </button> */}
       </div>
      <DataTable
      columns={columns}
      data={data}
      selectableRows
      // onSelectedRowsChange={handleChange}
    />

      </div>
     
      </div>
     
      <card> 
      <div className='flex items-center justify-center'>
         {isOpen &&(
         
         <div className="fixed z-10 inset-0 overflow-y-auto">
         <div className="flex items-center justify-center min-h-screen">
           <div className="fixed inset-0 bg-black opacity-50"></div>
           <div className="relative bg-white rounded-lg p-8 max-w-md">
             <button className="absolute top-0 right-0 m-4 text-lg" onClick={closeModal}>&times;</button>
             <form >
               <div className="mb-4">
                 <label htmlFor="repoName" className="block text-gray-700 text-sm font-bold mb-2">:</label>
                 <input type="text" id="chanelId" name="repoName" value={chanelId} onChange={(e) => setChanelID(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
               </div>
               <div>
                <button className='text-white font-bold bg-blue-600 h-10 ml-5 rounded-md px-4' onClick={sendRequest} >SUBMIT</button>
               </div>
              </form>
           </div>
         </div>
       </div>
         )} 

      </div>
      <div className='flex items-center justify-center'>
      <div className='flex items-center justify-center'>
      {Modal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="bg-white rounded-lg p-8 max-w-md z-50">
                            <h2 className="text-xl font-bold mb-4">Non-active Repositories</h2>
                            <ul>
                                {nonActiveRepositories.map((repo, index) => (
                                    <li key={index} className="mb-2">
                                        <strong onClick={() => handleClick(repo)} style={{ cursor: 'pointer' }}>
                                            {repo.name}
                                        </strong>{' '}
                                        - {repo.owner}
                                    </li>
                                ))}
                            </ul>
                            <div>
                                <button
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                                    onClick={() => setOnModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>



      </div>
       {detailmodal&&(
          <div className='flex  align-middle  items-center justify-center w-screen'> 
         
          <div className='w-50'> 
          <div ><button  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={closedetailmodal}>closeTable</button></div>
            <DataTable 
            columns={ columns2 }
            data={tabledata}
            />
          </div>
          </div>
         )
         }
      </card>
      <ToastContainer />

    </div>


  );
}

export default Home;