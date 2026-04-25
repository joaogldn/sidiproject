import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from './../../assets/logosidi.png';
import './ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const navigate = useNavigate();
  const goToLoginPage = () => {
    navigate('/');
  }

  const validateEmail = (emailValue) => {
    if (!emailValue) {
      setEmailError('Email é obrigatório');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError('Email é inválido');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value) {
      validateEmail(value);
    } else {
      setEmailError('');
    }
  };

  const handleRecoverPassword = () => {
    if (validateEmail(email)) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setCodeSent(true);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && email && !emailError) {
      handleRecoverPassword();
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <div className="forgot-header">
          <div className="logo-wrapper">
            <img src={logoImage} alt="SIDI" className="logo" />
          </div>
          <h1>Recuperar Senha</h1>
          <p>Digite seu email para receber o código de verificação</p>
        </div>

        <div className="forgot-form">
          {!codeSent ? (
            <>
              <div className="input-group">
                <label>Endereço de Email</label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => validateEmail(email)}
                  onKeyPress={handleKeyPress}
                  className={emailError ? 'error' : ''}
                />
                {emailError && <div className="error-message">{emailError}</div>}
              </div>

              <button
                type="button"
                className="recover-btn"
                disabled={!email || emailError || isLoading}
                onClick={handleRecoverPassword}>
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Enviando...
                  </>
                ) : (
                  'Enviar Código'
                )}
              </button>
            </>
          ) : (
            <div className="success-message">
              <div className="success-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3>Código Enviado!</h3>
              <p>Enviamos um código de verificação para <strong>{email}</strong></p>
              <p className="small-text">Verifique sua caixa de entrada ou spam</p>
              <button className="back-btn" onClick={goToLoginPage}>
                Voltar para Login
              </button>
            </div>
          )}

          {!codeSent && (
            <button
              type="button"
              className="back-link"
              onClick={goToLoginPage}>
              Voltar para Login
            </button>
          )}
        </div>

        <div className="forgot-footer">
          <p>Sistema de Ponto Eletrônico - SIDI</p>
          <p className="version">Versão 2.0</p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;