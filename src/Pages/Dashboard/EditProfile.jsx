import React from 'react';
import useAuthContext from '../../Hooks/useAuthContext';
import Loading from '../../Components/Shared/Loading';
import { Link } from 'react-router';
import { TiArrowBackOutline } from 'react-icons/ti';

const EditProfile = () => {
    const { user } = useAuthContext();
    if(!user){
        return <Loading/>;
    };
    
    const handleEditProfile = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log(data)
    }
    
    return (
    <div className="card w-96 bg-base-100 rounded-2xl shadow-xl mx-auto mt-10 relative">
        <Link to="/dashboard/my-profile" className='btn bg-base-100 border-none w-fit abosolute top-0 left-0 text-primary'>
            <TiArrowBackOutline size={25} />
        </Link>
        <p 
            className={`absolute top-0 right-0 ${user?.emailVerified ? "bg-green-500" : "bg-red-500"} text-white rounded-tr-2xl p-1`}
            >
            {user?.emailVerified ? "Verified" : "Not Verified"}
        </p>
        <figure className="px-10 pt-10">
            <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="rounded-full w-24 h-24 object-cover"
            />
        </figure>
        <form onSubmit={handleEditProfile} className="card-body items-center text-center">
            {/* Editable Name */}
            <div className='w-full flex flex-col items-baseline gap-2'>
                <label className="text-base">Name</label>
                <input
                    type="text"
                    name='displayName'
                    value={user?.displayName}
                    onChange={(e) => (e.target.displayName = e.target.value)}
                    className="input input-bordered w-full"
                    placeholder='Enter Your Name'
                />
            </div>

            {/* Email */}
            <div className='w-full flex flex-col items-baseline gap-2'>
                <label className='text-base'>Email</label>
                <input
                    type="email"
                    name='email'
                    value={user?.email}
                    onChange={(e) => (e.target.email = e.target.value)}
                    className="input input-bordered w-full"
                    placeholder='Enter Your Email'
                    readOnly
                />
            </div>

            {/* photoURL */}
            <div className='w-full flex flex-col items-baseline gap-2'>
                <label className='text-base'>Photo URL</label>
                <input
                    type='file'
                    name='photoURL'
                    onChange={(e) => (e.target.photoURL = e.target.value)}
                    className="file-input input-bordered w-full"
                />
            </div>

            {/* Phone */}
            <div className='w-full flex flex-col items-baseline gap-2'>
                <label className='text-base'>Phone Number</label>
                <input
                    type="tel"
                    name='phoneNumber'
                    value={user?.phoneNumber}
                    onChange={(e) => (e.target.phoneNumber = e.target.value)}
                    className="input input-bordered w-full"
                    placeholder='Enter Your Phone Number'
                />
            </div>

            {/* <p className='flex items-baseline justify-baseline text-[#FF8A00]'>Verify Now</p> */}

            {/* Update Button */}
            <button type='submit' className="btn btn-block bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white mt-2">
                Update
            </button>
        </form>
    </div>
    );
};

export default EditProfile;