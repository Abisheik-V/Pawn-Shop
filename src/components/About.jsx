import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/style/style.css';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 400, once: true, offset: 80 });
  }, []);

  const team = [
    {
      id: 't1',
      name: 'Alex Carter',
      role: 'Store Manager',
      img: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&fm=jpg&fit=crop'
    },
    {
      id: 't2',
      name: 'Priya Sharma',
      role: 'Jewelry Appraiser',
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&fm=jpg&fit=crop'
    },
    {
      id: 't3',
      name: 'Diego Martínez',
      role: 'Electronics Specialist',
      img: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=800&fm=jpg&fit=crop'
    }
  ];

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
            <h1 className="fw-bold mb-2 text-dark">About Us</h1>
            <p className="mb-0 text-dark">Trusted local pawn and resale shop providing value, transparency, and service since 2010.</p>
          </div>
        </section>

        <section className="py-4" data-aos="fade-up">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-12 col-lg-6 text-center text-lg-start order-1 order-lg-1">
                <h2 className="fw-bold display-6 mb-3">Our Story</h2>
                <p className="text-muted mb-4">We started with a simple promise: offer quick, fair loans against valuables and make quality pre-owned items accessible to everyone. Each experience is designed to be transparent and helpful.</p>
                <div className="d-flex gap-2 justify-content-center justify-content-lg-start">
                  <Link to="/shop" className="btn btn-primary shadow-sm">Explore Collections</Link>
                  <Link to="/about" className="btn btn-outline-secondary">Our Mission</Link>
                </div>
              </div>
              <div className="col-12 col-lg-6 order-2 order-lg-2">
                <img
                  className="img-fluid rounded-4 shadow"
                  alt="Workshop"
                  src="https://images.unsplash.com/photo-1600431521340-491eca880813?q=80&w=1200&fm=jpg&fit=crop"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="about-values py-5 bg-dark text-white" data-aos="fade-up">
          <div className="container">
            <div className="row mb-3">
              <div className="col-12">
                <h3 className="fw-semibold">What We Value</h3>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-12 col-md-4">
                <div className="card h-100 rounded-4 border shadow-sm">
                  <div className="card-body">
                    <h4 className="fw-bold mb-2">Craftsmanship</h4>
                    <p className="text-white-50 mb-0">Hand-selected items, carefully finished and assessed by experienced staff.</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="card h-100 rounded-4 border shadow-sm">
                  <div className="card-body">
                    <h4 className="fw-bold mb-2">Sustainability</h4>
                    <p className="text-white-50 mb-0">We encourage reuse and responsible sourcing to minimize waste.</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="card h-100 rounded-4 border shadow-sm">
                  <div className="card-body">
                    <h4 className="fw-bold mb-2">Longevity</h4>
                    <p className="text-white-50 mb-0">Durable goods backed by honest guidance and aftercare tips.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5" data-aos="fade-up">
          <div className="container">
            <h3 className="fw-semibold mb-3 text-dark">Our Mission</h3>
            <p className="text-dark mb-4">We exist to make access to cash simple, fair, and respectful—while giving quality goods a meaningful second life. We focus on honesty, value, and long-term community trust.</p>
            <div className="row g-3">
              <div className="col-12 col-md-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h6 className="mb-2">Fair Access</h6>
                    <p className="text-muted mb-0">Transparent loan terms and clear evaluations for every customer.</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h6 className="mb-2">Responsible Reuse</h6>
                    <p className="text-muted mb-0">Encouraging circular buying and selling to reduce waste.</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h6 className="mb-2">Community First</h6>
                    <p className="text-muted mb-0">Friendly guidance, fair pricing, and support for local needs.</p>
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

export default About;

