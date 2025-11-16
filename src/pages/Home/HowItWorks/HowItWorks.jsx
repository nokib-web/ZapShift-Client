import React from "react";
import bookingIcon from "../../../assets/bookingIcon.png";

const items = [
    {
        title: "Booking Pick & Drop",
        desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
        title: "Cash On Delivery",
        desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
        title: "Delivery Hub",
        desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
        title: "Booking SME & Corporate",
        desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
];

const HowItWorks = () => {
    return (
        <div className="w-full py-10">
            <h2 className="text-3xl font-bold text-center mb-8 text-secondary">How it Works</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="card bg-base-100 shadow-sm rounded-2xl h-full"
                    >
                        <div className="card-body space-y-3 p-6">
                            <img src={bookingIcon} alt="Booking Icon" className="w-10 h-10 text-gray-700" />
                            <h3 className="font-semibold text-secondary">{item.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default HowItWorks;
