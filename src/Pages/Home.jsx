import React from 'react';
import Banner from '../Components/Banner';
import HowItWorks from '../Components/HowItWorks';
import ProceedToPower from '../Components/ProceedToPower';
import Instal from '../Components/Instal';

const Home = () => {
    return (
        <div>
            <Banner/>
            <HowItWorks/>
            <ProceedToPower/>
            <Instal/>
        </div>
    );
};

export default Home;

//className='px-0 2xl:px-[7%]'