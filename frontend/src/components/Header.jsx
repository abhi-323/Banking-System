import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUniversity } from "react-icons/fa";
import {jwtDecode} from "jwt-decode";
import { useSelector } from "react-redux";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userToken = useSelector((state) => state.userAuth.token);
  const tokenDecoded = userToken ? jwtDecode(userToken) : null;
  const role = tokenDecoded ? tokenDecoded.roles[0] : null;
  let isAuthenticated = !!userToken;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <header className="bg-white shadow-md top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center space-x-2 text-blue-700 hover:text-blue-800 transition-colors duration-300"
        >
          <FaUniversity className="text-2xl" />
          <span className="font-bold text-xl tracking-wide">Finovate Bank</span>
        </Link>

        <button
          className="lg:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 8h16M4 16h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <NavLinks isAuthenticated={isAuthenticated} logout={logout} role={role} />
        </nav>
      </div>

      {/* Mobile Dropdown Nav */}
      {isMenuOpen && (
        <div className="lg:hidden px-4 pb-4 transition-all duration-300 ease-in-out">
          <nav className="flex flex-col space-y-3">
            <NavLinks
              mobile
              isAuthenticated={isAuthenticated}
              logout={logout}
              role={role}
            />
          </nav>
        </div>
      )}
    </header>
  );
};

const NavLinks = ({ mobile = false, isAuthenticated, logout, role }) => {
  const linkClass =
    "text-gray-700 hover:text-blue-700 font-medium transition-all duration-200";
  const buttonBase =
    "px-4 py-2 rounded-md font-semibold transition duration-300";

  return (
    <>
      <Link to="/" className={linkClass}>
        Dashboard
      </Link>
      <Link to="/account-details" className={linkClass + (role === "USER" ? "" : " hidden")}>
        Accounts
      </Link>
      <Link to="/transactions" className={linkClass + (role === "USER" ? "" : " hidden")}>
        Transactions
      </Link>
      <Link to="/apply-loan" className={linkClass + (role === "USER" ? "" : " hidden")}>
        Loans
      </Link>
      <Link to="/loan-applications" className={linkClass + (role === "USER" ? "" : " hidden")}>
        Loan Applications
      </Link>
      {(role && (role.includes("MANAGER") || role.includes("CLERK"))) && (
        <Link to="/loan-application-list" className={linkClass}>
          Loan Applications List
        </Link>
      )}

      {isAuthenticated ? (
        <button
          onClick={logout}
          className={`${buttonBase} bg-red-500 hover:bg-red-600 text-white ${
            mobile ? "mt-2 w-full" : ""
          }`}
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className={`${buttonBase} bg-blue-600 hover:bg-blue-700 text-white ${
            mobile ? "mt-2 text-center w-full" : ""
          }`}
        >
          Login
        </Link>
      )}
    </>
  );
};

export default Header;
