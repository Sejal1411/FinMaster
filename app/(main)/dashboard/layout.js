import React, { Suspense } from 'react'
import { BarLoader } from 'react-spinners';
import DashboardPage from './page';

const DashboardLayout = () => {
  return <div className='px-15'>
    <h1 className='text-6xl font-bold text-blue-400 mb-5'>
        Dashboard
    </h1>

     {/* Dashboard Page */}
    <Suspense 
       fallback={<BarLoader className='' width={"100%"} color='#9333ea' />}
    >
        <DashboardPage />
    </Suspense>
    </div>;
};

export default DashboardLayout
