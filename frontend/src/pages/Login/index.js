import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiLogIn } from 'react-icons/fi';
import './styles.css';

import logoImage from '../../assets/logo.svg';
import heroesImage from '../../assets/heroes.png';

import api from '../../services/api';

function Login() {
  const history = useHistory();
  const [id, setId] = useState('');

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post('sessions', { id });
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', res.data.name);

      history.push('/profile');
    } catch (error) {
      alert('Falha no login');
    }

  }

  return (
    <div className="login-container">

      <section className="form">
        <img src={logoImage} alt="Herores Imagem" />

        <form onSubmit={handleLogin}>
          <h1>Faça o seu login</h1>
          <input 
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button type="submit" className="button">Entrar</button>
          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImage} alt="Herores Imagem" />
    </div>
  );
}

export default Login;