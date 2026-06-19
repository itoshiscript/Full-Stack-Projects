import {Link} from "react-router-dom";

export const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"/>
                <div className="absolute inset-0">
                    <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gray-200/40 blur-3xl"/>
                    <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gray-300/30 blur-3xl"/>
                </div>

                <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
                    <div className="flex flex-col items-center text-center">
                        <div
                            className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-600 shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span
                                    className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"/>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"/>
                            </span>
                            Now accepting reservations for Summer 2026
                        </div>

                        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                            Experience luxury stays,{" "}
                            <span
                                className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent">
                                effortlessly managed
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
                            Streamline your hotel operations with our all-in-one management platform.
                            From bookings to guest services — everything in one place.
                        </p>

                        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                            <Link
                                to="/bookings"
                                className="inline-flex h-11 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800"
                            >
                                Book a Room
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                     className="ml-2 h-4 w-4">
                                    <line x1="5" y1="12" x2="19" y2="12"/>
                                    <polyline points="12 5 19 12 12 19"/>
                                </svg>
                            </Link>
                            <Link
                                to="/rooms"
                                className="inline-flex h-11 items-center justify-center rounded-md border border-gray-200 bg-white px-6 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                            >
                                Explore Rooms
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="border-y border-gray-200 bg-gray-50/50">
                <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-gray-200 sm:grid-cols-4">
                    {[
                        {value: "200+", label: "Luxury Rooms"},
                        {value: "50K+", label: "Happy Guests"},
                        {value: "4.9", label: "Guest Rating"},
                        {value: "24/7", label: "Concierge"},
                    ].map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center gap-1 bg-white px-6 py-10">
                            <span className="text-3xl font-bold tracking-tight text-gray-900">{stat.value}</span>
                            <span className="text-sm text-gray-500">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Everything you need
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Powerful tools to manage every aspect of your hotel
                    </p>
                </div>

                <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            title: "Room Management",
                            description: "Track availability, manage room types, and optimize occupancy rates in real time.",
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                     strokeLinejoin="round" className="h-5 w-5">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                    <polyline points="9 22 9 12 15 12 15 22"/>
                                </svg>
                            ),
                        },
                        {
                            title: "Smart Bookings",
                            description: "Automated reservation system with instant confirmations and calendar sync.",
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                     strokeLinejoin="round" className="h-5 w-5">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                    <line x1="16" y1="2" x2="16" y2="6"/>
                                    <line x1="8" y1="2" x2="8" y2="6"/>
                                    <line x1="3" y1="10" x2="21" y2="10"/>
                                </svg>
                            ),
                        },
                        {
                            title: "Guest Profiles",
                            description: "Detailed guest history, preferences, and loyalty tracking for personalized service.",
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                     strokeLinejoin="round" className="h-5 w-5">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                </svg>
                            ),
                        },
                        {
                            title: "Revenue Analytics",
                            description: "Real-time dashboards with occupancy trends, revenue reports, and forecasting.",
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                     strokeLinejoin="round" className="h-5 w-5">
                                    <line x1="18" y1="20" x2="18" y2="10"/>
                                    <line x1="12" y1="20" x2="12" y2="4"/>
                                    <line x1="6" y1="20" x2="6" y2="14"/>
                                </svg>
                            ),
                        },
                        {
                            title: "Housekeeping",
                            description: "Assign tasks, track cleaning status, and manage maintenance schedules.",
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                     strokeLinejoin="round" className="h-5 w-5">
                                    <polyline points="9 11 12 14 22 4"/>
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                                </svg>
                            ),
                        },
                        {
                            title: "Multi-Channel",
                            description: "Sync with OTAs, direct bookings, and travel agents from a single dashboard.",
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                     strokeLinejoin="round" className="h-5 w-5">
                                    <circle cx="12" cy="12" r="10"/>
                                    <line x1="2" y1="12" x2="22" y2="12"/>
                                    <path
                                        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                                </svg>
                            ),
                        },
                    ].map((feature) => (
                        <div
                            key={feature.title}
                            className="group rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-md"
                        >
                            <div
                                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-700 transition-colors group-hover:bg-gray-900 group-hover:text-white">
                                {feature.icon}
                            </div>
                            <h3 className="text-base font-semibold text-gray-900">{feature.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-gray-500">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="border-t border-gray-200 bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Ready to transform your hotel?
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Join thousands of hotels already using HotelHub to deliver exceptional guest experiences.
                        </p>
                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Link
                                to="/bookings"
                                className="inline-flex h-11 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800"
                            >
                                Get Started Free
                            </Link>
                            <span className="text-sm text-gray-500">No credit card required</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                     className="h-3.5 w-3.5">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                    <polyline points="9 22 9 12 15 12 15 22"/>
                                </svg>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">HotelHub</span>
                        </div>
                        <p className="text-sm text-gray-500">© 2026 HotelHub. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
