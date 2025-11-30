import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AssignedDeliveries = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels', user.email, ' driver_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliverStatus=driver_assigned`)
            return res.data
        }
    })

    // Start here.....event handler for actions
    return (
        <div>
            <h2 className="text-4xl">Parcels Pending</h2>
            <div>
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>District</th>

                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.
                                    deliveryStatus}</td>
                                <td>{parcel.district}</td>

                                <td>
                                    <button className="btn btn-primary text-black btn-sm"> Accept </button>
                                    <button className="btn ml-2 text-black btn-warning btn-sm">Reject </button>

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

export default AssignedDeliveries;