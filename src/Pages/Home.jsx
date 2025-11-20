import React from 'react';
import Banner from '../Components/Banner';
import HowItWorks from '../Components/HowItWorks';
import ProceedToPower from '../Components/ProceedToPower';
import MealsCategory from '../Components/MealsCategory';
import PremiumPackages from '../Components/PremiumPackages';

const Home = () => {
    return (
        <div>
            <Banner/>
            <MealsCategory/>
            <ProceedToPower/>
            <PremiumPackages/>
            <HowItWorks/>
            {/* <Instal/> */}
        </div>
    );
};

export default Home;

//className='px-0 2xl:px-[7%]'