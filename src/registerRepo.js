import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
function RegisterRepoDetail() {
    const [data,setData]=useState([]);
  useEffect(()=>{
    const getData = async () => {
       try {
        const response = await axios.get('http://localhost:3000/user/registerwebhooks')
        setData(response.data);
        console.log("data",response.data);  
    } catch (error) {
        console.log("error",error);
       }
       };
       getData();
  },[]);
  const columns =[

    {name:'userID',selector:'userId',sortable:true},
    {name:'ChannelID',selector:'chanelID',sortable:true},
    {name:'Repositry Name ',selector:'',sortable:true},
    {name:'userID',selector:'userId',sortable:true},
    {name:'userID',selector:'userId',sortable:true},
  ]
  return (
  <div>
    <h1>hello</h1>
  </div>


  );
}

export default RegisterRepoDetail;