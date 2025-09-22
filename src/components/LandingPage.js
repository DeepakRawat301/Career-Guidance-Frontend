import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="navbar-title">Career Hub</h1>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/explore" className="navbar-link">Explore</Link>
          <Link to="/profile" className="navbar-link">My Profile</Link>
          <Link to="/resources" className="navbar-link">Resources</Link>
        </div>
        <div className="login-buttons">
          <button onClick={() => navigate("/login")}>Admin</button>
          <button onClick={() => navigate("/studentlogin")}>Student</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">Find Your Path to Success</h1>
        <p className="hero-subtitle">
          Discover the perfect college for your dreams and ambitions.
          Search for programs, check eligibility, and start your journey today.
        </p>
      </section>

      {/* Top Universities */}
      {/* === Top Universities === */}
<section className="section">
        <h2 className="section-title">🎓 Top Universities</h2>
        <div className="card-grid-3">
          {[
            "Harvard University", "MIT", "Stanford University", "Oxford University",
            "Cambridge University", "Caltech", "University of Tokyo", "ETH Zurich",
            "University of Toronto", "National University of Singapore","IIT Delhi","IIT Bombay"
          ].map((name, idx) => (
            <div className={`card card-${(idx % 6) + 1}`} key={idx}>{name}</div>
          ))}
        </div>
      </section>

      {/* === Engineering Programs === */}
      <section className="section">
        <h2 className="section-title">⚙️ Engineering Programs</h2>
        <div className="card-grid-3">
          {[
            "Computer Science", "Mechanical Engineering", "Electrical Engineering",
            "Civil Engineering", "Aerospace Engineering", "Biotechnology",
            "Robotics", "Cybernetics", "AI & Data Science", "Chemical Engineering","Textile Engineering","Petro Chemical Engineering"
          ].map((program, idx) => (
            <div className={`card card-${(idx % 6) + 1}`} key={idx}>{program}</div>
          ))}
        </div>
      </section>

      {/* === Medical Schools === */}
      <section className="section">
        <h2 className="section-title">🏥 Medical Schools</h2>
        <div className="card-grid-3">
          {[
            "Harvard Medical School", "Johns Hopkins Medicine", "Mayo Clinic",
            "Stanford School of Medicine", "Yale School of Medicine",
            "UCLA Medical School", "Oxford Medical Sciences", "Cambridge Medicine",
            "Karolinska Institute", "University of Melbourne Medicine","AIIMS Delhi","AIIMS Rishikesh"
          ].map((school, idx) => (
            <div className={`card card-${(idx % 6) + 1}`} key={idx}>{school}</div>
          ))}
        </div>
      </section>

      {/* === Additional Programs === */}
      <section className="section">
        <h2 className="section-title">📚 Additional Programs</h2>
        <div className="card-grid-3">
          {[
            "Business Administration", "Economics", "Psychology", "Law",
            "Political Science", "Education", "Philosophy", "History",
            "Fine Arts", "Environmental Studies","Sociology","Physical Studies"
          ].map((program, idx) => (
            <div className={`card card-${(idx % 6) + 1}`} key={idx}>{program}</div>
          ))}
        </div>
      </section>


      {/* === FOOTER === */}
      <div className="footer-enhanced">
        <div className="footer-columns">
          <div className="footer-column">
            <h4>Get to Know Us</h4>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Press Releases</li>
              <li>AI Research</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Connect with Us</h4>
            <ul>
              <li>LinkedIn</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>YouTube</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Build with Us</h4>
            <ul>
              <li>Developer Portal</li>
              <li>API Access</li>
              <li>Affiliate Program</li>
              <li>Documentation</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li>FAQs</li>
              <li>Help Center</li>
              <li>Feedback</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Let Us Help You</h4>
            <ul>
              <li>Fulfilment</li>
              <li>Advertise</li>
              <li>Brands</li>
              <li>Selling</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 AI-driven Appointment System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
