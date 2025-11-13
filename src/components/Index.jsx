import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/style/style.css';

const Index = () => {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 80 });
  }, []);

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
                <Link to="/" className="nav-item text-decoration-none">
                  <NavLink end className="nav-link" to="/">Home</NavLink>
                </Link>
                <Link to="/shop" className="nav-item text-decoration-none">
                  <NavLink className="nav-link" to="/shop">Shop</NavLink>
                </Link>
                <Link to="/services" className="nav-item text-decoration-none">
                  <NavLink className="nav-link" to="/services">Services</NavLink>
                </Link>
                <Link to="/about" className="nav-item text-decoration-none">
                  <NavLink className="nav-link" to="/about">About</NavLink>
                </Link>
                <Link to="/contact" className="nav-item text-decoration-none">
                  <NavLink className="nav-link" to="/contact">Contact</NavLink>
                </Link>
                <Link to="/cart" className="nav-item text-decoration-none">
                  <NavLink className="nav-link" to="/cart">Cart</NavLink>
                </Link>
                <Link to="/login" className="nav-item text-decoration-none">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </Link>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow-1">
        <section className="hero-section text-white" data-aos="fade-up">
          <div className="container py-5">
            <div className="row align-items-center">
              <div className="col-12 col-lg-7" data-aos="fade-right">
                <h1 className="display-5 fw-bold">Fast Cash. Fair Value.</h1>
                <p className="lead mt-3 mb-4">
                  Your trusted neighborhood pawn shop for loans, gold exchange, and quality pre-owned goods.
                </p>
                <div className="d-flex gap-3">
                  <Link to="/services" className="btn btn-primary btn-lg">Get a Loan</Link>
                  <Link to="/shop" className="btn btn-outline-light btn-lg">Browse Items</Link>
                </div>
              </div>
              <div className="col-12 col-lg-5 mt-4 mt-lg-0" data-aos="fade-left">
                <div className="hero-card shadow rounded-4 p-4 bg-white text-dark">
                  <h5 className="mb-3">Why choose us?</h5>
                  <ul className="list-unstyled mb-0 small">
                    <li className="mb-2">• Transparent rates and instant appraisals</li>
                    <li className="mb-2">• Secure storage and verified items</li>
                    <li className="mb-2">• Friendly support and same-day cash</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section py-5" data-aos="fade-up">
          <div className="container">
            <div className="text-center mb-4">
              <h2 className="fw-semibold">What we do</h2>
              <p className="text-muted mb-0">Simple, safe, and fast services for your needs</p>
            </div>
            <div className="row g-4">
              <div className="col-12 col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay="50">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Collateral Loans</h5>
                    <p className="card-text text-muted">Bring valuables and get quick cash with flexible terms.</p>
                    <Link to="/services" className="stretched-link">Learn more</Link>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay="100">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Gold Exchange</h5>
                    <p className="card-text text-muted">Competitive rates for gold, silver, and precious metals.</p>
                    <Link to="/services" className="stretched-link">Learn more</Link>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay="150">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Pre-owned Items</h5>
                    <p className="card-text text-muted">Shop verified electronics, jewelry, instruments, and more.</p>
                    <Link to="/shop" className="stretched-link">Explore</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer mt-auto bg-dark text-white pt-5 pb-4">
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

export default Index;

