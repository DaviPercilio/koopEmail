import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [emailData, setEmailData] = useState({
    subject: '',
    toEmail: '',
    message: 'Davi',
  });

  const handleInputChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const sendEmail = () => {
    axios.post('http://localhost:3001/api/enviar-email', emailData)
      .then(response => {
        alert(response.data); 
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Falha ao enviar email. Por fovar tente novamente!!!');
      });
  };

  return (
    <div className="App">
      <h2>Teste Email Koop</h2>
      <form>
        <label htmlFor="subject">Assunto:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={emailData.subject}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="toEmail">Destino Email:</label>
        <input
          type="email"
          id="toEmail"
          name="toEmail"
          value={emailData.toEmail}
          onChange={handleInputChange}
          required
        />

        <button type="button" onClick={sendEmail}>Enviar Email</button>
      </form>
    </div>
  );
}

export default App;
