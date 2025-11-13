import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/style/style.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [shipping, setShipping] = useState('standard'); // standard|express
  const [method, setMethod] = useState('cod'); // cod|card|upi
  const [address, setAddress] = useState({ name: '', phone: '', line1: '', line2: '', city: '', state: '', zip: '' });
  const [promo, setPromo] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 400, once: true, offset: 80 });
    try {
      const data = JSON.parse(localStorage.getItem('cart') || '[]');
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    }
  }, []);

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * (i.qty || 1), 0), [items]);
  const shippingCost = shipping === 'express' ? 14.99 : items.length > 0 ? 4.99 : 0;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const discount = Math.min(promoDiscount, subtotal);
  const total = Math.max(0, Math.round((subtotal + tax + shippingCost - discount) * 100) / 100);

  const applyPromo = (e) => {
    e.preventDefault();
    const code = promo.trim().toUpperCase();
    if (!code) return;
    // Simple demo rules
    if (code === 'WELCOME10') setPromoDiscount(Math.round(subtotal * 0.1 * 100) / 100);
    else if (code === 'FREESHIP') setPromoDiscount(Math.min(shippingCost, 9.99));
    else setPromoDiscount(0);
  };

  const etaDays = shipping === 'express' ? 2 : 5;
  const placeOrder = (e) => {
    e.preventDefault();
    if (!address.name || !address.phone || !address.line1 || !address.city || !address.state || !address.zip) {
      alert('Please complete your shipping address.');
      return;
    }
    const order = {
      id: 'ord_' + Date.now(),
      items,
      address,
      method,
      shipping,
      amounts: { subtotal, tax, shipping: shippingCost, discount, total },
      createdAt: new Date().toISOString(),
      deliveryEta: new Date(Date.now() + etaDays * 24 * 60 * 60 * 1000).toISOString(),
    };
    try {
      const prev = JSON.parse(localStorage.getItem('orders') || '[]');
      prev.push(order);
      localStorage.setItem('orders', JSON.stringify(prev));
      localStorage.setItem('cart', JSON.stringify([]));
      setPlacedOrder(order);
      setShowReceipt(true);
    } catch (err) {
      console.error(err);
      alert('Failed to place order. Please try again.');
    }
  };

  const printReceipt = () => {
    if (!placedOrder) return;
    const w = window.open('', '_blank');
    if (!w) return;
    const itemsHtml = placedOrder.items.map(i => `
      <tr>
        <td>${i.name}</td>
        <td style="text-align:center;">${i.qty || 1}</td>
        <td style="text-align:right;">$${i.price.toFixed(2)}</td>
        <td style="text-align:right;">$${(i.price * (i.qty || 1)).toFixed(2)}</td>
      </tr>
    `).join('');
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Receipt ${placedOrder.id}</title>
      <style>
        body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;margin:24px;color:#111}
        h1{font-size:20px;margin:0 0 8px}
        .muted{color:#555}
        table{width:100%;border-collapse:collapse;margin-top:12px}
        th,td{padding:8px;border-bottom:1px solid #ddd}
        .right{text-align:right}
        .total{font-weight:600}
        .grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:8px}
        .box{border:1px solid #ddd;border-radius:8px;padding:12px}
      </style></head><body>
      <h1>Receipt</h1>
      <div class="muted">Order ID: ${placedOrder.id} • ${new Date(placedOrder.createdAt).toLocaleString()}</div>
      <div class="grid">
        <div class="box">
          <strong>Ship To</strong><br/>
          ${placedOrder.address.name}<br/>
          ${placedOrder.address.phone}<br/>
          ${placedOrder.address.line1}${placedOrder.address.line2 ? ', '+placedOrder.address.line2 : ''}<br/>
          ${placedOrder.address.city}, ${placedOrder.address.state} ${placedOrder.address.zip}
        </div>
        <div class="box">
          <strong>Delivery</strong><br/>
          ${placedOrder.shipping === 'express' ? 'Express (1-2 days)' : 'Standard (3-5 days)'}<br/>
          Est. Delivery: ${new Date(placedOrder.deliveryEta).toDateString()}<br/>
          Payment: ${placedOrder.method.toUpperCase()}
        </div>
      </div>
      <table>
        <thead><tr><th>Item</th><th>Qty</th><th class="right">Price</th><th class="right">Subtotal</th></tr></thead>
        <tbody>${itemsHtml}</tbody>
        <tfoot>
          <tr><td colspan="3" class="right muted">Subtotal</td><td class="right">$${placedOrder.amounts.subtotal.toFixed(2)}</td></tr>
          <tr><td colspan="3" class="right muted">Tax</td><td class="right">$${placedOrder.amounts.tax.toFixed(2)}</td></tr>
          <tr><td colspan="3" class="right muted">Shipping</td><td class="right">$${placedOrder.amounts.shipping.toFixed(2)}</td></tr>
          ${placedOrder.amounts.discount ? `<tr><td colspan="3" class="right muted">Discount</td><td class="right">- $${placedOrder.amounts.discount.toFixed(2)}</td></tr>` : ''}
          <tr class="total"><td colspan="3" class="right">Total</td><td class="right">$${placedOrder.amounts.total.toFixed(2)}</td></tr>
        </tfoot>
      </table>
      <script>window.onload = () => { window.print(); }<\/script>
      </body></html>`;
    w.document.write(html);
    w.document.close();
  };

  const shareReceipt = async () => {
    if (!placedOrder) return;
    const text = `Order ${placedOrder.id}\nTotal: $${placedOrder.amounts.total.toFixed(2)}\nETA: ${new Date(placedOrder.deliveryEta).toDateString()}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Order Receipt', text });
      } else {
        await navigator.clipboard.writeText(text);
        alert('Receipt summary copied to clipboard');
      }
    } catch {}
  };

  return (
    <div className="app-shell d-flex flex-column min-vh-100">
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <div className="container">
            <Link className="navbar-brand fw-bold" to="/">PawnShop</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
            <h1 className="fw-bold mb-2 text-dark">Checkout</h1>
            <p className="mb-0 text-dark">Complete your purchase securely.</p>
          </div>
        </section>

        <section className="py-4 services-section" data-aos="fade-up">
          <div className="container">
            <div className="row g-4">
              <div className="col-12 col-lg-8">
                {/* Address */}
                <div className="card shadow-sm mb-3">
                  <div className="card-body">
                    <h5 className="fw-semibold mb-3">Shipping Address</h5>
                    <form className="row g-3" onSubmit={(e)=>e.preventDefault()}>
                      <div className="col-12 col-md-6">
                        <label className="form-label">Full Name</label>
                        <input className="form-control" value={address.name} onChange={e=>setAddress({...address, name:e.target.value})} required />
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="form-label">Phone</label>
                        <input className="form-control" value={address.phone} onChange={e=>setAddress({...address, phone:e.target.value})} required />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Address Line 1</label>
                        <input className="form-control" value={address.line1} onChange={e=>setAddress({...address, line1:e.target.value})} required />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Address Line 2 (Optional)</label>
                        <input className="form-control" value={address.line2} onChange={e=>setAddress({...address, line2:e.target.value})} />
                      </div>
                      <div className="col-12 col-md-4">
                        <label className="form-label">City</label>
                        <input className="form-control" value={address.city} onChange={e=>setAddress({...address, city:e.target.value})} required />
                      </div>
                      <div className="col-12 col-md-4">
                        <label className="form-label">State</label>
                        <input className="form-control" value={address.state} onChange={e=>setAddress({...address, state:e.target.value})} required />
                      </div>
                      <div className="col-12 col-md-4">
                        <label className="form-label">ZIP</label>
                        <input className="form-control" value={address.zip} onChange={e=>setAddress({...address, zip:e.target.value})} required />
                      </div>
                    </form>
                  </div>
                </div>

                {/* Delivery */}
                <div className="card shadow-sm mb-3">
                  <div className="card-body">
                    <h5 className="fw-semibold mb-3">Delivery Options</h5>
                    <div className="d-flex flex-column gap-2">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" id="shipStd" checked={shipping==='standard'} onChange={()=>setShipping('standard')} />
                        <label className="form-check-label" htmlFor="shipStd">Standard (3-5 days) — $4.99</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" id="shipExp" checked={shipping==='express'} onChange={()=>setShipping('express')} />
                        <label className="form-check-label" htmlFor="shipExp">Express (1-2 days) — $14.99</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div className="card shadow-sm mb-3">
                  <div className="card-body">
                    <h5 className="fw-semibold mb-3">Payment Method</h5>
                    <div className="row g-3">
                      <div className="col-12">
                        <div className="d-flex gap-3 flex-wrap">
                          <div className="form-check">
                            <input className="form-check-input" type="radio" id="payCOD" checked={method==='cod'} onChange={()=>setMethod('cod')} />
                            <label className="form-check-label" htmlFor="payCOD">Cash on Delivery</label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" id="payCard" checked={method==='card'} onChange={()=>setMethod('card')} />
                            <label className="form-check-label" htmlFor="payCard">Credit/Debit Card</label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" id="payUPI" checked={method==='upi'} onChange={()=>setMethod('upi')} />
                            <label className="form-check-label" htmlFor="payUPI">UPI</label>
                          </div>
                        </div>
                      </div>

                      {method === 'card' && (
                        <div className="col-12">
                          <div className="row g-3">
                            <div className="col-12">
                              <label className="form-label">Card Number</label>
                              <input className="form-control" placeholder="4242 4242 4242 4242" />
                            </div>
                            <div className="col-6">
                              <label className="form-label">Expiry</label>
                              <input className="form-control" placeholder="MM/YY" />
                            </div>
                            <div className="col-6">
                              <label className="form-label">CVV</label>
                              <input className="form-control" placeholder="123" />
                            </div>
                          </div>
                        </div>
                      )}

                      {method === 'upi' && (
                        <div className="col-12">
                          <label className="form-label">UPI ID</label>
                          <input className="form-control" placeholder="name@bank" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="col-12 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="fw-semibold mb-3">Order Summary</h5>
                    <div className="mb-3" style={{maxHeight: 220, overflowY: 'auto'}}>
                      {items.length === 0 ? (
                        <div className="text-muted small">Your cart is empty.</div>
                      ) : (
                        items.map(i => (
                          <div key={i.id} className="d-flex align-items-center justify-content-between mb-2">
                            <div className="d-flex align-items-center gap-2">
                              {i.img && (
                                <img src={i.img} alt={i.name} width="40" height="40" className="rounded object-fit-cover border" loading="lazy" referrerPolicy="no-referrer" crossOrigin="anonymous" />
                              )}
                              <span className="small">{i.name} × {i.qty || 1}</span>
                            </div>
                            <span className="small">${(i.price * (i.qty || 1)).toFixed(2)}</span>
                          </div>
                        ))
                      )}
                    </div>

                    <form className="d-flex gap-2 mb-3" onSubmit={applyPromo}>
                      <input className="form-control" placeholder="Promo code" value={promo} onChange={e=>setPromo(e.target.value)} />
                      <button className="btn btn-outline-secondary" type="submit">Apply</button>
                    </form>

                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Shipping</span>
                      <span>${shippingCost.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="d-flex justify-content-between mb-2 text-success">
                        <span>Discount</span>
                        <span>- ${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <hr />
                    <div className="d-flex justify-content-between fw-semibold mb-3">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <button className="btn btn-primary w-100" type="button" disabled={items.length===0} onClick={placeOrder}>Place Order</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {showReceipt && placedOrder && (
        <div className="position-fixed top-0 start-0 w-100 h-100" style={{background:'rgba(0,0,0,0.5)', zIndex:1050}}>
          <div className="container h-100 d-flex align-items-center justify-content-center">
            <div className="bg-white rounded-3 shadow p-3 p-md-4" style={{maxWidth:720, width:'100%'}}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">Receipt</h5>
                <button className="btn btn-sm btn-outline-secondary" onClick={()=>setShowReceipt(false)}>×</button>
              </div>
              <div className="small text-muted mb-2">Order ID: {placedOrder.id} • {new Date(placedOrder.createdAt).toLocaleString()}</div>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <div className="border rounded-3 p-2 h-100">
                    <div className="fw-semibold mb-1">Ship To</div>
                    <div className="small">
                      {placedOrder.address.name}<br/>
                      {placedOrder.address.phone}<br/>
                      {placedOrder.address.line1}{placedOrder.address.line2 ? ', '+placedOrder.address.line2 : ''}<br/>
                      {placedOrder.address.city}, {placedOrder.address.state} {placedOrder.address.zip}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="border rounded-3 p-2 h-100">
                    <div className="fw-semibold mb-1">Delivery</div>
                    <div className="small">
                      {placedOrder.shipping === 'express' ? 'Express (1-2 days)' : 'Standard (3-5 days)'}<br/>
                      Est. Delivery: {new Date(placedOrder.deliveryEta).toDateString()}<br/>
                      Payment: {placedOrder.method.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive mt-3">
                <table className="table table-sm align-middle">
                  <thead className="table-light">
                    <tr><th>Item</th><th className="text-center">Qty</th><th className="text-end">Price</th><th className="text-end">Subtotal</th></tr>
                  </thead>
                  <tbody>
                    {placedOrder.items.map(i => (
                      <tr key={i.id}>
                        <td className="d-flex align-items-center gap-2">
                          {i.img && (<img src={i.img} alt={i.name} width="36" height="36" className="rounded object-fit-cover border" loading="lazy" referrerPolicy="no-referrer" crossOrigin="anonymous" />)}
                          <span className="small">{i.name}</span>
                        </td>
                        <td className="text-center small">{i.qty || 1}</td>
                        <td className="text-end small">${i.price.toFixed(2)}</td>
                        <td className="text-end small">${(i.price * (i.qty || 1)).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr><td colSpan={3} className="text-end text-muted small">Subtotal</td><td className="text-end small">${placedOrder.amounts.subtotal.toFixed(2)}</td></tr>
                    <tr><td colSpan={3} className="text-end text-muted small">Tax</td><td className="text-end small">${placedOrder.amounts.tax.toFixed(2)}</td></tr>
                    <tr><td colSpan={3} className="text-end text-muted small">Shipping</td><td className="text-end small">${placedOrder.amounts.shipping.toFixed(2)}</td></tr>
                    {placedOrder.amounts.discount ? (<tr><td colSpan={3} className="text-end text-muted small">Discount</td><td className="text-end small">- ${placedOrder.amounts.discount.toFixed(2)}</td></tr>) : null}
                    <tr><td colSpan={3} className="text-end fw-semibold small">Total</td><td className="text-end fw-semibold small">${placedOrder.amounts.total.toFixed(2)}</td></tr>
                  </tfoot>
                </table>
              </div>
              <div className="d-flex flex-wrap gap-2 justify-content-end mt-2">
                <button className="btn btn-outline-secondary" onClick={shareReceipt}>Share</button>
                <button className="btn btn-outline-primary" onClick={printReceipt}>Print</button>
                <button className="btn btn-outline-dark" onClick={()=>{ setShowReceipt(false); navigate('/shop'); }}>Continue Shopping</button>
                <button className="btn btn-primary" onClick={()=>{ setShowReceipt(false); navigate('/'); }}>Done</button>
              </div>
            </div>
          </div>
        </div>
      )}

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

export default Checkout;

