import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/style/style.css';

const Login = () => {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'

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
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
              <div>
                <h1 className="fw-bold mb-1 text-dark">{mode === 'login' ? 'Login' : 'Create Account'}</h1>
                <p className="mb-0 text-dark">Access your account to manage orders and wishlist.</p>
              </div>
              <div className="btn-group" role="group">
                <button className={`btn btn-${mode==='login'?'primary':'outline-secondary'}`} onClick={() => setMode('login')}>Login</button>
                <button className={`btn btn-${mode==='signup'?'primary':'outline-secondary'}`} onClick={() => setMode('signup')}>Sign up</button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 services-section" data-aos="fade-up">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-6">
                <div className="card shadow-sm">
                  <div className="card-body">
                    {mode === 'login' ? (
                      <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input type="email" className="form-control" required />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Password</label>
                          <input type="password" className="form-control" required />
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="remember" />
                            <label className="form-check-label" htmlFor="remember">Remember me</label>
                          </div>
                          <a href="#" className="small">Forgot password?</a>
                        </div>
                        <button className="btn btn-primary w-100" type="submit">Login</button>
                      </form>
                    ) : (
                      <form onSubmit={(e) => e.preventDefault()}>
                        <div className="row g-3">
                          <div className="col-12 col-md-6">
                            <label className="form-label">First name</label>
                            <input type="text" className="form-control" required />
                          </div>
                          <div className="col-12 col-md-6">
                            <label className="form-label">Last name</label>
                            <input type="text" className="form-control" required />
                          </div>
                          <div className="col-12">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" required />
                          </div>
                          <div className="col-12 col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" required />
                          </div>
                          <div className="col-12 col-md-6">
                            <label className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" required />
                          </div>
                          <div className="col-12">
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="tos" required />
                              <label className="form-check-label" htmlFor="tos">I agree to the Terms of Service</label>
                            </div>
                          </div>
                          <div className="col-12">
                            <button className="btn btn-primary w-100" type="submit">Create account</button>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
                <div className="text-center mt-3">
                  {mode === 'login' ? (
                    <span className="text-muted">New here? <button className="btn btn-link p-0" onClick={() => setMode('signup')}>Create an account</button></span>
                  ) : (
                    <span className="text-muted">Already have an account? <button className="btn btn-link p-0" onClick={() => setMode('login')}>Login</button></span>
                  )}
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

export default Login;

