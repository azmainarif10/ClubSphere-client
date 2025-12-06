import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const MainLayout = () => {
    return (
        <div>
               <div className='flex flex-col min-h-screen'>
                    <Navbar></Navbar>
                <div className='flex-1 '>
                    <Outlet></Outlet>
                    
               
                <Toaster></Toaster>
              
                </div>
               
            </div>
             
        </div>
    );
};

export default MainLayout;