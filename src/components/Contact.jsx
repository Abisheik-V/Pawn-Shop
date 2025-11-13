import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/style/style.css';

const Contact = () => {
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
            <h1 className="fw-bold mb-2 text-dark">Contact</h1>
            <p className="mb-0 text-dark">Have a question? Send us a message and we’ll get back to you soon.</p>
          </div>
        </section>

        <section className="py-4 services-section" data-aos="fade-up">
          <div className="container">
            <div className="row g-4">
              <div className="col-12 col-lg-7">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="fw-semibold mb-3">Send a Message</h5>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <div className="row g-3">
                        <div className="col-12 col-md-6">
                          <label className="form-label">Name</label>
                          <input type="text" className="form-control" required />
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label">Email</label>
                          <input type="email" className="form-control" required />
                        </div>
                        <div className="col-12">
                          <label className="form-label">Subject</label>
                          <input type="text" className="form-control" required />
                        </div>
                        <div className="col-12">
                          <label className="form-label">Message</label>
                          <textarea className="form-control" rows="5" required></textarea>
                        </div>
                        <div className="col-12">
                          <button className="btn btn-primary" type="submit">Send</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-5">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="fw-semibold mb-3">Store Details</h5>
                    <div className="mb-3">
                      <div className="fw-semibold">Address</div>
                      <div className="text-muted">123 Market Street, Downtown, City 12345</div>
                    </div>
                    <div className="mb-3">
                      <div className="fw-semibold">Phone</div>
                      <div className="text-muted">(+91) 98765 43210</div>
                    </div>
                    <div className="mb-3">
                      <div className="fw-semibold">Email</div>
                      <div className="text-muted">support@pawnshop.example</div>
                    </div>
                    <div>
                      <div className="fw-semibold">Hours</div>
                      <div className="text-muted">Mon–Fri: 9:00–19:00, Sat: 10:00–17:00</div>
                    </div>
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

export default Contact;

