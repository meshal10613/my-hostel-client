import React from 'react';
import { Helmet } from 'react-helmet';
import useAuthContext from '../../Hooks/useAuthContext';
import Loading from '../../Components/Shared/Loading';
import { FaUserEdit } from 'react-icons/fa';
import { Link } from 'react-router';

const MyProfile = () => {
    const { user } = useAuthContext();
    if(!user){
        return <Loading/>;
    };
    return (
        <div>
            <Helmet>
                <title>Dashboard | My Profile</title>
                <meta name="description" content="User dashboard my profile page" />
            </Helmet>
            <div className='m-5 flex items-center justify-between'>
                <div>
                    <h2 className='text-2xl font-bold'>My Profile</h2>
                    <p>Edit your profile settings</p>
                </div>
                <div className='flex items-center gap-1'>
                    <p className='text-base font-semibold'>{user?.displayName}</p>
                    <img src={user?.photoURL} alt={user?.displayName} className='w-8 h-8 rounded-full' />
                </div>
            </div>
            <div className='bg-base-200 m-2 lg:m-5 p-5 rounded-2xl flex flex-col items-center justify-between gap-5 max-w-2xl'>
                <div>
                    <img src={user?.photoURL} alt="" className='w-20 h-20 rounded-full' />
                </div>
                <div className='flex items-center gap-5'>
                    <div>
                        <h2 className='text-2xl font-semibold'>{user?.displayName}</h2>
                        <h3>{user?.email}</h3>
                    </div>
                    <Link to="/dashboard/edit-profile" className='w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white tooltip tooltip-bottom' data-tip="Edit Profile">
                        <FaUserEdit className='' />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;