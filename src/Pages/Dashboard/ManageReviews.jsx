import React from 'react';
import { Helmet } from 'react-helmet';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Shared/Loading';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async() => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    });
    return (
        <>
            <Helmet>
                <title>Dashboard | Manage Users</title>
            </Helmet>
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">All Users</h2>
                <div>
                    {
                        isLoading && <Loading/>
                    }
                </div>

                {/* Search box */}
                {/* <div className="form-control mb-4 w-full max-w-sm">
                    <input
                    type="text"
                    placeholder="Search by username or email"
                    className="input input-bordered w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                </div> */}

                {/* Users table */}
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-base-200">
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Subscription</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                            users.map((user, idx) => (
                                <tr key={user.id}>
                                <td>{idx + 1}</td>
                                <td>{user?.displayName}</td>
                                <td>{user?.email}</td>
                                <td>
                                    {user.role === "admin" ? (
                                    <span className="btn bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white border-none">Admin</span>
                                    ) : (
                                    <button
                                        // onClick={() => handleMakeAdmin(user._id)}
                                        className="btn bg-white text-primary border-none"
                                        // disabled={makeAdminMutation.isLoading}
                                    >
                                        Make Admin
                                    </button>
                                    )}
                                </td>
                                <td>{user?.badge}</td>
                                </tr>
                            ))
                            ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                No users found
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ManageUsers;