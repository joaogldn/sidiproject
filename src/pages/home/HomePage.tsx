import React, { useState, useEffect } from 'react';
import './HomePage.css';
import smallLogo from './../../assets/logosidi.png';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [selectedTab, setSelectedTab] = useState('Marcação de Ponto');
  const [info, setInfo] = useState(
    `Bom dia, João Galdino! Marque seu ponto aqui.`
  );
  const [buttonVisible, setButtonVisible] = useState(true);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [confirmedMarcação, setConfirmedMarcação] = useState(false);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [abonoSearchDate, setAbonoSearchDate] = useState('');
  const [correcaoSearchDate, setCorrecaoSearchDate] = useState('');
  const [selectedAbonoPeriod, setSelectedAbonoPeriod] = useState('dia');
  const [selectedCorrecaoPeriod, setSelectedCorrecaoPeriod] = useState('dia');
  const [abonoMotivo, setAbonoMotivo] = useState('');
  const [correcaoMotivo, setCorrecaoMotivo] = useState('');
  const [abonoJustificativa, setAbonoJustificativa] = useState('');
  const [correcaoJustificativa, setCorrecaoJustificativa] = useState('');
  const [abonoHorarioInicio, setAbonoHorarioInicio] = useState('');
  const [abonoHorarioFim, setAbonoHorarioFim] = useState('');
  const [correcaoHorarioInicio, setCorrecaoHorarioInicio] = useState('');
  const [correcaoHorarioFim, setCorrecaoHorarioFim] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [marcacaoType, setMarcacaoType] = useState('entrada');
  const [currentTime, setCurrentTime] = useState(new Date());

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const [showMoreTabs3, setShowMoreTabs3] = useState(false);
  const [additionalTabs3, setAdditionalTabs3] = useState(['Datas de Ponto', 'Corrigir Ponto']);

  const [showMoreTabs4, setShowMoreTabs4] = useState(false);
  const [additionalTabs4, setAdditionalTabs4] = useState(['Abono de Faltas']);

  const [showMoreTabs5, setShowMoreTabs5] = useState(false);
  const [additionalTabs5, setAdditionalTabs5] = useState(['Alterar Senha', 'Notificações']);

  const [notificationFrequency, setNotificationFrequency] = useState('imediato');
  const [notifyMarcacao, setNotifyMarcacao] = useState(true);
  const [notifyCorrecao, setNotifyCorrecao] = useState(true);
  const [notifyAbono, setNotifyAbono] = useState(true);
  const [alternateEmail, setAlternateEmail] = useState('');

  const [solicitacoesAnteriores, setSolicitacoesAnteriores] = useState([
    { id: 1, data: '15/03/2024', tipo: 'Abono', status: 'Aprovado', motivo: 'Consulta médica' },
    { id: 2, data: '20/02/2024', tipo: 'Correção', status: 'Pendente', motivo: 'Erro na marcação' },
    { id: 3, data: '10/01/2024', tipo: 'Abono', status: 'Aprovado', motivo: 'Problemas pessoais' },
  ]);

  const navigate = useNavigate();
  const goToLoginPage = () => {
    navigate('/');
  };

  useEffect(() => {
    setShowCheckboxes(selectedTab === 'Marcação de Ponto' && !confirmedMarcação);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedTab, confirmedMarcação]);

  const toggleEmailNotifications = () => {
    const newStatus = !emailNotificationsEnabled;
    setEmailNotificationsEnabled(newStatus);
    setNotificationMessage(`Notificações via email ${newStatus ? 'habilitadas!' : 'desativadas!'}`);
    setTimeout(() => setNotificationMessage(''), 3000);
  };

  const saveNotificationSettings = () => {
    console.log('Configurações salvas:', {
      enabled: emailNotificationsEnabled,
      frequency: notificationFrequency,
      types: { notifyMarcacao, notifyCorrecao, notifyAbono },
      alternateEmail
    });
    setNotificationMessage('✅ Configurações salvas com sucesso!');
    setTimeout(() => setNotificationMessage(''), 3000);
  };

  const handleCorrigirPonto = () => {
    console.log('Solicitação de correção enviada:', {
      data: correcaoSearchDate,
      periodo: selectedCorrecaoPeriod,
      horarioInicio: correcaoHorarioInicio,
      horarioFim: correcaoHorarioFim,
      motivo: correcaoMotivo,
      justificativa: correcaoJustificativa,
      anexo: selectedFile
    });
    setNotificationMessage('✅ Solicitação de correção enviada com sucesso!');
    setTimeout(() => setNotificationMessage(''), 3000);
  };

  const handleAbonoFaltas = () => {
    console.log('Solicitação de abono enviada:', {
      data: abonoSearchDate,
      periodo: selectedAbonoPeriod,
      horarioInicio: abonoHorarioInicio,
      horarioFim: abonoHorarioFim,
      motivo: abonoMotivo,
      justificativa: abonoJustificativa,
      anexo: selectedFile
    });
    setNotificationMessage('✅ Solicitação de abono enviada com sucesso!');
    setTimeout(() => setNotificationMessage(''), 3000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setNotificationMessage(`📎 Arquivo "${file.name}" anexado com sucesso!`);
      setTimeout(() => setNotificationMessage(''), 3000);
    }
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);

    if (tab === 'Marcação de Ponto' && confirmedMarcação) {
      setShowCheckboxes(false);
      setInfo('');
      return;
    }

    setShowCheckboxes(tab === 'Marcação de Ponto' && !confirmedMarcação);
    setInfo('Estamos sempre a disposição!');

    if (tab === 'Datas de Ponto') {
      setInfo('Aqui você pode ver as datas de seus últimos pontos.');
      return;
    }

    if (tab === 'Corrigir Ponto') {
      setInfo('Solicite a correção de marcações incorretas.');
      return;
    }

    if (tab === 'Abono de Faltas') {
      setInfo('Solicite abono para faltas justificadas.');
      return;
    }

    if (tab === 'Notificações') {
      setInfo('Configure como deseja receber suas notificações.');
      return;
    }

    if (tab === 'Alterar Senha') {
      setInfo('Aqui você pode alterar sua senha.');
    }
  };

  const handleConfirmarMarcacao = () => {
    const marcacaoHorario = currentTime.toLocaleTimeString('pt-BR');
    const marcacaoData = currentTime.toLocaleDateString('pt-BR');
    
    console.log('Marcação confirmada:', {
      tipo: marcacaoType,
      horario: marcacaoHorario,
      data: marcacaoData,
      localizacao: selectedLocation || 'Não informada'
    });
    
    setInfo(`✅ Ponto ${marcacaoType === 'entrada' ? 'registrado' : 'finalizado'} com sucesso!\nHorário: ${marcacaoHorario}\nData: ${marcacaoData}`);
    setNotificationMessage(`✅ Ponto ${marcacaoType === 'entrada' ? 'registrado' : 'finalizado'} com sucesso às ${marcacaoHorario}!`);
    setButtonVisible(false);
    setShowCheckboxes(false);
    setConfirmedMarcação(true);
    setTimeout(() => setNotificationMessage(''), 3000);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmNewPassword) {
      setPasswordMessage('❌ As senhas não conferem!');
      setTimeout(() => setPasswordMessage(''), 3000);
      return;
    }
    
    if (newPassword.length < 6) {
      setPasswordMessage('❌ A nova senha deve ter no mínimo 6 caracteres!');
      setTimeout(() => setPasswordMessage(''), 3000);
      return;
    }
    
    console.log('Senha alterada com sucesso!');
    setPasswordMessage('✅ Senha alterada com sucesso!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setTimeout(() => setPasswordMessage(''), 3000);
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

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
        </div>

        {selectedTab === 'Marcação de Ponto' && buttonVisible && (
          <div className="marcacao-professional">
            <div className="marcacao-card">
              <div className="marcacao-header">
                <div className="marcacao-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="marcacao-time">
                  <div className="current-time">{currentTime.toLocaleTimeString('pt-BR')}</div>
                  <div className="current-date">{formatDate(currentTime)}</div>
                </div>
              </div>

              <div className="marcacao-body">
                <div className="marcacao-type-selector">
                  <button 
                    className={`type-btn ${marcacaoType === 'entrada' ? 'active' : ''}`}
                    onClick={() => setMarcacaoType('entrada')}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                    Registrar Entrada
                  </button>
                  <button 
                    className={`type-btn ${marcacaoType === 'saida' ? 'active' : ''}`}
                    onClick={() => setMarcacaoType('saida')}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 5l-7 7 7 7"/>
                    </svg>
                    Registrar Saída
                  </button>
                </div>

                <div className="marcacao-location">
                  <label>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    Local de trabalho
                  </label>
                  <select 
                    className="location-select"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="">Selecione o local</option>
                    <option value="matriz">Matriz - Av. Paulista, 1000</option>
                    <option value="filial1">Filial - Zona Sul</option>
                    <option value="filial2">Filial - Zona Norte</option>
                    <option value="home">Home Office</option>
                  </select>
                </div>

                <div className="marcacao-summary">
                  <div className="summary-item">
                    <span className="summary-label">Tipo de marcação</span>
                    <span className="summary-value">{marcacaoType === 'entrada' ? 'Entrada' : 'Saída'}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Horário</span>
                    <span className="summary-value">{currentTime.toLocaleTimeString('pt-BR')}</span>
                  </div>
                  {selectedLocation && (
                    <div className="summary-item">
                      <span className="summary-label">Local</span>
                      <span className="summary-value">{selectedLocation}</span>
                    </div>
                  )}
                </div>

                <button className="confirm-marcacao-btn" onClick={handleConfirmarMarcacao}>
                  Confirmar marcação de {marcacaoType === 'entrada' ? 'entrada' : 'saída'}
                </button>
              </div>
            </div>

            <div className="marcacao-info-card">
              <h4>Informações importantes</h4>
              <ul>
                <li>✓ A marcação é registrada com data e hora oficiais</li>
                <li>✓ Você pode registrar entrada e saída múltiplas vezes ao dia</li>
                <li>✓ Em caso de erro, utilize a opção "Corrigir Ponto"</li>
                <li>✓ Mantenha sua localização atualizada para registro preciso</li>
              </ul>
            </div>

            {notificationMessage && (
              <div className="notification-feedback">
                {notificationMessage}
              </div>
            )}
          </div>
        )}

        {selectedTab === 'Alterar Senha' && (
          <div className="alterar-senha-professional">
            <div className="alterar-senha-card">
              <div className="alterar-senha-header">
                <div className="alterar-senha-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <h3>Alteração de Senha</h3>
                  <p>Mantenha sua conta segura</p>
                </div>
              </div>

              <div className="alterar-senha-form">
                <div className="form-group">
                  <label>Senha Atual</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Digite sua senha atual"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Nova Senha</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Mínimo de 6 caracteres"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Confirmar Nova Senha</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Digite a nova senha novamente"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>

                <div className="password-requirements">
                  <p>Requisitos da senha:</p>
                  <ul>
                    <li>✓ Mínimo de 6 caracteres</li>
                    <li>✓ Letras e números</li>
                    <li>✓ Caracteres especiais são permitidos</li>
                  </ul>
                </div>

                <button className="confirm-marcacao-btn" onClick={handleChangePassword}>
                  Alterar Senha
                </button>
              </div>
            </div>

            {passwordMessage && (
              <div className={`notification-feedback ${passwordMessage.includes('❌') ? 'error' : 'success'}`}>
                {passwordMessage}
              </div>
            )}
          </div>
        )}

        {selectedTab === 'Abono de Faltas' && (
          <div className="solicitacao-professional">
            <div className="solicitacao-header">
              <div className="solicitacao-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8v4l3 3M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 6v2M12 16v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <h3>Solicitação de Abono de Faltas</h3>
                <p>Preencha os dados abaixo para solicitar abono</p>
              </div>
            </div>

            <div className="solicitacao-card">
              <div className="solicitacao-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Data da Falta</label>
                    <input
                      type="date"
                      className="form-input"
                      value={abonoSearchDate}
                      onChange={(e) => setAbonoSearchDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Período</label>
                    <div className="period-buttons">
                      <button 
                        className={`period-btn ${selectedAbonoPeriod === 'dia' ? 'active' : ''}`}
                        onClick={() => setSelectedAbonoPeriod('dia')}
                      >
                        Dia inteiro
                      </button>
                      <button 
                        className={`period-btn ${selectedAbonoPeriod === 'meio' ? 'active' : ''}`}
                        onClick={() => setSelectedAbonoPeriod('meio')}
                      >
                        Meio período
                      </button>
                    </div>
                  </div>
                </div>

                {selectedAbonoPeriod === 'meio' && (
                  <div className="form-row horario-row">
                    <div className="form-group">
                      <label>Horário Início</label>
                      <input
                        type="time"
                        className="form-input"
                        value={abonoHorarioInicio}
                        onChange={(e) => setAbonoHorarioInicio(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Horário Fim</label>
                      <input
                        type="time"
                        className="form-input"
                        value={abonoHorarioFim}
                        onChange={(e) => setAbonoHorarioFim(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label>Motivo do Abono</label>
                  <select 
                    className="form-select"
                    value={abonoMotivo}
                    onChange={(e) => setAbonoMotivo(e.target.value)}
                  >
                    <option value="">Selecione o motivo</option>
                    <option value="doenca">Problemas de saúde / Consulta médica</option>
                    <option value="pessoal">Assuntos pessoais urgentes</option>
                    <option value="transporte">Problemas de transporte</option>
                    <option value="familia">Compromisso familiar</option>
                    <option value="outros">Outros motivos</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Justificativa detalhada</label>
                  <textarea
                    className="form-textarea"
                    rows="3"
                    placeholder="Descreva detalhadamente o motivo da solicitação..."
                    value={abonoJustificativa}
                    onChange={(e) => setAbonoJustificativa(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Anexar comprovante (opcional)</label>
                  <div className="file-upload-area">
                    <input
                      type="file"
                      id="abono-file"
                      className="file-input"
                      onChange={handleFileUpload}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="abono-file" className="file-label">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                        <polyline points="13 2 13 9 20 9"/>
                      </svg>
                      Clique para anexar ou arraste
                    </label>
                    {selectedFile && <span className="file-name">{selectedFile.name}</span>}
                  </div>
                  <small className="form-hint">Formatos aceitos: PDF, JPG, PNG (máx. 5MB)</small>
                </div>

                <button className="submit-solicitacao-btn" onClick={handleAbonoFaltas}>
                  Enviar solicitação
                </button>
              </div>
            </div>

            <div className="solicitacoes-anteriores">
              <div className="anteriores-header">
                <h4>Solicitações Anteriores</h4>
                <span className="count-badge">{solicitacoesAnteriores.filter(s => s.tipo === 'Abono').length}</span>
              </div>
              <div className="solicitacoes-list">
                {solicitacoesAnteriores.filter(s => s.tipo === 'Abono').map((solicitacao) => (
                  <div key={solicitacao.id} className="solicitacao-item">
                    <div className="solicitacao-info">
                      <span className="solicitacao-data">{solicitacao.data}</span>
                      <span className="solicitacao-motivo">{solicitacao.motivo}</span>
                    </div>
                    <span className={`solicitacao-status status-${solicitacao.status.toLowerCase()}`}>
                      {solicitacao.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {notificationMessage && (
              <div className="notification-feedback">
                {notificationMessage}
              </div>
            )}
          </div>
        )}

        {selectedTab === 'Corrigir Ponto' && (
          <div className="solicitacao-professional">
            <div className="solicitacao-header">
              <div className="solicitacao-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3>Solicitação de Correção de Ponto</h3>
                <p>Solicite a correção de marcações equivocadas</p>
              </div>
            </div>

            <div className="solicitacao-card">
              <div className="solicitacao-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Data da Marcação</label>
                    <input
                      type="date"
                      className="form-input"
                      value={correcaoSearchDate}
                      onChange={(e) => setCorrecaoSearchDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Período</label>
                    <div className="period-buttons">
                      <button 
                        className={`period-btn ${selectedCorrecaoPeriod === 'dia' ? 'active' : ''}`}
                        onClick={() => setSelectedCorrecaoPeriod('dia')}
                      >
                        Dia inteiro
                      </button>
                      <button 
                        className={`period-btn ${selectedCorrecaoPeriod === 'meio' ? 'active' : ''}`}
                        onClick={() => setSelectedCorrecaoPeriod('meio')}
                      >
                        Meio período
                      </button>
                    </div>
                  </div>
                </div>

                {selectedCorrecaoPeriod === 'meio' && (
                  <div className="form-row horario-row">
                    <div className="form-group">
                      <label>Horário Correto - Início</label>
                      <input
                        type="time"
                        className="form-input"
                        value={correcaoHorarioInicio}
                        onChange={(e) => setCorrecaoHorarioInicio(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Horário Correto - Fim</label>
                      <input
                        type="time"
                        className="form-input"
                        value={correcaoHorarioFim}
                        onChange={(e) => setCorrecaoHorarioFim(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label>Motivo da Correção</label>
                  <select 
                    className="form-select"
                    value={correcaoMotivo}
                    onChange={(e) => setCorrecaoMotivo(e.target.value)}
                  >
                    <option value="">Selecione o motivo</option>
                    <option value="esquecimento">Esqueci de marcar o ponto</option>
                    <option value="erro">Erro na marcação (horário incorreto)</option>
                    <option value="sistema">Problema no sistema</option>
                    <option value="outros">Outros motivos</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Justificativa detalhada</label>
                  <textarea
                    className="form-textarea"
                    rows="3"
                    placeholder="Explique o que ocorreu e qual deveria ser a marcação correta..."
                    value={correcaoJustificativa}
                    onChange={(e) => setCorrecaoJustificativa(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Anexar comprovante (opcional)</label>
                  <div className="file-upload-area">
                    <input
                      type="file"
                      id="correcao-file"
                      className="file-input"
                      onChange={handleFileUpload}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="correcao-file" className="file-label">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                        <polyline points="13 2 13 9 20 9"/>
                      </svg>
                      Clique para anexar ou arraste
                    </label>
                    {selectedFile && <span className="file-name">{selectedFile.name}</span>}
                  </div>
                  <small className="form-hint">Formatos aceitos: PDF, JPG, PNG (máx. 5MB)</small>
                </div>

                <button className="submit-solicitacao-btn" onClick={handleCorrigirPonto}>
                  Enviar solicitação de correção
                </button>
              </div>
            </div>

            <div className="solicitacoes-anteriores">
              <div className="anteriores-header">
                <h4>Solicitações Anteriores</h4>
                <span className="count-badge">{solicitacoesAnteriores.filter(s => s.tipo === 'Correção').length}</span>
              </div>
              <div className="solicitacoes-list">
                {solicitacoesAnteriores.filter(s => s.tipo === 'Correção').map((solicitacao) => (
                  <div key={solicitacao.id} className="solicitacao-item">
                    <div className="solicitacao-info">
                      <span className="solicitacao-data">{solicitacao.data}</span>
                      <span className="solicitacao-motivo">{solicitacao.motivo}</span>
                    </div>
                    <span className={`solicitacao-status status-${solicitacao.status.toLowerCase()}`}>
                      {solicitacao.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {notificationMessage && (
              <div className="notification-feedback">
                {notificationMessage}
              </div>
            )}
          </div>
        )}

        {selectedTab === 'Notificações' && (
          <div className="notifications-professional">
            <div className="notifications-header">
              <div className="notifications-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3>Configurações de Notificação</h3>
                <p>Receba alertas sobre seu ponto eletrônico</p>
              </div>
            </div>

            <div className="notifications-card">
              <div className="notification-toggle-main">
                <div className="toggle-info">
                  <span className="toggle-title">Notificações por Email</span>
                  <span className="toggle-description">
                    Receba atualizações importantes sobre suas marcações de ponto
                  </span>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={emailNotificationsEnabled} 
                    onChange={toggleEmailNotifications}
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              {emailNotificationsEnabled && (
                <div className="notifications-options">
                  <div className="options-section">
                    <label className="section-label">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      Frequência
                    </label>
                    <div className="frequency-buttons">
                      <button 
                        className={`freq-btn ${notificationFrequency === 'imediato' ? 'active' : ''}`}
                        onClick={() => setNotificationFrequency('imediato')}
                      >
                        ⚡ Imediato
                      </button>
                      <button 
                        className={`freq-btn ${notificationFrequency === 'diario' ? 'active' : ''}`}
                        onClick={() => setNotificationFrequency('diario')}
                      >
                        📅 Diário
                      </button>
                      <button 
                        className={`freq-btn ${notificationFrequency === 'semanal' ? 'active' : ''}`}
                        onClick={() => setNotificationFrequency('semanal')}
                      >
                        📊 Semanal
                      </button>
                    </div>
                  </div>

                  <div className="options-section">
                    <label className="section-label">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                      Receber notificações sobre:
                    </label>
                    <div className="notification-types">
                      <label className="type-checkbox">
                        <input type="checkbox" checked={notifyMarcacao} onChange={() => setNotifyMarcacao(!notifyMarcacao)} />
                        <span>✓ Marcação de ponto</span>
                      </label>
                      <label className="type-checkbox">
                        <input type="checkbox" checked={notifyCorrecao} onChange={() => setNotifyCorrecao(!notifyCorrecao)} />
                        <span>✎ Correções solicitadas</span>
                      </label>
                      <label className="type-checkbox">
                        <input type="checkbox" checked={notifyAbono} onChange={() => setNotifyAbono(!notifyAbono)} />
                        <span>📋 Abonos aprovados</span>
                      </label>
                    </div>
                  </div>

                  <div className="options-section">
                    <label className="section-label">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                      Email alternativo (opcional)
                    </label>
                    <input 
                      type="email" 
                      className="email-input"
                      placeholder="seu-email@exemplo.com"
                      value={alternateEmail}
                      onChange={(e) => setAlternateEmail(e.target.value)}
                    />
                    <small className="email-hint">Deixe em branco para usar o email cadastrado</small>
                  </div>

                  <button className="save-notifications-btn" onClick={saveNotificationSettings}>
                    💾 Salvar configurações
                  </button>
                </div>
              )}
            </div>

            {notificationMessage && (
              <div className="notification-feedback">
                {notificationMessage}
              </div>
            )}
          </div>
        )}

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