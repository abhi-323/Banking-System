import React from "react";
import HeroSection from "../components/HeroSection";
import AccountRequest from "../pages/AccountRequest";
import AccountDetails from "../components/AccountDetails";
const account = {
  user: {
    fullName: "Aman Kumar Singh",
    email: "aman.kumar@example.com",
  },
  accountNumber: "987654321098",
  accountType: "SAVINGS",
  status: "ACTIVE",
  branch: "New Delhi - Connaught Place",
  ifscCode: "ICIC0000456",
  balance: 152340.89,
};
const Home = () => {
  return (
    <>
      <HeroSection />
      <AccountDetails account={account} />
    </>
  );
};

export default Home;
