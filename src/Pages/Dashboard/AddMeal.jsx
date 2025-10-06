import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';

const AddMeal = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [ingredients, setIngredients] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            e.preventDefault();
            setIngredients([...ingredients, inputValue.trim()]);
            setInputValue("");
        }
    };

    const removeIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const onSubmit = (data) => {
        data.price = parseInt(data.price);
        const formData = {
            ...data,
            ingredients,
            image: data.image[0], // single file
        };
        console.log(formData);

        // reset form
        reset();
        setIngredients([]);
    };
    return (
        <>
            <Helmet>
                <title>Dashboard | Add Meal</title>
            </Helmet>
            <div className="max-w-2xl w-96 mx-auto bg-white shadow-lg rounded-2xl p-6 my-10">
                <h2 className="text-2xl font-bold mb-4">Add Meal</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Title */}
                    <div>
                    <label className="block font-medium">Title</label>
                    <input
                        type="text"
                        {...register("title", { required: true })}
                        className="input input-bordered w-full"
                        placeholder="Meal title"
                    />
                    {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
                    </div>

                    {/* Category */}
                    <div>
                    <label className="block font-medium">Category</label>
                    <select
                        {...register("category", { required: true })}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select category</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-sm">Category is required</p>}
                    </div>

                    {/* Image */}
                    <div>
                    <label className="block font-medium">Image</label>
                    <input
                        type="file"
                        {...register("image", { required: true })}
                        className="file-input file-input-bordered w-full"
                    />
                    {errors.image && <p className="text-red-500 text-sm">Image is required</p>}
                    </div>

                    {/* Description */}
                    <div>
                    <label className="block font-medium">Description</label>
                    <textarea
                        {...register("description", { required: true })}
                        className="textarea textarea-bordered w-full"
                        placeholder="Write meal description..."
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
                    </div>

                    {/* Ingredients */}
                    <div>
                        <label className="block font-medium">Ingredients</label>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="input input-bordered w-full"
                            placeholder="Type and press Enter"
                        />
                        <div className="mt-2 flex flex-wrap gap-2">
                            {ingredients.map((ing, index) => (
                            <div key={index} className="badge badge-outline gap-1">
                                {ing}
                                <button
                                type="button"
                                onClick={() => removeIngredient(index)}
                                className="ml-1 text-red-500 font-bold cursor-pointer"
                                >
                                ×
                                </button>
                            </div>
                            ))}
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                    <label className="block font-medium">Price</label>
                    <input
                        type="number"
                        {...register("price", { required: true, min: 1 })}
                        className="input input-bordered w-full"
                        placeholder="Price in BDT"
                    />
                    {errors.price && <p className="text-red-500 text-sm">Price is required</p>}
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white border-none w-full">
                    Add Meal
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddMeal;