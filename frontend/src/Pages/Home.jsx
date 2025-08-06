import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import About from "../components/About";
import Qualities from "../components/Qualities";
import Menu from "../components/Menu";
import WhoAreWe from "../components/WhoAreWe";
import Team from "../components/Team";
import Reservation from "../components/Reservation";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart";

const Home = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <Navbar onCartOpen={handleCartOpen} />
      <HeroSection />
      <About />
      <Qualities />
      <Menu />
      <WhoAreWe />
      <Team />
      <Reservation />
      <Footer />
      <Cart isOpen={isCartOpen} onClose={handleCartClose} />
    </>
  );
};

export default Home;
