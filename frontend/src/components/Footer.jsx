import React from "react";
import { FaUniversity } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white/60 backdrop-blur-md border-t border-white/20 shadow-inner dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <a
          href="#"
          className="flex justify-center items-center text-2xl font-semibold text-indigo-700 dark:text-white mb-4"
        >
          <FaUniversity className="text-2xl mr-2 text-white" />
          <span>Finovate Bank</span>
        </a>

        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Let us help you reach your financial goals. Expect excellence.
        </p>

        <ul className="flex flex-wrap justify-center items-center gap-6 mb-6 text-gray-700 dark:text-gray-300 text-sm font-medium">
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Expense_management"
              target="_blank"
              className="hover:text-indigo-600 transition-colors duration-300"
            >
              About
            </a>
          </li>

          <li>
            <a
              href="https://github.com/singhkumaraman/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 transition-colors duration-300"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="hover:text-indigo-600 transition-colors duration-300"
            >
              Contact
            </a>
          </li>
          {/* Additional Link Examples */}
          <li>
            <a
              href="/privacy-policy"
              className="hover:text-indigo-600 transition-colors duration-300"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="/terms-of-service"
              className="hover:text-indigo-600 transition-colors duration-300"
            >
              Terms of Service
            </a>
          </li>
        </ul>

        <p className="text-sm text-gray-500 dark:text-gray-400 pb-4">
          © {new Date().getFullYear()}{" "}
          <a href="#" className="hover:underline">
            CashUe™
          </a>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
