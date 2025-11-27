import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaCheck, FaTrash } from 'react-icons/fa';
import { IoPersonRemove } from "react-icons/io5";
import Swal from 'sweetalert2';

const ApproveRider = () => {
    const axiosSecure = useAxiosSecure()

    const { refetch, data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders')
            return res.data
        }

    })

    const updateRiderStatus = (rider, status) => {
        const updateInfo = { status: status, email: rider.email }
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rider status set to ${status}`,
                        showConfirmButton: false,
                        timer: 2000
                    });

                }
            })

    }

    const handleApproval = (rider) => {
        updateRiderStatus(rider, 'approved')
    }
    const handleRejection = (rider) => {
        updateRiderStatus(rider, 'rejected')
    }

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return; // user cancelled

        try {
            await axiosSecure.delete(`/riders/${id}`);

            Swal.fire({
                icon: "success",
                title: "Deleted",
                text: "Rider deleted successfully.",
            });

            // Optional: refresh UI after delete
            refetch(); // only works if using react-query or SWR
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.response?.data?.message || "Failed to delete",
            });
        }
    };




    return (
        <div>
            I am rider
            <div>
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>District</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            riders.map((rider, index) => <tr key={rider._id}>
                                <th>{index + 1}</th>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td className={
                                    `${rider.status === 'approved' ? 'text-green-500' : 'text-red-500'}`
                                }>{rider.status}</td>
                                <td>{rider.district}</td>
                                <td>
                                    <button onClick={() => handleApproval(rider)} className="btn btn-sm"> <FaCheck /> </button>
                                    <button onClick={() => handleRejection(rider)} className="btn btn-sm"> <IoPersonRemove /> </button>
                                    <button onClick={() => handleDelete(rider._id)} className="btn btn-sm"> <FaTrash /> </button>
                                </td>
                            </tr>

                            )
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveRider;