import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../../Components/Shared/Loading';
import { Link } from 'react-router';
import { FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllMeals = () => {
    const queryClient = useQueryClient();
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { data: allMeals = [], isLoading } = useQuery({
        queryKey: ["allMeals"],
        queryFn: async() => {
            const res = await axiosSecure.get(`/meals`);
            return res.data;
        }
    });
    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.delete(`/meals/${id}`);
            return id;
        },
            onSuccess: () => {
            // invalidate & refetch
            queryClient.invalidateQueries({ queryKey: ["allMeals"] });
        },
    });

    const handleView = (meal) => {
        setSelectedMeal(meal);
        setIsViewOpen(true);
    };

    const handleCloseView = () => {
        setSelectedMeal(null);
        setIsViewOpen(false);
    };

    const handleUpdate = (id) => {
        // navigate to edit page — change this to use your router (react-router / next/router)
        // Example with react-router:
        // navigate(`/meals/edit/${id}`);
        window.location.href = `/meals/edit/${id}`;
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will delete this meal!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FFAE00",
            cancelButtonColor: "red",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Call your delete mutation here
                deleteMutation.mutate(id, {
                    onSuccess: () => {
                        Swal.fire({
                                title: "Congratulations!",
                                text: "You have deleted the meal",
                                icon: "success",
                                confirmButtonColor: "#FFAE00"
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong while deleting.",
                            icon: "error",
                            confirmButtonColor: "#FFAE00"
                        });
                    }
                });
            }
        });
    };
    return (
        <>
            <Helmet>
                <title>Dashboard | All Meals</title>
            </Helmet>
            <div className=''>
                {
                    isLoading && <Loading/>
                }
                {/* Desktop / large screen table */}
                <div className="hidden md:block bg-base-100 shadow rounded-md overflow-x-auto">
                    <table className="table table-compact w-full">
                    {/* head */}
                    <thead>
                        <tr>
                        <th>Meal</th>
                        <th>Likes</th>
                        <th>Reviews</th>
                        <th>Rating</th>
                        <th>Distributor</th>
                        <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allMeals.length === 0 && (
                        <tr>
                            <td colSpan={6} className="text-center py-6">
                            No meals found.
                            </td>
                        </tr>
                        )}

                        {allMeals.map((meal) => (
                        <tr key={meal.id} className="hover">
                            <td className="flex items-center gap-3">
                            <div className="avatar">
                                <div className="w-14 h-14 rounded-md overflow-hidden">
                                <img
                                    src={meal.image || "https://via.placeholder.com/160"}
                                    alt={meal.title}
                                    className="object-cover w-full h-full"
                                />
                                </div>
                            </div>
                            <div>
                                <div className="font-semibold">{meal.title}</div>
                                <div className="text-xs text-gray-500 line-clamp-2 w-64">
                                {meal.description || "No description"}
                                </div>
                            </div>
                            </td>

                            <td>{typeof meal.likes === "number" ? meal.likes : 0}</td>
                            <td>{typeof meal.reviews_count === "number" ? meal.reviews_count : 0}</td>
                            <td>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">{meal.rating ?? "—"}</span>
                                <span className="text-xs text-gray-400">/5</span>
                            </div>
                            </td>
                            <td>{meal?.distributerName || "—"}</td>
                            <td className="text-right">
                            <div className="inline-flex gap-2">
                                <button
                                onClick={() => handleView(meal)}
                                className="btn btn-ghost btn-sm"
                                title="View meal"
                                >
                                View
                                </button>

                                <button
                                onClick={() => handleUpdate(meal.id)}
                                className="btn btn-outline btn-sm"
                                title="Update meal"
                                >
                                Update
                                </button>

                                <button
                                onClick={() => handleDelete(meal.id)}
                                className="btn btn-error btn-sm"
                                disabled={deleteMutation.isLoading}
                                title="Delete meal"
                                >
                                {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>

                {/* Mobile view: stacked cards */}
                <div className="md:hidden grid gap-4">
                    {allMeals.length === 0 && !isLoading && (
                    <div className="text-center py-6 text-gray-600">No meals found.</div>
                    )}

                    {allMeals.map((meal) => (
                    <div key={meal?.id} className="card bg-base-100 shadow-sm">
                        <div className="card-body p-4">
                        <div className="flex items-start gap-3">
                            <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                            <img
                                src={meal?.image || "https://via.placeholder.com/160"}
                                alt={meal?.title}
                                className="object-cover w-full h-full"
                            />
                            </div>
                            <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold">{meal?.title}</h3>
                                <div className="text-sm text-gray-500">{meal?.distributerName || "—"}</div>
                            </div>

                            <p className="text-sm text-gray-500 mt-1 line-clamp-3">
                                {meal?.description || "No description"}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2 items-center">
                                <div className="badge badge-outline">Likes: {meal?.likes ?? 0}</div>
                                <div className="badge badge-outline">Reviews: {meal?.reviews_count ?? 0}</div>
                                <div className="badge badge-outline">Rating: {meal?.rating ?? "—"}</div>
                            </div>

                            <div className="mt-3 flex gap-2">
                                <button
                                    onClick={() => handleView(meal)}
                                    className="btn btn-ghost btn-sm"
                                >
                                View
                                </button>
                                <button
                                    onClick={() => handleUpdate(meal.id)}
                                    className="btn btn-outline btn-sm"
                                >
                                Update
                                </button>
                                <button
                                    onClick={() => handleDelete(meal.id)}
                                    className="btn btn-error btn-sm"
                                    disabled={deleteMutation.isLoading}
                                >
                                Delete
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>

                {/* VIEW Modal (DaisyUI modal) */}
                <input
                    type="checkbox"
                    id="meal-view-modal"
                    className="modal-toggle"
                    checked={isViewOpen}
                    readOnly
                />
                <div className={`modal ${isViewOpen ? "modal-open" : ""}`}>
                    <div className="modal-box max-w-3xl bg-white">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
                        onClick={handleCloseView}
                    >
                        ✕
                    </button>

                    {selectedMeal ? (
                        <div className="grid md:grid-cols-3 gap-4">
                        <div className="col-span-1">
                            <div className="w-full h-48 md:h-full rounded-md overflow-hidden">
                            <img
                                src={selectedMeal.image || "https://via.placeholder.com/400"}
                                alt={selectedMeal.title}
                                className="object-cover w-full h-full"
                            />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <h3 className="text-xl font-bold">{selectedMeal.title}</h3>
                            <p className="mt-2 text-sm text-gray-600">{selectedMeal.description}</p>

                            <div className="mt-4 flex flex-wrap gap-2">
                            <div className="badge badge-outline">Likes: {selectedMeal.likes ?? 0}</div>
                            <div className="badge badge-outline">Reviews: {selectedMeal.reviews_count ?? 0}</div>
                            <div className="badge badge-outline">Rating: {selectedMeal.rating ?? "—"}</div>
                            <div className="badge badge-outline">Distributor: {selectedMeal.distributerName ?? "—"}</div>
                            </div>

                            <div className="mt-4 flex gap-2">
                            <button
                                onClick={() => {
                                handleCloseView();
                                handleUpdate(selectedMeal.id);
                                }}
                                className="btn btn-outline"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => {
                                handleDelete(selectedMeal.id);
                                handleCloseView();
                                }}
                                className="btn btn-error"
                            >
                                Delete
                            </button>
                            </div>
                        </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">No meal selected.</div>
                    )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllMeals;