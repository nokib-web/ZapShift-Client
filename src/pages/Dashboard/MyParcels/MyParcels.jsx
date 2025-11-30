import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEdit, FaRegTrashAlt, FaSearch } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();



    // tanstack query
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }

    })

    const handleParcelDelete = (id) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            if (result.isConfirmed) {

                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        console.log('deleted res', res.data);
                        if (res.data.deletedCount) {
                            // Refetch parcels after deletion
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your parcel record has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }

        });

    }

    const handlePayment = async (parcel) => {
     
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName,
        }
      

        const res = await axiosSecure.post('/payment-checkout-session', paymentInfo)

        window.location.assign(res.data.url);

        console.log(res.data.url)
    }

    return (
        <div>
            <h2 className='text-3xl font-semibold text-center text-secondary my-4 mb-6'>My Parcels</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th> Parcel Name</th>
                            <th> Cost</th>
                            <th> Payment</th>
                            <th> Tracking Id</th>
                            <th> Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.cost}</td>
                               
                                <td>
                                    {
                                        parcel.paymentStatus === 'paid' ?
                                            <span className='text-green-600 font-semibold'>Paid</span>
                                            :

                                            // By new api on backend
                                            <button onClick={() => handlePayment(parcel)} className='btn btn-sm btn-primary text-black'>
                                                pay
                                            </button>

                                        // by old api on backend
                                        // <Link to={`dashboard/payment/${parcel._id}`} className='text-black btn btn-sm btn-primary font-semibold'>Pay</Link>
                                    }
                                </td>
                                
                                <td>{parcel.trackingId}</td>
                                <td>{parcel.deliveryStatus}</td>
                                <td>
                                    <button className='btn  btn-square hover:bg-primary'>
                                        <FaSearch /></button>
                                    <button className='btn mx-2 btn-square hover:bg-primary'>
                                        <FaEdit /></button>
                                    <button onClick={() => handleParcelDelete(parcel._id)} className='btn btn-square hover:bg-red-600'>
                                        <FaRegTrashAlt /></button>

                                </td>




                            </tr>)
                        }
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default MyParcels;