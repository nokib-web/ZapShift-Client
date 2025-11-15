// import React from "react";
// import van from '../../../assets/delivery-van.png'

// const services = [
//     {
//         title: "Express & Standard Delivery",
//         desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
//         highlight: false,
//     },
//     {
//         title: "Nationwide Delivery",
//         desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
//         highlight: true,
//     },
//     {
//         title: "Fulfillment Solution",
//         desc: "We offer customized service with inventory management support, online order processing, packaging, and other sales support.",
//         highlight: false,
//     },
//     {
//         title: "Cash on Home Delivery",
//         desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
//         highlight: false,
//     },
//     {
//         title: "Corporate Service / Contract In Logistics",
//         desc: "Customized corporate services which include warehouse and inventory management support.",
//         highlight: false,
//     },
//     {
//         title: "Parcel Return",
//         desc: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
//         highlight: false,
//     },
// ];

// const OurServices = () => {
//     return (
//         <div className="w-full py-12 bg-secondary rounded-2xl my-10 text-white">
//             {/* Heading */}
//             <div className="text-center mb-10">
//                 <h2 className="text-3xl font-bold">Our Services</h2>
//                 <p className="text-sm mt-2 max-w-xl mx-auto opacity-80">
//                     Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
//                     From personal packages to business shipments — we deliver on time, every time.
//                 </p>
//             </div>

//             {/* Service Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
//                 {services.map((service, index) => (
//                     <div
//                         key={index}
//                         className={`card rounded-2xl shadow-md p-6 border
//               ${service.highlight ? "bg-primary text-black" : "bg-white text-black"}`}
//                     >
//                         <div className="flex flex-col items-center text-center space-y-3">
//                             <div className="w-12 h-12 flex items-center justify-center bg-[#F0F5FF] rounded-full">
//                                 <img src={van} alt="Delivery Van" className="w-6 h-6" />
//                             </div>

//                             <h3 className="font-semibold text-lg">{service.title}</h3>

//                             <p className="text-sm opacity-70 leading-relaxed">
//                                 {service.desc}
//                             </p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
// export default OurServices;

import React from "react";

const OurServices = () => {
    return (
        <div className="w-full py-12 bg-secondary mb-10 rounded-2xl text-white">
            {/* Heading */}
            <div className="text-center mb-10">
                <h2 className="text-3xl text-white font-bold">Our Services</h2>
                <p className="text-sm mt-2 max-w-xl mx-auto opacity-90">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.
                </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">

                {/* Card 1 */}
                <div className="card rounded-2xl shadow-md p-6 bg-white text-black border">
                    <div className="flex flex-col items-center text-center space-y-3">
                        <div className="w-12 h-12 flex items-center justify-center bg-[#F0F5FF] rounded-full">
                            <img className="text-2xl text-[#1B3D5D]" />
                        </div>
                        <h3 className="font-semibold text-lg">Express & Standard Delivery</h3>
                        <p className="text-sm opacity-70 leading-relaxed">
                            We deliver parcels within 24–72 hours in major cities.
                            Express delivery available in Dhaka within 4–6 hours.
                        </p>
                    </div>
                </div>

                {/* Card 2 (Highlighted) */}
                <div className="card rounded-2xl shadow-md p-6 bg-[#C7EB4F] text-black border">
                    <div className="flex flex-col items-center text-center space-y-3">
                        <div className="w-12 h-12 flex items-center justify-center bg-[#F0F5FF] rounded-full">
                            <img className="text-2xl text-[#1B3D5D]" />
                        </div>
                        <h3 className="font-semibold text-lg">Nationwide Delivery</h3>
                        <p className="text-sm opacity-80 leading-relaxed">
                            Home delivery in every district, reaching your customers within 48–72 hours.
                        </p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="card rounded-2xl shadow-md p-6 bg-white text-black border">
                    <div className="flex flex-col items-center text-center space-y-3">
                        <div className="w-12 h-12 flex items-center justify-center bg-[#F0F5FF] rounded-full">
                            <img className="text-2xl text-[#1B3D5D]" />
                        </div>
                        <h3 className="font-semibold text-lg">Fulfillment Solution</h3>
                        <p className="text-sm opacity-70 leading-relaxed">
                            Inventory management, online order processing, packaging, and sales support.
                        </p>
                    </div>
                </div>

                {/* Card 4 */}
                <div className="card rounded-2xl shadow-md p-6 bg-white text-black border">
                    <div className="flex flex-col items-center text-center space-y-3">
                        <div className="w-12 h-12 flex items-center justify-center bg-[#F0F5FF] rounded-full">
                            <img className="text-2xl text-[#1B3D5D]" />
                        </div>
                        <h3 className="font-semibold text-lg">Cash on Home Delivery</h3>
                        <p className="text-sm opacity-70 leading-relaxed">
                            100% cash-on-delivery anywhere in Bangladesh with secured service.
                        </p>
                    </div>
                </div>

                {/* Card 5 */}
                <div className="card rounded-2xl shadow-md p-6 bg-white text-black border">
                    <div className="flex flex-col items-center text-center space-y-3">
                        <div className="w-12 h-12 flex items-center justify-center bg-[#F0F5FF] rounded-full">
                            <img className="text-2xl text-[#1B3D5D]" />
                        </div>
                        <h3 className="font-semibold text-lg">Corporate Service / Logistics Contract</h3>
                        <p className="text-sm opacity-70 leading-relaxed">
                            Tailored corporate logistics with warehouse & inventory management support.
                        </p>
                    </div>
                </div>

                {/* Card 6 */}
                <div className="card rounded-2xl shadow-md p-6 bg-white text-black border">
                    <div className="flex flex-col items-center text-center space-y-3">
                        <div className="w-12 h-12 flex items-center justify-center bg-[#F0F5FF] rounded-full">
                            <img className="text-2xl text-[#1B3D5D]" />
                        </div>
                        <h3 className="font-semibold text-lg">Parcel Return</h3>
                        <p className="text-sm opacity-70 leading-relaxed">
                            Reverse logistics to allow customers to return or exchange products easily.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default OurServices;
