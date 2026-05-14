import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import logo from './assets/ms solutions logo.jpg';

const links = [
  {
    title: "SSLC March Result 2026-Caste & Religion",
    desc: "SSLC Exam Portal with Caste, Religion and Category",
    url: "https://sslcexam.kerala.gov.in/sslc_exam_results.php"
  },
  {
    title: "SSLC March Result 2026-Individual",
    desc: "Digilocker Kerala",
    url: "https://results.digilocker.kerala.gov.in"
  },
  {
    title: "Portal",
    desc: "Kite Kerala Results",
    url: "https://results.kite.kerala.gov.in"
  },
  {
    title: "Exam Results Portal",
    desc: "Kerala Official Exam Results",
    url: "https://examresults.kerala.gov.in"
  },
  {
    title: "PRD Portal",
    desc: "Public Relations Department Kerala",
    url: "https://prd.kerala.gov.in"
  },
  {
    title: "Pareeksha Bhavan",
    desc: "Official Pareeksha Bhavan Portal",
    url: "https://pareekshabhavan.kerala.gov.in"
  },
  {
    title: "Digilocker Kerala",
    desc: "Digital Locker for Kerala State",
    url: "https://results.digilocker.kerala.gov.in"
  },
  {
    title: "Kerala Results",
    desc: "General Kerala Results Portal",
    url: "https://results.kerala.gov.in"
  },
  {
    title: "SSLC Result",
    desc: "SSLC Exam Results Main Site",
    url: "https://sslcexam.kerala.gov.in"
  },
  {
    title: "Public Examination Site",
    desc: "KBPE Kerala Portal",
    url: "https://kbpe.kerala.gov.in"
  }
];

function Links() {
  return (
    <div className="app-container">
      <header className="header links-header">
        <img src={logo} alt="MS Solutions Logo" className="ms-logo-header" />
        <h1 className="title">IMPORTANT LINKS</h1>
      </header>
      
      <main className="main-content">
        <div className="links-container">
          {links.map((link, index) => (
            <a 
              key={index} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="link-card"
            >
              <div className="link-card-content">
                <h3 className="link-title">{link.title}</h3>
                <p className="link-desc">{link.desc}</p>
                <span className="link-url">{link.url.replace('https://', '')}</span>
              </div>
              <div className="link-arrow">
                →
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Links;
