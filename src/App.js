import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [travels, setTravels] = useState([
    { id: 1, country: 'Япония', title: 'Цветение сакуры', desc: 'Прогулка по паркам Киото.', likes: 12 },
    { id: 2, country: 'Исландия', title: 'Северное сияние', desc: 'Тур по ледникам и гейзерам.', likes: 8 },
  ]);

  const [filter, setFilter] = useState('');
  const [sortByLikes, setSortByLikes] = useState(false); // Состояние для сортировки
  const [newTravel, setNewTravel] = useState({ country: '', title: '', desc: '' });

  const handleLike = (id) => {
    setTravels(travels.map(t => t.id === id ? { ...t, likes: t.likes + 1 } : t));
  };

  // НОВЫЙ ФУНКЦИОНАЛ: Удаление
  const handleDelete = (id) => {
    if (window.confirm('Вы точно хотите удалить это путешествие?')) {
      setTravels(travels.filter(t => t.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTravel.country || !newTravel.title) return;
    setTravels([...travels, { ...newTravel, id: Date.now(), likes: 0 }]);
    setNewTravel({ country: '', title: '', desc: '' });
  };

  // Логика фильтрации и сортировки
  const processedTravels = travels
    .filter(t => t.country.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => sortByLikes ? b.likes - a.likes : 0); // Сортировка по лайкам

  return (
    <div className="container">
      <h1>Каталог путешествий</h1>
      <p className="student-info">Студент: Kolesnikov A.U. | Группа: IUK2-32b</p>

      <form onSubmit={handleSubmit} className="add-form">
        <input 
          placeholder="Страна" 
          value={newTravel.country} 
          onChange={e => setNewTravel({...newTravel, country: e.target.value})} 
        />
        <input 
          placeholder="Название" 
          value={newTravel.title} 
          onChange={e => setNewTravel({...newTravel, title: e.target.value})} 
        />
        <textarea 
          placeholder="Описание" 
          value={newTravel.desc} 
          onChange={e => setNewTravel({...newTravel, desc: e.target.value})} 
          rows="3"
        />
        <button type="submit">Добавить путешествие</button>
      </form>

      <div className="filter-section" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Фильтр по стране..." 
          onChange={(e) => setFilter(e.target.value)} 
          style={{ flex: 1 }}
        />

        <button 
          onClick={() => setSortByLikes(!sortByLikes)}
          style={{ background: sortByLikes ? '#ff4757' : 'var(--accent-purple)' }}
        >
          {sortByLikes ? 'Сбросить сортировку' : 'Сначала популярные'}
        </button>
      </div>

      <div className="grid">
        {processedTravels.map(t => (
          <div key={t.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span className="badge">{t.country}</span>
            
              <button 
                onClick={() => handleDelete(t.id)} 
                className="delete-btn"
                title="Удалить"
              >
                🗑️
              </button>
            </div>
            <h3>{t.title}</h3>
            <p>{t.desc}</p>
            <div className="card-footer">
              <button onClick={() => handleLike(t.id)}>
                ❤️ <span>{t.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;