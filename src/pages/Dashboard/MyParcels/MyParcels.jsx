import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [] } = useQuery({
        queryKey: ['my-parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }

    })
    return (
        <div>
            <h2 className='text-3xl font-semibold text-center text-secondary my-4 mb-6'>My Parcels</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Parcel ID</th>
                            <th>Recipient Name</th>
                            <th>Status</th>
                            <th>Pickup Address</th>
                            <th>Delivery Address</th>
                            <th>Weight (kg)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel._id}</td>
                                <td>{parcel.receiverName}</td>
                                <td>{parcel.status}</td>
                                <td>{parcel.senderAddress}</td>
                                <td>{parcel.receiverAddress}</td>
                                <td>{parcel.parcelWeight}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default MyParcels;