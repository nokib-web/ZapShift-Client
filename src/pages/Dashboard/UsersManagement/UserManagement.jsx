import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from "react-icons/fi";
import Swal from 'sweetalert2';

const UserManagement = () => {
    const axiosSecure = useAxiosSecure()
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data
        }
    })

    const handleMakeAdmin = (user) => {
        const roleInfo = { role: 'admin' };

        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, make admin',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            focusCancel: true
        }).then(result => {
            if (result.isConfirmed) {

                // Call API only if confirmed
                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire({
                                icon: 'success',
                                title: `${user.displayName} is now an Admin`,
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    })
                    .catch(err => {
                        Swal.fire('Error', 'Something went wrong', err);
                    });

            } else {
                // Optional cancellation message
                Swal.fire({
                    icon: 'info',
                    title: 'Action cancelled',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };


    const handleRemoveAdmin = (user) => {
        const roleInfo = { role: 'user' };

        Swal.fire({
            title: 'Are you sure?',
            text: "This user will lose admin access.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove admin',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            focusCancel: true
        }).then(result => {

            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire({
                                icon: "success",
                                title: `${user.displayName} is no longer an Admin`,
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: "error",
                            title: "Failed to update role",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    });
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Action cancelled",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    };

    return (
        <div>
            <h className="text-3xl">Manage User: {users.length}</h>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Actions</th>
                            <th>Other Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photoURL}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.displayName}</div>

                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    {user.role}
                                </td>
                                <td>
                                    {/* admin */}
                                    {user.role === 'admin' ?
                                        <button onClick={() => handleRemoveAdmin(user)} className='btn'><FiShieldOff /></button> :
                                        <button onClick={() => handleMakeAdmin(user)} className='btn'><FaUserShield /></button>}
                                </td>
                                <td>
                                    {/* others action */}

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

export default UserManagement;