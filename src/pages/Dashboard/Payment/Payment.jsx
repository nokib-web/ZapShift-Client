import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Payment = () => {

    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();


    const { isLoading, data: parcel = [] } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            // fetch parcel details by id for payment
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })

   
    const handlePayment = async () => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        console.log(res.data)
        window.location.href = res.data.url;
    }

     if (isLoading) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">Payment for Parcel: {parcel.parcelName}</h2>
            <p className="mb-2">Amount to Pay: {parcel.cost}</p>
            {/* Payment form or integration goes here */}
            <button onClick={handlePayment} className="btn text-black btn-primary">Pay</button>
        </div>
    );
};

export default Payment;