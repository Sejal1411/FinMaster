export const dynamic = "force-dynamic";

import React, { Suspense } from 'react';
import { BarLoader } from 'react-spinners';

const DashboardLayout = ({ children }) => {
  return (
    <div className='px-15'>
      <h1 className='text-6xl font-bold text-blue-400 mb-5'>
        Dashboard
      </h1>
      
      {/* Next.js automatically provides the page as children */}
      <Suspense fallback={<BarLoader width="100%" color="#9333ea" />}>
        {children}
      </Suspense>
    </div>
  );
};

export default DashboardLayout;