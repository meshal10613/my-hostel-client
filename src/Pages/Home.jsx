import React from 'react';
import Banner from '../Components/Banner';
import HowItWorks from '../Components/HowItWorks';
import ProceedToPower from '../Components/ProceedToPower';
import Instal from '../Components/Instal';
import Footer from '../Components/Shared/Footer';
import Membership from '../Components/Membership';

const Home = () => {
    return (
        <div>
            <Banner/>
            <ProceedToPower/>
            <HowItWorks/>
            <Membership/>
            {/* <Instal/> */}
        </div>
    );
};

export default Home;

//className='px-0 2xl:px-[7%]'