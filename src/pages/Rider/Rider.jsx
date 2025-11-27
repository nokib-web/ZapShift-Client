import React from "react";
import { useForm, useWatch } from "react-hook-form";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router";
import img from '../../assets/agent-pending.png'

const Rider = () => {
    const { register, handleSubmit, control ,  } = useForm();

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // =============================
    // Load service center data
    // =============================
    const serviceCenters = useLoaderData();

    const regions = serviceCenters.map((center) => center.region);
    const uniqueRegions = [...new Set(regions)];

    // Watch for selected region
    const selectedRegion = useWatch({
        control,
        name: "region",
    });

    // Get districts dynamically
    const districtsByRegion = (region) => {
        const filtered = serviceCenters.filter((c) => c.region === region);
        return filtered.map((d) => d.district);
    };

    // =============================
    // Submit Handler
    // =============================
    const onSubmit = async (data) => {

        console.log(data)
        try {
            const res = await axiosSecure.post("/riders", data);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Application Submitted",
                    text: "Your Rider application has been submitted successfully!",
                });
            }
        } catch (err) {
            if (err.response?.status === 409) {
                Swal.fire({
                    icon: "warning",
                    title: "You Already Applied",
                    text: "You have already submitted your rider application. Please wait for confirmation",
                });
            }
            console.log(err);
        }
    };


    return (
        <div className="max-w-6xl mx-auto p-10 bg-white rounded-2xl shadow-sm mt-10">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-900">Be a Rider</h1>
                <p className="text-gray-600 mt-2 w-full md:w-3/5">
                    Enjoy fast pickup and delivery with real-time tracking and smooth ride.
                    Help people deliver packages to businesses everywhere — we deliver on time every time.
                </p>
            </div>

            {/* <div className="grid grid-cols-revers lg:grid-cols-2 gap-10"> */}
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10">
                {/* LEFT: FORM */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Tell us about yourself
                    </h2>

                    {/* Name */}

                    <label className="label">Your Name</label>
                    <input
                        type="text"
                        {...register("name", { required: true })}
                        placeholder="Your Name"
                        className="input input-bordered w-full"
                    />

                    {/* License */}
                    <label className="label">Driving License Number</label>
                    <input
                        type="text"
                        {...register("driving-license")}
                        placeholder="Driving License Number"
                        className="input input-bordered w-full"
                    />

                    {/* Email */}
                    <label className="label">Your Email</label>
                    <input
                        type="email"
                        {...register("email")}
                        defaultValue={user?.email}
                        placeholder="Your Email"
                        className="input input-bordered w-full"
                    />

                    {/* Dynamic Region */}
                    <label className="label"> Your Region</label>
                    <select
                        {...register("region")}
                        className="select select-bordered w-full"
                        defaultValue=""
                    >
                        <option value="" disabled>Select Your Region</option>
                        {uniqueRegions.map((region, i) => (
                            <option key={i} value={region}>
                                {region}
                            </option>
                        ))}
                    </select>

                    {/* Dynamic District */}
                    <label className="label"> Your District</label>
                    <select
                        {...register("district")}
                        className="select select-bordered w-full"
                        defaultValue=""

                    >
                        <option value="" disabled>Select Your District</option>
                        {selectedRegion &&
                            districtsByRegion(selectedRegion).map((d, i) => (
                                <option key={i} value={d}>
                                    {d}
                                </option>
                            ))}
                    </select>

                    {/* NID */}
                    <label className="label"> Your NID Number</label>
                    <input
                        type="text"
                        {...register("nid")}
                        placeholder="NID No"
                        className="input input-bordered w-full"
                    />

                    {/* Phone */}
                    <label className="label"> Your Phone Number</label>
                    <input
                        type="text"
                        {...register("phone")}
                        placeholder="Phone Number"
                        className="input input-bordered w-full"
                    />

                    {/* Bike Model And Year */}
                    <label className="label"> Your Bike Model And Year</label>
                    <input
                        type="text"
                        {...register("bike-model")}
                        placeholder="Bike Model And Year"
                        className="input input-bordered w-full"
                    />

                    {/* Bike Registration number */}
                    <label className="label"> Bike Registration Number</label>
                    <input
                        type="text"
                        {...register("bike-registration-number")}
                        placeholder="Bike Registration Number"
                        className="input input-bordered w-full"
                    />

                    {/* Experience */}
                    <label className="label"> Your Experience</label>
                    <input
                        type="text"
                        {...register("experience")}
                        placeholder="Years of Driving Experience"
                        className="input input-bordered w-full"
                    />

                    {/* About */}
                    <label className="label">Tell Us About Yourself</label>
                    <textarea
                        {...register("about")}
                        placeholder="Tell Us About Yourself"
                        className="textarea textarea-bordered w-full"
                    ></textarea>

                    {/* Submit Button */}
                    <button className="btn bg-primary w-full text-black font-semibold">
                        Submit
                    </button>
                </form>

                {/* RIGHT: IMAGE */}
                <div className="flex justify-center items-start">
                    <img
                        src={img}
                        className="w-80 md:w-[380px]"
                        alt="Rider Illustration"
                    />
                </div>
            </div>
        </div>
    );
};

export default Rider;
