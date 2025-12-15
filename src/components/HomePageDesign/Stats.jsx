import React from 'react';

const Stats = () => {
    return (
     <div className=' flex justify-center py-10 px-4'>
            <div className="stats shadow w-full max-w-6xl  flex flex-col lg:flex-row">
                        
                           
  <div className="stat">
    <div className="stat-figure text-primary">
     
    </div>
    <div className="stat-title text-lg">Total Users</div>
    <div className="stat-value text-blue-300">3.6M</div>
    <div className="stat-desc text-sm">11% more than last month</div>
  </div>

  <div className="stat">
    <div className="stat-figure text-blue-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-8 w-8 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        ></path>
      </svg>
    </div>
    <div className="stat-title text-lg">Member Registered</div>
    <div className="stat-value text-blue-300">2.6M</div>
    <div className="stat-desc text-sm">21% more than last month</div>
  </div>

  <div className="stat">
    <div className="stat-figure text-secondary">
      <div className="avatar avatar-online">
        
      </div>
    </div>
    <div className="stat-title text-lg">Events Registered</div>
    <div className="stat-value  text-blue-300 ">1M</div>
    <div className="stat-desc text-sm">10% more than last month</div>
  </div>
</div>
       </div>
              
    );
};

export default Stats;