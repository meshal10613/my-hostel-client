import React from 'react';
import { Helmet } from 'react-helmet';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Shared/Loading';
import useAuthContext from '../../Hooks/useAuthContext';

const MyReviews = () => {
    const { user } = useAuthContext();
    const axiosSecure = useAxiosSecure();
    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ["reviews"],
        queryFn: async() => {
            const res = await axiosSecure.get(`/reviews/${user.email}`);
            return res.data;
        }
    });

    if (isLoading || !user) {
        return <Loading />;
    };

    const handleEdit = (id) => {
        alert(`Edit review with id: ${id}`);
    };

    const handleDelete = (id) => {
        alert(`Delete review with id: ${id}`);
    };

    const handleViewMeal = (id) => {
        alert(`View meal details with id: ${id}`);
    };

    console.log(reviews)
    return (
        <>
            <Helmet>
                <title>Dashboard | My Reviews</title>
            </Helmet>
            <div className="overflow-x-auto p-4">
                <table className="table table-zebra w-full">
                    <thead>
                    <tr>
                        <th>Meal Title</th>
                        <th>Likes</th>
                        <th>Review</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>View Meal</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reviews.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No reviews found.
                            </td>
                        </tr>
                    ) : (
                        reviews.map(({ id, mealTitle, rating, review }) => (
                        <tr key={id}>
                            <td>{mealTitle}</td>
                            <td>{rating}</td>
                            <td>{review}</td>
                            <td>
                            <button
                                className="btn btn-sm btn-info"
                                onClick={() => handleEdit(id)}
                            >
                                Edit
                            </button>
                            </td>
                            <td>
                            <button
                                className="btn btn-sm btn-error"
                                onClick={() => handleDelete(id)}
                            >
                                Delete
                            </button>
                            </td>
                            <td>
                            <button
                                className="btn btn-sm btn-success"
                                onClick={() => handleViewMeal(id)}
                            >
                                View
                            </button>
                            </td>
                        </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MyReviews;