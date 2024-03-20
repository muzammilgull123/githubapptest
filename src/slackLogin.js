import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card } from 'flowbite-react';


let inProcess = false;
const SlackLogin = () => {
    const navigate = useNavigate()
    const { access_token,team,app_id } = useParams();
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    const storeAccssToken = async () => {
        try {
            inProcess = true ;
            await axios.post('http://localhost:3000/slack/accesstoken', {
                id: id,
                access_token: access_token,
                team: JSON.stringify(team),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(() => {
                toast.success("Access token stored successfully");
                navigate("/home");
            });
        } catch (error) {
            console.error('Error storing access token:', error);
            toast.error('Failed to store access token');
        }
    }

    useEffect(() => {
        console.log("git access token storing...");
        console.log("id", id)
        console.log("oauth", access_token)
        if(!inProcess) {
            storeAccssToken();
        }
    }, [])



    return (
        <div className='h-screen'>
            <div className='flex item-center justify-center' >
                <Card>
                    <h1> Login to slack........ </h1>
                </Card>
            </div>
        </div>
    )
};

export default SlackLogin;
