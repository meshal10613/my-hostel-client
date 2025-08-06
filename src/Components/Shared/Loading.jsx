import Lottie from 'lottie-react';
import React from 'react';
import LoadingAnime from '../../assets/animation/loading.json';

const Loading = () => {
    return (
        <Lottie animationData={LoadingAnime} className='w-20 mx-auto'/>
    );
};

export default Loading;