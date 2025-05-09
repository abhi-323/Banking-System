import React, { useEffect, useState } from "react";
import axios from "axios";
import HeroSection from "../components/HeroSection";
import AccountDetails from "../components/AccountDetails";
import List from "../components/List";

const Home = () => {
  const [tableItems, setTableItems] = useState([]);

  useEffect(() => {
    const fetchAccountRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/accountRequest/getAll"
        );
        const formattedData = response.data.map((item) => ({
          avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg", // default avatar
          name: item.user.name,
          email: item.user.email,
          accountType: item.requestedType,
          branch: item.branch,
          ifscCode: item.ifscCode,
          status: item.status,
          pan: item.pan,
        }));
        setTableItems(formattedData);
      } catch (error) {
        console.error("Failed to fetch account requests:", error);
      }
    };

    fetchAccountRequests();
  }, []);

  return (
    <>
      <HeroSection />
      <List tableItems={tableItems} />
    </>
  );
};

export default Home;
