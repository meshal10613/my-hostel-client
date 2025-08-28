import React from 'react';
import { Helmet } from 'react-helmet';

const MyProfile = () => {
    return (
        <div>
            <Helmet>
                <title>Dashboard | My Profile</title>
                <meta name="description" content="User dashboard my profile page" />
            </Helmet>
        </div>
    );
};

export default MyProfile;