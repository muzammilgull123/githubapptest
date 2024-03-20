import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card } from 'flowbite-react';


let inProcess = false;
const GitHubLogin = () => {
    const navigate = useNavigate()
    const { oauthToken, user_name, git_account_id } = useParams();
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    const storeAccssToken = async () => {
        try {
            inProcess = true
            await axios.post('http://localhost:3000/github/accestoken', {
                id: id,
                access_token: oauthToken,
                git_account_id: git_account_id,
                user_name: user_name
            }, {
                headers: {
                    'Authorization': `Bearer ${token}` // Add token to headers
                }
            }).then(() => {
                toast.success("Access token stored successfully");
                navigate("/home")
            })
        } catch (error) {
            console.error('Error storing access token:', error);
            // Handle error or show toast message
            toast.error('Failed to store access token');
        }
    }

    useEffect(() => {
        console.log("git access token storing...");
        console.log("id", id)
        console.log("oauth", oauthToken)
        if(!inProcess) {
            storeAccssToken();
        }
    }, [])



    return (
        <div className='min-h-screen'>
            <div className='flex item-center justify-center' >
                <Card>
                    <h1> GITHUB LOGIN succesfull </h1>
                </Card>
            </div>
        </div>
    );
};

export default GitHubLogin;
