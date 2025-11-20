import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const SendParcel = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm();

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


    const serviceCenters = useLoaderData();
    const regions = serviceCenters.map(center => center.region);
    const uniqueRegions = [...new Set(regions)];
    console.log(uniqueRegions);
    // explore useMemo later

    const senderRegion = useWatch({
        control,
        name: "senderRegion"
    });
    const receiverRegion = useWatch({
        control,
        name: "receiverRegion"
    });


    const districtsByRegion = (region) => {

        const regionsDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionsDistricts.map(d => d.district);
        return districts;
    }

    const handleSendParcel = data => {
        console.log(data);

        const isDocument = data.parcelType === 'document';

        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight);

        let cost = 0;
        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        }
        else {
            if (parcelWeight < 3) {
                cost = isSameDistrict ? 110 : 150;
            }

            else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
                cost = minCharge + extraCharge;

            }



        }
        Swal.fire({
            title: "Please Confirm Your Order",
            text: `"The delivery cost is " ${cost} " BDT"`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm and continue payment!"
        }).then((result) => {
            if (result.isConfirmed) {
                // proceed to place order
                axiosSecure.post('/parcels', { ...data, cost: cost })
                    .then(res => {
                        console.log(res.data);
                        if (res.data.insertedId) {
                            navigate('/dashboard/my-parcels')
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your parcel has been created. Please Pay Now!",
                                showConfirmButton: false,
                                timer: 2500
                            });
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    });



            }
        });

        console.log('calculated cost:', cost);
    };

    return (
        <div>
            <h1 className='text-3xl font-bold text-center my-10 text-secondary'>Send A Parcel</h1>
            <form className='mt-12 p-4' onSubmit={handleSubmit(handleSendParcel)}>
                {/* parcel type */}

                <div className='text-center'>
                    <label className="label mr-4">
                        <input type="radio" {...register("parcelType")} value="document" className="radio" defaultChecked />
                        Document</label>

                    <label className="label">
                        <input type="radio" {...register("parcelType")} value="non-document" className="radio" defaultChecked />
                        Non-Document</label>
                </div>
                {/*parcel info */}
                <div className='grid grid-cols-1 md:grid-cols-2 my-8 gap-4'>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" {...register("parcelName")} className="input w-full" placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight</label>
                        <input type="number" {...register("parcelWeight")} className="input w-full " placeholder="Parcel Weight" />
                    </fieldset>

                </div>
                {/* two colum */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    {/* sender info */}

                    <div>
                        <h2 className='text-2xl font-semibold mb-4'>Sender Information</h2>
                        {/* sender name */}
                        <fieldset className="fieldset">
                            <label className="label">Sender Name</label>
                            <input type="text" {...register("senderName")} defaultValue={user?.displayName} className="input w-full " placeholder="Sender Name" />
                        </fieldset>
                        {/* sender email */}
                        <fieldset className="fieldset">
                            <label className="label">Sender Email</label>
                            <input type="email" {...register("senderEmail")} defaultValue={user?.email} className="input w-full" placeholder="Sender Email" />
                        </fieldset>


                        {/* sender contact */}
                        <fieldset className="fieldset">
                            <label className="label">Sender Contact</label>
                            <input type="text" {...register("senderContact")} className="input w-full" placeholder="Sender Contact" />
                        </fieldset>

                        {/* sender region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Region</legend>
                            <select defaultValue="Pick a region" className="select w-full" {...register("senderRegion")}>
                                <option disabled={true}>Pick a region</option>
                                {uniqueRegions.map((region, idx) => (
                                    <option key={idx} value={region}>{region}</option>
                                ))}
                            </select>

                        </fieldset>





                        {/* sender district */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender District</legend>
                            <select defaultValue="Pick a district" className="select w-full" {...register("senderDistrict")}>
                                <option disabled={true}>Pick a district</option>
                                {districtsByRegion(senderRegion).map((district, idx) => (
                                    <option key={idx} value={district}>{district}</option>
                                ))}
                            </select>

                        </fieldset>


                        {/* sender address */}
                        <fieldset className="fieldset">
                            <label className="label">Sender Address</label>
                            <input type="text" {...register("senderAddress")} className="input w-full" placeholder="Sender Address" />
                        </fieldset>


                    </div>
                    {/* receiver info */}
                    <div>
                        <h2 className='text-2xl font-semibold mb-4'>Receiver Information</h2>
                        {/* receiver name */}
                        <fieldset className="fieldset">
                            <label className="label">Receiver Name</label>
                            <input type="text" {...register("receiverName")} className="input w-full " placeholder="Receiver Name" />
                        </fieldset>
                        {/* receiver email */}
                        <fieldset className="fieldset">
                            <label className="label">Receiver Email</label>
                            <input type="email" {...register("receiverEmail")} className="input w-full" placeholder="Receiver Email" />
                        </fieldset>
                        {/* receiver contact */}
                        <fieldset className="fieldset">
                            <label className="label">Receiver Contact</label>
                            <input type="text" {...register("receiverContact")} className="input w-full" placeholder="Receiver Contact" />
                        </fieldset>


                        {/* receiver region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Receiver Region</legend>
                            <select defaultValue="Pick a region" className="select w-full" {...register("receiverRegion")}>
                                <option disabled={true}>Pick a region</option>
                                {uniqueRegions.map((region, index) => (
                                    <option key={index} value={region}>{region}</option>
                                ))}
                            </select>

                        </fieldset>





                        {/* receiver district */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Receiver District</legend>
                            <select defaultValue="Pick a district" className="select w-full" {...register("receiverDistrict")}>
                                <option disabled={true}>Pick a district</option>
                                {districtsByRegion(receiverRegion).map((district, index) => (
                                    <option key={index} value={district}>{district}</option>
                                ))}
                            </select>

                        </fieldset>



                        {/* receiver address */}
                        <fieldset className="fieldset">
                            <label className="label">Receiver Address</label>
                            <input type="text" {...register("receiverAddress")} className="input w-full" placeholder="Receiver Address" />
                        </fieldset>

                    </div>
                </div>
                {
                    errors.exampleRequired && <span>This field is required</span>
                }
                <input className='btn btn-primary flex justify-center items-center mx-auto w-1/2 text-black mt-4' type="submit" value="Send Parcel" />

            </form>
        </div>
    );
};

export default SendParcel;