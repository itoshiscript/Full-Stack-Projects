import {useState} from "react";
import {Link} from "react-router-dom";

export const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                    </div>
                    <span className="text-lg font-semibold tracking-tight text-gray-900">HotelHub</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-1 md:flex">
                    <Link to="/"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900">
                        Home
                    </Link>
                    <Link to="/rooms"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900">
                        Rooms
                    </Link>
                    <Link to="/bookings"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900">
                        Bookings
                    </Link>
                    <Link to="/guests"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900">
                        Guests
                    </Link>
                </div>

                {/* Desktop Right Section */}
                <div className="hidden items-center gap-3 md:flex">
                    <Link to="/auth/login"
                          className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900">
                        Sign In
                    </Link>
                    <Link to="/auth/register"
                          className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800">
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-700 transition-colors hover:bg-gray-100 md:hidden"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <line x1="4" y1="12" x2="20" y2="12"/>
                            <line x1="4" y1="6" x2="20" y2="6"/>
                            <line x1="4" y1="18" x2="20" y2="18"/>
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="border-t border-gray-200 bg-white px-4 py-3 md:hidden">
                    <div className="flex flex-col gap-1">
                        <Link to="/" onClick={() => setMobileMenuOpen(false)}
                              className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100">
                            Home
                        </Link>
                        <Link to="/rooms" onClick={() => setMobileMenuOpen(false)}
                              className="rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100">
                            Rooms
                        </Link>
                        <Link to="/bookings" onClick={() => setMobileMenuOpen(false)}
                              className="rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100">
                            Bookings
                        </Link>
                        <Link to="/guests" onClick={() => setMobileMenuOpen(false)}
                              className="rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100">
                            Guests
                        </Link>
                    </div>
                    <div className="mt-3 flex flex-col gap-2 border-t border-gray-200 pt-3">
                        <button
                            className="inline-flex h-9 w-full items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50">
                            Sign In
                        </button>
                        <button
                            className="inline-flex h-9 w-full items-center justify-center rounded-md bg-gray-900 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800">
                            Get Started
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};
