import { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import logoImage from './../../assets/logosidi.png';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();
  const goToForgotPasswordPage = () => {
    navigate('/forgotpassword');
  };

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

  const validatePassword = (passwordValue) => {
    if (!passwordValue) {
      setPasswordError('Senha é obrigatória');
      return false;
    }
    setPasswordError('');
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

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value) {
      validatePassword(value);
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (isEmailValid && isPasswordValid) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/home');
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-wrapper">
            <img src={logoImage} alt="SIDI" className="logo" />
          </div>
          <h1>Acesso ao Sistema</h1>
          <p>Informe suas credenciais para continuar</p>
        </div>

        <div className="login-form">
          <div className="input-group">
            <label>Endereço de Email</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => validateEmail(email)}
              className={emailError ? 'error' : ''}
            />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>

          <div className="input-group">
            <label>Senha</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => validatePassword(password)}
                className={passwordError ? 'error' : ''}
              />
              <button
                type="button"
                className="eye-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
            {passwordError && <div className="error-message">{passwordError}</div>}
          </div>

          <div className="login-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Manter conectado</span>
            </label>
            <button
              type="button"
              className="forgot-link"
              onClick={goToForgotPasswordPage}>
              Esqueci minha senha
            </button>
          </div>

          <button
            type="button"
            className="login-btn"
            onClick={handleSubmit}
            disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Entrando...
              </>
            ) : (
              'Entrar no Sistema'
            )}
          </button>
        </div>

        <div className="login-footer">
          <p>Sistema de Ponto Eletrônico - SIDI</p>
          <p className="version">Versão 2.0</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;