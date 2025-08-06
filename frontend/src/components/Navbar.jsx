import React, { useState } from "react";
import { Link } from "react-scroll";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { data } from "../restApi.json";

const Navbar = ({ onCartOpen }) => {
  const [show, setShow] = useState(false);

  const toggleMenu = () => {
    setShow(!show);
  };

  const closeMenu = () => {
    setShow(false);
  };

  const handleMenuClick = () => {
    closeMenu();
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav>
      <div className="logo">zestora</div>

      {/* Backdrop overlay for mobile menu */}
      <div 
        className={`menu-backdrop ${show ? 'show' : ''}`} 
        onClick={closeMenu}
      ></div>

      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          {data[0].navbarLinks.map((element) => (
            <Link
              to={element.link}
              key={element.id}
              spy={true}
              smooth={true}
              duration={500}
              onClick={closeMenu}
            >
              {element.title}
            </Link>
          ))}
        </div>
        <div className="navbar-buttons">
          <button className="menu-btn" onClick={handleMenuClick}>
            Our Menu
          </button>
          <button className="cart-btn" onClick={onCartOpen}>
            <FaShoppingCart />
            <span className="cart-text">Cart</span>
          </button>
        </div>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;
