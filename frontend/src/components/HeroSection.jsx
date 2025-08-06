import React from "react";
const HeroSection = () => {
  return (
    <section className="heroSection" id="heroSection">
      <div className="container">
        {/* First Banner */}
        <div className="banner">
          <div className="largeBox">
            <h1 className="title">Delicious</h1>
          </div>
          <div className="combined_boxes">
            <div className="imageBox">
              <img src="/hero1.png" alt="Delicious Dish" />
            </div>
            <div className="textAndLogo">
              <div className="textWithSvg">
                <h2 className="title">Food</h2>
                <h2 className="title dishes_title">Dishes</h2>
                <img src="/threelines.svg" alt="Decorative lines" />
              </div>
              <img src="/logo.svg" alt="Website Logo" className="logo" />
            </div>
          </div>
        </div>

        {/* Second Banner */}
        <div className="banner">
          <div className="imageBox">
            <img src="/hero2.png" alt="Tasty Dish" />
          </div>
          <h2 className="title dishes_title">Dishes</h2>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
