import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';
import "./styles.css";

import logoImage from '../../assets/logo.svg';

import api from '../../services/api';

function NewIncident() {
  const [title, setTile] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();
  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = { title, description, value }

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      });

      history.push('/profile');
    } catch (error) {
      alert('Erro ao cadastrar caso.')
    }
    
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImage} alt="Be The Hero"/>
          <h1>Cadastrar Novo Caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resover isso.</p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#E02041"/> 
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input 
            placeholder="Título do Caso"
            value={title}
            onChange={e => setTile(e.target.value)}
          />
          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input 
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}

export default NewIncident;