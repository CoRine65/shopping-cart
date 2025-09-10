import { useState, useEffect } from "react";
import Card from "./Card";
import "./Shop.css"; // we'll add some styling for the shop

function Shop({ allCards, coins, setCoins, bought, setBought }) {
  const [shopCards, setShopCards] = useState([]); // 6 random Pokémon for this shop session
  const [prices, setPrices] = useState({});       // price map: pokemon.id -> price
  const [cart, setCart] = useState([]);           // Pokémon currently in cart
  const [showCart, setShowCart] = useState(false); // controls the pop-up visibility

  // Load initial shop on first render
  useEffect(() => {
    generateShop();
  }, []);

  // --- Generate a new shop with 6 random Pokémon ---
  const generateShop = () => {
    if (!allCards || allCards.length === 0) return;

    // Randomly shuffle and select 6
    const shuffled = [...allCards].sort(() => Math.random() - 0.5);
    const six = shuffled.slice(0, 6);
    setShopCards(six);

    // Assign random prices 1-10
    const newPrices = {};
    six.forEach(p => {
      newPrices[p.id] = Math.floor(Math.random() * 10) + 1;
    });
    setPrices(newPrices);

    // Reset cart
    setCart([]);
  };

  // --- Add Pokémon to cart (no duplicates) ---
  const addToCart = (pokemon) => {
    if (!cart.find(p => p.id === pokemon.id)) {
      setCart([...cart, pokemon]);
    }
    setShowCart(true); // show pop-up whenever something is added
  };

  // --- Remove Pokémon from cart ---
  const removeFromCart = (id) => {
    setCart(cart.filter(p => p.id !== id));
  };

  // --- Pay for the items in the cart ---
  const handleCheckout = () => {
    const totalCost = cart.reduce((total, p) => total + prices[p.id], 0);

    if (coins < totalCost) {
      alert("Not enough coins!");
      return;
    }

    // Deduct coins
    setCoins(coins - totalCost);

    // Add bought Pokémon to bought list
    setBought([...bought, ...cart]);

    // Reset cart and refresh shop
    setCart([]);
    generateShop();
    setShowCart(false);
  };

  return (
    <div className="shop-container">
      <h2>Pokémon Shop 🛒</h2>
      <p className="coin-display">💰 Coins: {coins}</p>

      {/* Main shop grid */}
      <div className="grid-container">
        {shopCards.map(pokemon => (
          <div key={pokemon.id} className="shop-item">
            <Card name={pokemon.name} img={pokemon.img} />
            <p className="price">Price: {prices[pokemon.id]} coins</p>
            <button className="add-btn" onClick={() => addToCart(pokemon)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Pop-up */}
      {showCart && (
        <div className="cart-popup">
          <h3>Your Cart</h3>
          {cart.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            <ul>
              {cart.map(p => (
                <li key={p.id}>
                  {p.name} - {prices[p.id]} coins
                  <button className="remove-btn" onClick={() => removeFromCart(p.id)}>
                    ✖
                  </button>
                </li>
              ))}
            </ul>
          )}

          <p>
            Total:{" "}
            {cart.reduce((total, p) => total + prices[p.id], 0)} coins
          </p>
          <div className="cart-buttons">
            <button className="checkout-btn" onClick={handleCheckout} disabled={cart.length === 0}>
              Pay
            </button>
            <button className="close-btn" onClick={() => setShowCart(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shop;
