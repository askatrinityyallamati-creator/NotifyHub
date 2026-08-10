import Navbar from "../components/Navbar";

function Contact() {
  return (
    <>
      <Navbar />

      <main className="contact-page">

        <section className="page-header">
          <p className="page-label">GET IN TOUCH</p>

          <h1>Contact Us</h1>

          <p>
            Have a question, suggestion or issue? We are here to help.
          </p>
        </section>

        <section className="contact-container">

          <div className="contact-info">

            <h2>Let's connect</h2>

            <p>
              Contact the NotifyHub team for questions, feedback,
              technical issues or campus-related information.
            </p>

            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div>
                <h3>Email</h3>
                <p>notifyhub@college.edu</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div>
                <h3>Phone</h3>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <h3>Campus Office</h3>
                <p>Student Services Block, Main Campus</p>
              </div>
            </div>

          </div>

          <form className="contact-form">

            <div className="form-group">
              <label htmlFor="name">Your Name</label>

              <input
                id="name"
                type="text"
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>

              <input
                id="subject"
                type="text"
                placeholder="What is this about?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>

              <textarea
                id="message"
                rows={6}
                placeholder="Write your message..."
              />
            </div>

            <button type="submit" className="contact-submit">
              Send Message →
            </button>

          </form>

        </section>

      </main>
    </>
  );
}

export default Contact;