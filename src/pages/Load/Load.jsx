import React from 'react';
import Lottie from "lottie-react";
import Loading from "../../Utils/Loading.json";

const Load = () => {
    return (
        <div>
            <div className='flex min-h-screen justify-center items-center'>
                 <Lottie animationData={Loading} loop={true} />;
            </div>
        </div>
    );
};

export default Load;