import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Passbook from "./pages/Passbook";
import AccountDetails from "./components/AccountDetails";
import TransactionForm from "./pages/TransactionForm";
import LoanApplicaitonList from "./pages/LoanApplicatonList";
import LoanApplicationForm from "./pages/LoanApplicaitonForm";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/transactions" element={<Passbook />} />
          <Route path="/account-details" element={<AccountDetails />} />
          <Route path="/money-transfer" element={<TransactionForm />} />
          <Route path="/loan-applications" element={<LoanApplicaitonList />} />
          <Route path="/apply-loan" element={<LoanApplicationForm />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};
export default App;
