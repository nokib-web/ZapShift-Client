import React from 'react';
import { FaHistory, FaHome, FaUser } from 'react-icons/fa';
import { RxDashboard } from "react-icons/rx";
import { CgMenuGridR } from "react-icons/cg";
import { FcSettings } from "react-icons/fc";
import { Link, NavLink, Outlet } from 'react-router';
import { MdDirectionsBike } from 'react-icons/md';
import useRole from '../hooks/useRole';

const DashboardLayout = () => {
    const { role } = useRole()
    // console.log("in the dashboard",role)
    return (
        <div className="drawer max-w-7xl mx-auto lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <CgMenuGridR />
                    </label>
                    <div className="px-4">Zap Shift Dashboard</div>
                </nav>
                {/* Page content here */}


                <Outlet></Outlet>



            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">
                        {/* List item */}
                        <li>
                            <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                {/* Home icon */}
                                <FaHome />
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </Link>
                        </li>

                        {/* Our Dashboard Links */}


                        <li>
                            <NavLink to="/dashboard/my-parcels" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Parcels">
                                {/* Dashboard icon */}
                                <RxDashboard />
                                <span className="is-drawer-close:hidden">My Parcels</span>
                            </NavLink>
                        </li>



                        {
                            role === 'admin' && <>

                                <li>
                                    <NavLink to="/dashboard/approve-rider" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Approve Rider">
                                        {/* Dashboard icon */}
                                        <MdDirectionsBike />
                                        <span className="is-drawer-close:hidden">Approve Rider</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/user-management" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Users Management">
                                        {/* Dashboard icon */}
                                        <FaUser></FaUser>
                                        <span className="is-drawer-close:hidden">Manage User</span>
                                    </NavLink>
                                </li>
                            </>
                        }


                        <li>
                            <NavLink to="/dashboard/payment-history" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payment History">
                                {/* Payment History */}
                                <FaHistory />
                                <span className="is-drawer-close:hidden">Payment History</span>
                            </NavLink>
                        </li>

                        {/* List item */}
                        <li>
                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                {/* Settings icon */}
                                <FcSettings />
                                <span className="is-drawer-close:hidden">Settings</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;