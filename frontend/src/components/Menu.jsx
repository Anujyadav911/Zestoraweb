import React from "react";
import { data } from "../restApi.json";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";

const Menu = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (dish) => {
    addToCart(dish);
    toast.success(`${dish.title} added to cart!`);
  };

  return (
    <>
      <section className="menu" id="menu">
        <div className="container">
          <div className="heading_section">
            <h1 className="heading">POPULAR DISHES</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga,
              iusto dolorem! Voluptatibus ipsum nam mollitia architecto. Soluta
              pariatur eius et recusandae veritatis. Quasi, et molestias!
            </p>
          </div>
          <div className="dishes_container">
            {data[0].dishes.map((element) => (
              <div className="card" key={element.id}>
                <div className="card-image">
                  <img src={element.image} alt={element.title} />
                  <button className="category-btn">{element.category}</button>
                </div>
                <div className="card-content">
                  <h3>{element.title}</h3>
                  <div className="card-info">
                    <p className="price">${element.price}</p>
                  </div>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(element)}
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Menu;
