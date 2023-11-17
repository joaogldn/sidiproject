// EsqueceuSenhaPage.tsx

import React, { useState } from 'react';
import ValidationError from './../../components/validation-error/ValidationError';
import { isEmailValid } from './../../helpers/EmailHelper';
import { useNavigate } from 'react-router-dom';

import smallImage from './../../assets/logosidi.png';
import logoImage from './../../assets/nomesidi.png';
import './EsqueciaSenha.css';

function EsqueciaSenha() {
  const [email, setEmail] = useState("");
  const [emailChanged, setEmailChanged] = useState(false);

  const navigate = useNavigate();
  const goToLoginPage = () => {
    navigate('/');
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailChanged(true);
  };

  const handleRecoverPassword = () => {

    console.log(`Password recovery requested for email: ${email}`);
  };

  return (
    <main className='centralize'>
      <img
        src={smallImage}
        alt="Imagem Pequena"
        className="small-image"
      />
      <form>
        <img
          src={logoImage}
          alt="Logo"
          className="logo"
        />
        <input
          type="email"
          placeholder='Digite seu email de verificação'
          value={email}
          onChange={handleEmailChange}
          data-testid='email' />
        <ValidationError
          hasChanged={emailChanged}
          errorMessage='Email é obrigatório'
          testId='email-required'
          type='required'
          value={email}/>
        <ValidationError
          hasChanged={emailChanged}
          errorMessage='Email é inválido'
          testId='email-invalid'
          type='email'
          value={email}/>
        
        <button
          type="button"
          className='solid'
          data-testid="recover-password-button"
          disabled={!isEmailValid(email)}
          onClick={handleRecoverPassword}>
          Enviar Código
        </button>
        <button
          type="button"
          className='outline'
          data-testid="back-to-login-button"
          onClick={goToLoginPage}>
          Voltar para Login
        </button>
      </form>
    </main>
  );
}

export default EsqueciaSenha;
