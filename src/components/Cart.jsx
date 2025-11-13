import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/style/style.css';

const Cart = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    AOS.init({ duration: 400, once: true, offset: 80 });
    try {
      const data = JSON.parse(localStorage.getItem('cart') || '[]');
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    }
  }, []);

  const write = (next) => {
    setItems(next);
    localStorage.setItem('cart', JSON.stringify(next));
  };

  const inc = (id) => {
    const next = items.map(i => i.id === id ? { ...i, qty: (i.qty || 1) + 1 } : i);
    write(next);
  };
  const dec = (id) => {
    const next = items
      .map(i => i.id === id ? { ...i, qty: Math.max(1, (i.qty || 1) - 1) } : i)
      .filter(i => i.qty > 0);
    write(next);
  };
  const removeItem = (id) => {
    write(items.filter(i => i.id !== id));
  };
  const clear = () => write([]);

  const subtotal = items.reduce((s, i) => s + i.price * (i.qty || 1), 0);
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;

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
        <section className="py-5" data-aos="fade-up">
          <div className="container">
            <h1 className="fw-bold mb-2 text-dark">Cart</h1>
            <p className="mb-0 text-dark">Review your items and proceed to checkout.</p>
          </div>
        </section>

        <section className="py-4 services-section" data-aos="fade-up">
          <div className="container">
            <div className="row g-4">
              <div className="col-12 col-lg-8">
                <div className="card shadow-sm">
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table align-middle mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Product</th>
                            <th className="text-center" style={{width: 160}}>Qty</th>
                            <th className="text-end" style={{width: 140}}>Price</th>
                            <th className="text-end" style={{width: 140}}>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.length === 0 ? (
                            <tr>
                              <td colSpan={4} className="text-center py-4 text-muted">Your cart is empty.</td>
                            </tr>
                          ) : (
                            items.map((item) => (
                              <tr key={item.id}>
                                <td className="d-flex align-items-center justify-content-between justify-content-md-start gap-3">
                                  {item.img && (
                                    <img
                                      src={item.img}
                                      alt={item.name}
                                      width="56"
                                      height="56"
                                      className="rounded object-fit-cover border"
                                      loading="lazy"
                                      referrerPolicy="no-referrer"
                                      crossOrigin="anonymous"
                                    />
                                  )}
                                  <span className="flex-grow-1">{item.name}</span>
                                  <button className="btn btn-sm btn-outline-danger ms-md-3" onClick={() => removeItem(item.id)}>Remove</button>
                                </td>
                                <td className="text-center">
                                  <div className="btn-group" role="group">
                                    <button className="btn btn-outline-secondary btn-sm" onClick={() => dec(item.id)}>-</button>
                                    <span className="btn btn-light btn-sm disabled" style={{minWidth: 48}}>{item.qty || 1}</span>
                                    <button className="btn btn-outline-secondary btn-sm" onClick={() => inc(item.id)}>+</button>
                                  </div>
                                </td>
                                <td className="text-end">${item.price.toFixed(2)}</td>
                                <td className="text-end">${(item.price * (item.qty || 1)).toFixed(2)}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <Link to="/shop" className="btn btn-outline-secondary">Continue Shopping</Link>
                  <button className="btn btn-outline-danger" onClick={clear} disabled={items.length===0}>Clear Cart</button>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="fw-semibold mb-3">Order Summary</h5>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between fw-semibold mb-3">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <Link to="/checkout" className="btn btn-primary w-100" role="button">Checkout</Link>
                  </div>
                </div>
              </div>
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

export default Cart;

