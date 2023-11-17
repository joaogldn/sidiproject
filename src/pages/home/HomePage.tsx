import React, { useState, useEffect } from 'react';
import './HomePage.css';
import smallLogo from './../../assets/logosidi.png';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [selectedTab, setSelectedTab] = useState('Marcação de Ponto');
  const [info, setInfo] = useState(
    `Bom dia, Ana Beatriz! Marque seu ponto aqui.
   `
  );
  const [buttonVisible, setButtonVisible] = useState(true);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [confirmedMarcação, setConfirmedMarcação] = useState(false);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [searchDate, setSearchDate] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [showMoreTabs3, setShowMoreTabs3] = useState(false);
  const [additionalTabs3, setAdditionalTabs3] = useState(['Datas de Ponto', 'Corrigir Ponto']);

  const [showMoreTabs4, setShowMoreTabs4] = useState(false);
  const [additionalTabs4, setAdditionalTabs4] = useState(['Abono de Faltas']);

  const [showMoreTabs5, setShowMoreTabs5] = useState(false);
  const [additionalTabs5, setAdditionalTabs5] = useState(['Alterar Senha', 'Notificações']);

  const navigate = useNavigate();
  const goToLoginPage = () => {
    navigate('/');
  };

  useEffect(() => {
    setShowCheckboxes(selectedTab === 'Marcação de Ponto' && !confirmedMarcação);
  }, [selectedTab, confirmedMarcação]);

  const toggleEmailNotifications = () => {
    const newStatus = !emailNotificationsEnabled;
    setEmailNotificationsEnabled(newStatus);
    setNotificationMessage(`Notificações via email ${newStatus ? 'habilitadas!' : 'desativadas!'}`);
  };

  const handleCorrigirPonto = () => {
    console.log('Botão Corrigir Ponto clicado');
  };

  const handleNovoBotaoClick = () => {
    console.log('Novo Botão clicado');
  };

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);


    if (tab === 'Marcação de ponto' && confirmedMarcação) {
      setShowCheckboxes(false);
      setInfo(
        `
       `
      );
      return;


    }

    setShowCheckboxes(tab === 'Marcação de Ponto' && !confirmedMarcação);

    setInfo(
      `Estamos sempre a disposição!
     `
    );


    if (tab === 'Datas de Ponto') {
      setInfo(
        `Aqui você pode ver as datas de seus últimos pontos.`
      );
      return;
    }

    if (tab === 'Corrigir Ponto') {
      setInfo(
        `Aqui você pode corrigir seu ponto.`
      );
      return;
    }

    if (tab === 'Abono de Faltas') {
      setInfo(
        `Aqui você pode solicitar abono para faltas.`
      );
      return;
    }


    if (tab === 'Notificações') {
      setInfo(
        `Ative ou desative notificações por email.`
      );
      return;
    }

    if (tab === 'Alterar Senha') {
      setInfo(
        `Aqui você pode alterar sua senha.`
      );
    }

  };

  const handleConfirmarMarcacao = () => {
    console.log('Marcação confirmada');
    setInfo('Ponto de hoje marcado!');
    setButtonVisible(false);
    setShowCheckboxes(false);
    setConfirmedMarcação(true);
  };

  const handleChangePassword = () => {

    console.log('Senha alterada com sucesso!');
  };

  const handleAbonoButtonClick = () => {

    console.log('Botão Abono de Faltas clicado');
  };

  const handleSolicitacoesAButtonClick = () => {

    console.log('Botão SolicitaçõesA clicado');
  };


  const tabList = ['Marcação de Ponto'];

  const renderTabs = () => {
    return tabList.map((tab, index) => (
      <div
        key={index}
        className={`tab ${selectedTab === tab && 'active'}`}
        onClick={() => handleTabClick(tab)}
      >
        {tab}
      </div>
    ));
  };

  const toggleShowMoreTabs3 = () => {
    setShowMoreTabs3(!showMoreTabs3);
  };

  const renderAdditionalTabs3 = () => {
    return showMoreTabs3 && additionalTabs3.map((tab, index) => (
      <div
        key={index}
        className={`tab ${selectedTab === tab && 'active'}`}
        onClick={() => handleTabClick(tab)}
      >
        {tab}
      </div>
    ));
  };

  const toggleShowMoreTabs4 = () => {
    setShowMoreTabs4(!showMoreTabs4);
  };

  const renderAdditionalTabs4 = () => {
    return showMoreTabs4 && additionalTabs4.map((tab, index) => (
      <div
        key={index}
        className={`tab ${selectedTab === tab && 'active'}`}
        onClick={() => handleTabClick(tab)}
      >
        {tab}
      </div>
    ));
  };

  const toggleShowMoreTabs5 = () => {
    setShowMoreTabs5(!showMoreTabs5);
  };

  const renderAdditionalTabs5 = () => {
    return showMoreTabs5 && additionalTabs5.map((tab, index) => (
      <div
        key={index}
        className={`tab ${selectedTab === tab && 'active'}`}
        onClick={() => handleTabClick(tab)}
      >
        {tab}
      </div>
    ));
  };

  return (
    <div className="home-container">
      <div className="panel">
        <div className="logo-container">
          <img src={smallLogo} alt="Small Logo" className="small-logo" />
        </div>
        {renderTabs()}
        <div className="show-more-less" onClick={toggleShowMoreTabs3}>
          <span>{showMoreTabs3 ? '● Ponto' : 'Ponto'}</span>
        </div>
        {renderAdditionalTabs3()}
        <div className="show-more-less" onClick={toggleShowMoreTabs4}>
          <span>{showMoreTabs4 ? '● Solicitações' : ' Solicitações'}</span>
        </div>
        {renderAdditionalTabs4()}
        <div className="show-more-less" onClick={toggleShowMoreTabs5}>
          <span>{showMoreTabs5 ? '● Conta' : ' Conta'}</span>
        </div>
        {renderAdditionalTabs5()}
        <div className="logout" onClick={goToLoginPage}>
          Logout
        </div>
      </div>

      <div className="ponto-container">
        <div className="info-container">
          <h2>{selectedTab}</h2>

          <div className="formatted-info">{info}</div>
          {showCheckboxes && (
            <>
              <label>
                <input type="checkbox" /> Início de Escala
              </label>
              <label>
                <input type="checkbox" /> Fim de Escala
              </label>
            </>
          )}
          {selectedTab === 'Marcação de Ponto' && buttonVisible && (

            <button className="confirm-button" onClick={handleConfirmarMarcacao}>
              Confirmar marcação
            </button>

          )}

        </div>
        {selectedTab === 'Alterar Senha' && (
          <div className="alterar-senha-content">
            <label>
              Senha Atual:
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </label>
            <label>
              Nova Senha:
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <label>
              Confirmar Nova Senha:
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </label>
            <button className="confirm-button" onClick={handleChangePassword}>
              Alterar Senha
            </button>
          </div>
        )}

        {selectedTab === 'Abono de Faltas' && (
          <div className="abono-faltas-form">
            <label>
              Data de Pesquisa:
              <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
            </label>
            <button className="green-button" onClick={handleAbonoButtonClick}>
              Pesquisar Data
            </button>
            <button className="solicitacoesa-button" onClick={handleSolicitacoesAButtonClick}>
              Solicitações Anteriores
            </button>
          </div>
        )}

        {selectedTab === 'Corrigir Ponto' && (
          <div className="corrigir-ponto-form">
            <label>
              Data de Correção:
              <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
            </label>
            <button className="corrigirum-button" onClick={handleCorrigirPonto}>
              Verificar Marcação
            </button>
            <button className="corrigirdois-button" onClick={handleNovoBotaoClick}>
              Correções Anteriores
            </button>
          </div>
        )}


        {selectedTab === 'Notificações' && (
          <div className="notifications-panel">
            <div>
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={emailNotificationsEnabled}
                  onChange={toggleEmailNotifications}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="notification-message">{notificationMessage}</div>
          </div>
        )}
        { }
        {selectedTab === 'Datas de Ponto' && (
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>Horário</th>
                  <th>Data</th>
                  <th>Localização</th>
                  <th>Status do Ponto</th>
                </tr>
              </thead>
              <tbody>
                { }
                {Array.from({ length: 5 }, (_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array.from({ length: 4 }, (_, colIndex) => (
                      <td key={colIndex}>Dados</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage; 