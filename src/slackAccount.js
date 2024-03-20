import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Card } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

// Define columns outside the component
const columns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'User ID', selector: row => row.user_id, sortable: true },
    { name: 'Connection Type', selector: row => row.connection_type, sortable: true },
    { name: 'Access Token', selector: row => row.access_token, sortable: true },
    { name: 'Status', selector: row => row.status, sortable: true },
    { name: 'Created At', selector: row => row.created_at, sortable: true },
    { name: 'Updated At', selector: row => row.updated_at, sortable: true }
];

const SlackAccountTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = localStorage.getItem('id');
                const token = localStorage.getItem('token');
                const response = await axios.get("http://localhost:3000/slack/getslackaccount", {
                    params: { id: id },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("response", response.data);
                setData(response.data.data);
            } catch (error) {
                console.error(error);
                toast.error("Error fetching Slack accounts");
            }
        };
        fetchData();
    }, []);

    const redirectToHome = () => {
        // Use Navigate inside the functional component
       window.location.href="/home"
    };

    return (
        <div>
               <div className=' bg-blue-600 h-10 '>
        <div className="relative h-32 w-32 ... ">
          <div className="absolute inset-x-0 top-0  mt-2 ml-2	 font-bold "></div>
          {/* <div className="absolute inset-x-0 top-0  mt-2 ml-2	text-white font-bold  " onClick={Logout}><h1> logout  </h1></div> */}
          </div>

      </div>
            <div className='mt-2 h-15'>
                <Card>
                    <div className='flex items-center justify-center  font-bold '> 
                    <h1>Slack Connected Account</h1>
                    </div>
                   
                </Card>
            </div>
            <div className='mt-2'>
                <Button className='text-white font-bold bg-blue-600 h-10 py-2 px-4 rounded-md' onClick={redirectToHome}> Back To Home </Button>
            </div>
           
                <div>
                    <DataTable
                        columns={columns}
                        data={data}
                    />
                </div>
           
        </div>
    );
};

export default SlackAccountTable;
