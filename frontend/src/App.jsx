import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { setToken } from "./redux/reducers/userAuthReducer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Passbook from "./pages/Passbook";
import AccountDetails from "./components/AccountDetails";
import TransactionForm from "./pages/TransactionForm";
import LoanApplicaitonList from "./pages/LoanApplicatonList";
import LoanApplicationForm from "./pages/LoanApplicaitonForm";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthRoute from "./components/AuthRoute";
import ManagerRoute from "./components/ManagerRoute";
import ClerkRoute from "./components/ClerkRoute";
import AccountRequest from "./pages/AccountRequest";
import AccountRequestList from "./pages/AccountRequestList";
import LoanRequestList from "./pages/LoanRequestList";
import LoanAccountDetails from "./pages/LoanAccountDetails";
import UserAccountRequest from "./pages/UserAccountRequest";
import ManagerDashboard from "./pages/ManagerDashboard";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Signup />} />
              <Route
                path="/transactions"
                element={
                  <AuthRoute>
                    <Passbook />
                  </AuthRoute>
                }
              />
              <Route
                path="/account-details"
                element={
                  <AuthRoute>
                    <AccountDetails />
                  </AuthRoute>
                }
              />
              <Route
                path="/account-request"
                element={
                  <AuthRoute>
                    <AccountRequest />
                  </AuthRoute>
                }
              />
              <Route
                path="/account-request-list"
                element={
                  <AuthRoute>
                    <UserAccountRequest />
                  </AuthRoute>
                }
              />
              <Route
                path="/loan-account-details"
                element={
                  <AuthRoute>
                    <LoanAccountDetails />
                  </AuthRoute>
                }
              />
              <Route
                path="/money-transfer"
                element={
                  <AuthRoute>
                    <TransactionForm />
                  </AuthRoute>
                }
              />
              <Route
                path="/loan-applications"
                element={<LoanApplicaitonList />}
              />
              <Route path="/apply-loan" element={<LoanApplicationForm />} />
              <Route
                path="/account-request-application-list"
                element={
                  <AuthRoute>
                    <ManagerRoute>
                      <AccountRequestList />
                    </ManagerRoute>
                  </AuthRoute>
                }
              />
              <Route
                path="/loan-request-application-list"
                element={
                  <AuthRoute>
                    <ManagerRoute>
                      <LoanRequestList />
                    </ManagerRoute>
                  </AuthRoute>
                }
              />
              <Route
                path="/manager-dashboard"
                element={
                  <AuthRoute>
                    <ManagerRoute>
                      <ManagerDashboard />
                    </ManagerRoute>
                  </AuthRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
};
export default App;
