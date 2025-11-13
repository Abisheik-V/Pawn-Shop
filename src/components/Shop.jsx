import React, { useMemo, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/style/style.css';

const PRODUCTS = [
  // Jewelry
  { id: 'p1', name: 'Gold Ring 18K', price: 299.0, category: 'Jewelry', img: 'https://m.media-amazon.com/images/I/61oqpQ2zfrL._AC_UY1100_.jpg' },
  { id: 'p2', name: 'Silver Necklace', price: 120.0, category: 'Jewelry', img: 'https://www.voylla.com/cdn/shop/products/VMJAI90093_CS.jpg?v=1702734250' },
  { id: 'p3', name: 'Diamond Earrings', price: 549.0, category: 'Jewelry', img: 'https://m.media-amazon.com/images/I/81aQ5xMecdL._AC_UY300_.jpg' },
  { id: 'p4', name: 'Pearl Bracelet', price: 210.0, category: 'Jewelry', img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&fm=jpg&fit=crop' },
  { id: 'p5', name: 'Gold Bangle', price: 329.0, category: 'Jewelry', img: 'https://m.media-amazon.com/images/I/61q2lAzTbtL._AC_UY1100_.jpg' },
  { id: 'p6', name: 'Sapphire Pendant', price: 459.0, category: 'Jewelry', img: 'https://m.media-amazon.com/images/I/51LcqgE7QNL._AC_UY1100_.jpg' },

  // Instruments
  { id: 'p7', name: 'Acoustic Guitar', price: 189.0, category: 'Instruments', img: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=800&fm=jpg&fit=crop' },
  { id: 'p8', name: 'Electric Guitar', price: 349.0, category: 'Instruments', img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&fm=jpg&fit=crop' },
  { id: 'p9', name: 'Digital Piano', price: 599.0, category: 'Instruments', img: 'https://images.unsplash.com/photo-1513883049090-d0b7439799bf?q=80&w=800&fm=jpg&fit=crop' },
  { id: 'p10', name: 'Violin', price: 279.0, category: 'Instruments', img: 'https://m.media-amazon.com/images/I/41pDplo0HdL._SR290,290_.jpg' },
  { id: 'p11', name: 'Drum Set', price: 499.0, category: 'Instruments', img: 'https://m.media-amazon.com/images/I/81cwieZPnAL.jpg' },
  { id: 'p12', name: 'Alto Saxophone', price: 389.0, category: 'Instruments', img: 'https://m.media-amazon.com/images/I/71PZRXI1sGL._AC_UF1000,1000_QL80_.jpg' },

  // Electronics
  { id: 'p13', name: 'DSLR Camera', price: 449.0, category: 'Electronics', img: 'https://m.media-amazon.com/images/I/71bEYFvV5lL._AC_UF1000,1000_QL80_.jpg' },
  { id: 'p14', name: 'Gaming Laptop', price: 899.0, category: 'Electronics', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&fm=jpg&fit=crop' },
  { id: 'p15', name: 'Smartphone', price: 599.0, category: 'Electronics', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&fm=jpg&fit=crop' },
  { id: 'p16', name: 'Tablet', price: 329.0, category: 'Electronics', img: 'https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Computers%20Peripherals/Tablets%20and%20iPads/Images/308032_eo0iwq.png' },
  { id: 'p17', name: 'Wireless Headphones', price: 159.0, category: 'Electronics', img: 'https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/271047_0_yaama6.png' },
  { id: 'p18', name: 'Smart TV 50"', price: 699.0, category: 'Electronics', img: 'https://5.imimg.com/data5/SELLER/Default/2024/4/414858076/MO/NY/KD/25797129/4k-ultra-hd-50-inch-smart-led-tv.jpeg' },

  // Accessories
  { id: 'p19', name: 'Wrist Watch', price: 150.0, category: 'Accessories', img: 'https://gallantry.com/cdn/shop/articles/History_of_Watches.jpg?v=1656230050' },
  { id: 'p20', name: 'Sunglasses', price: 79.0, category: 'Accessories', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&fm=jpg&fit=crop' },
  { id: 'p21', name: 'Leather Belt', price: 49.0, category: 'Accessories', img: 'https://teakwoodleathers.com/cdn/shop/products/T_BT_751_BR_1_1080x.jpg?v=1750933855' },
  { id: 'p22', name: 'Travel Backpack', price: 119.0, category: 'Accessories', img: 'https://carrypro.in/cdn/shop/files/White1_1.jpg?v=1711703956&width=1080' },
  { id: 'p23', name: 'Men Wallet', price: 39.0, category: 'Accessories', img: 'https://teakwoodleathers.com/cdn/shop/files/T_WLT_533_BR_1_1080x.jpg?v=1750933434' },
  { id: 'p24', name: 'Leather Handbag', price: 199.0, category: 'Accessories', img: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800&fm=jpg&fit=crop' },
];

const Shop = () => {
  const [category, setCategory] = useState('All');
  const [addingId, setAddingId] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 400, once: true, offset: 80 });
    // In case images/content mount after init
    const refresh = () => AOS.refreshHard();
    setTimeout(refresh, 50);
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  const categories = useMemo(() => ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))], []);

  const filtered = useMemo(() => {
    if (category === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === category);
  }, [category]);

  // Refresh AOS when the filtered list changes so items are revealed
  useEffect(() => {
    setTimeout(() => AOS.refreshHard(), 0);
  }, [filtered]);

  const addToCart = (product) => {
    try {
      const key = 'cart';
      const current = JSON.parse(localStorage.getItem(key) || '[]');
      const idx = current.findIndex((i) => i.id === product.id);
      if (idx >= 0) {
        current[idx].qty = (current[idx].qty || 1) + 1;
      } else {
        current.push({ id: product.id, name: product.name, price: product.price, img: product.img, qty: 1 });
      }
      localStorage.setItem(key, JSON.stringify(current));
      setAddingId(product.id);
      setTimeout(() => setAddingId(null), 900);
    } catch (e) {
      console.error('Failed to add to cart', e);
    }
  };

  return (
    <div className="app-shell d-flex flex-column min-vh-100">
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <div className="container">
            <Link className="navbar-brand fw-bold" to="/">PawnShop</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <Link className="nav-item text-decoration-none"><NavLink end className="nav-link" to="/">Home</NavLink></Link>
                <Link className="nav-item text-decoration-none"><NavLink className="nav-link" to="/shop">Shop</NavLink></Link>
                <Link className="nav-item text-decoration-none"><NavLink className="nav-link" to="/services">Services</NavLink></Link>
                <Link className="nav-item text-decoration-none"><NavLink className="nav-link" to="/about">About</NavLink></Link>
                <Link className="nav-item text-decoration-none"><NavLink className="nav-link" to="/contact">Contact</NavLink></Link>
                <Link className="nav-item text-decoration-none"><NavLink className="nav-link" to="/cart">Cart</NavLink></Link>
                <Link className="nav-item text-decoration-none"><NavLink className="nav-link" to="/login">Login</NavLink></Link>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow-1">
        <section className="shop-hero py-5 text-white" data-aos="fade-up">
          <div className="container">
            <h1 className="fw-bold mb-2 text-dark">Shop</h1>
            <p className="mb-0 text-dark">Browse verified pre-owned items with great value.</p>
          </div>
        </section>

        <section className="py-4 shop-products" data-aos="fade-up">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
              <h5 className="mb-0">Products</h5>
              <div className="d-flex align-items-center gap-2">
                <label htmlFor="category" className="form-label mb-0 me-1">Category:</label>
                <select
                  id="category"
                  className="form-select"
                  style={{ width: 220 }}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row g-4">
              {filtered.map((p) => (
                <div className="col-12 col-sm-6 col-lg-4" key={p.id} data-aos="zoom-in">
                  <div className="card product-card shadow-sm">
                    <img
                      src={p.img}
                      className="card-img-top product-img"
                      alt={p.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                    />
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title mb-1">{p.name}</h6>
                      <div className="text-muted small mb-2">{p.category}</div>
                      <div className="mt-auto d-flex align-items-center justify-content-between">
                        <span className="fw-semibold">${p.price.toFixed(2)}</span>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => addToCart(p)}
                          disabled={addingId === p.id}
                        >
                          {addingId === p.id ? 'Added' : 'Add to cart'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer mt-auto text-white pt-5 pb-4">
        <div className="container">
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-4">
              <h5 className="fw-bold">PawnShop</h5>
              <p className="small text-white-50 mb-3">
                We offer quick loans against valuables and a curated selection of pre-owned items.
              </p>
              <div className="d-flex gap-3">
                <a href="#" className="text-white-50 text-decoration-none">Facebook</a>
                <a href="#" className="text-white-50 text-decoration-none">Instagram</a>
                <a href="#" className="text-white-50 text-decoration-none">X</a>
              </div>
            </div>
            <div className="col-6 col-lg-2">
              <h6 className="fw-semibold">Company</h6>
              <ul className="list-unstyled small">
                <li><Link to="/about" className="text-white-50 text-decoration-none">About</Link></li>
                <li><Link to="/services" className="text-white-50 text-decoration-none">Services</Link></li>
                <li><Link to="/contact" className="text-white-50 text-decoration-none">Contact</Link></li>
              </ul>
            </div>
            <div className="col-6 col-lg-3">
              <h6 className="fw-semibold">Hours</h6>
              <ul className="list-unstyled small text-white-50 mb-0">
                <li>Mon–Fri: 9:00am – 7:00pm</li>
                <li>Sat: 10:00am – 5:00pm</li>
                <li>Sun: Closed</li>
              </ul>
            </div>
            <div className="col-12 col-lg-3">
              <h6 className="fw-semibold">Newsletter</h6>
              <form className="d-flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input type="email" className="form-control" placeholder="Email address" required />
                <button className="btn btn-primary" type="submit">Join</button>
              </form>
            </div>
          </div>
          <hr className="border-secondary my-4" />
          <div className="d-flex justify-content-between small text-white-50">
            <span>© {new Date().getFullYear()} PawnShop. All rights reserved.</span>
            <span>
              <Link to="/privacy" className="text-white-50 text-decoration-none me-3">Privacy</Link>
              <Link to="/terms" className="text-white-50 text-decoration-none">Terms</Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Shop;
