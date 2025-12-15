import React from 'react';

const Works = () => {
 
 const steps = [
  {
    title: "Create an Account",
    description:
      "Sign up as a member or club manager. Complete your profile to get started with clubs and events.",
    iconClasses:
      "bg-blue-50 border-blue-200 after:bg-green-500 before:bg-blue-500",
  },
  {
    title: "Explore Clubs & Events",
    description:
      "Browse clubs by category, location, and interests. Discover upcoming events that match your passion.",
    iconClasses:
      "bg-blue-50 border-blue-200 after:bg-green-500 before:bg-blue-500",
  },
  {
    title: "Join Clubs & Register Events",
    description:
      "Become a club member, pay membership fees, and register for exciting events with a single click.",
    iconClasses:
      "bg-blue-50 border-blue-200 after:bg-green-500 before:bg-blue-500",
  },
  {
    title: "Engage & Grow Together",
    description:
      "Participate in events, connect with members, and grow your community through shared experiences.",
    iconClasses:
      "bg-blue-50 border-blue-200 text-violet-300 flex items-center justify-center text-4xl font-bold",
    isFinal: true,
  },
];


  return (
         <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
            
            <div className="text-center mb-16">
                <div className="w-12 h-1 bg-blue-300 mx-auto mb-4"></div>
                <h2 className="text-4xl font-bold text-blue-300 mb-4">How It Works</h2>
                 <p className="text-lg text-gray-800 max-w-2xl mx-auto">
  Discover, join, and manage clubs effortlessly. Our simple process helps you connect with communities, participate in events, and grow together.
</p>

            </div>

            
            <div className="relative mx-auto flex justify-between lg:justify-center flex-col lg:flex-row">
                
            
                <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 border-t border-dashed border-blue-300 z-0">
                    <div className="absolute top-1/2 -mt-1.5 left-[23.5%] w-3 h-3 rounded-full bg-blue-300"></div>
                    <div className="absolute top-1/2 -mt-1.5 left-[48.5%] w-3 h-3 rounded-full bg-blue-300"></div>
                    <div className="absolute top-1/2 -mt-1.5 left-[73.5%] w-3 h-3 rounded-full bg-blue-300"></div>
                </div>

                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center p-4 lg:p-0 relative z-10 w-full lg:w-1/4 mb-10 lg:mb-0"
                    >
                        
                        
                        <div
                            className={`
                                w-full max-w-[200px] h-32 rounded-lg shadow-xl mb-6
                                flex items-start p-4
                                relative
                                border 
                                ${step.iconClasses}
                                
                                ${step.isFinal ? 'shadow-blue-100' : 'shadow-blue-100'}
                            `}
                            style={{
                                background: step.isFinal 
                                    ? 'linear-gradient(135deg, #e0f2f7, #c6e4ec)' 
                                    : 'linear-gradient(135deg, #e0f2f7, #c6e4ec)',
                            }}
                        >
                        
                            {!step.isFinal ? (
                                <>
                                    <div className="absolute top-4 left-4 w-4/5 h-2 bg-blue-400 rounded-sm"></div>
                                    <div className="absolute top-8 left-4 w-3/5 h-1.5 bg-white rounded-sm"></div>
                                    <div className="absolute top-11 left-4 w-2/3 h-1.5 bg-violet-200 rounded-sm"></div>
                                </>
                            ) : (
                                <span className="text-6xl text-blue-400">✓</span>
                            )}
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {step.title}
                        </h3>
                        <p className="text-gray-600 max-w-xs">{step.description}</p>
                        
                    
                        {index < steps.length - 1 && (
                            <div className="lg:hidden absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 h-10 w-0.5 border-l border-dashed border-blue-300"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
 </section>
  );
};

    

export default Works;