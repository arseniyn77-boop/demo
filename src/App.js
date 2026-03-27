// App.js (обновленная версия для темной темы)
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [travels, setTravels] = useState([
    { id: 1, country: 'Япония', title: 'Цветение сакуры', desc: 'Прогулка по паркам Киото.', likes: 12 },
    { id: 2, country: 'Исландия', title: 'Северное сияние', desc: 'Тур по ледникам и гейзерам.', likes: 8 },
  ]);

  const [filter, setFilter] = useState('');
  const [newTravel, setNewTravel] = useState({ country: '', title: '', desc: '' });

  const handleLike = (id) => {
    setTravels(travels.map(t => t.id === id ? { ...t, likes: t.likes + 1 } : t));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTravel.country || !newTravel.title) return;
    setTravels([...travels, { ...newTravel, id: Date.now(), likes: 0 }]);
    setNewTravel({ country: '', title: '', desc: '' });
  };

  const filteredTravels = travels.filter(t => 
    t.country.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Каталог путешествий</h1>
      <p className="student-info">Студент: Kolesnikov A.U. | Группа: IUK2-32b</p>

      {/* Форма добавления */}
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

      {/* Фильтр */}
      <div className="filter-section">
        <input 
          type="text" 
          placeholder="Фильтр по стране..." 
          onChange={(e) => setFilter(e.target.value)} 
        />
      </div>

      {/* Список карточек */}
      <div className="grid">
        {filteredTravels.map(t => (
          <div key={t.id} className="card">
            <span className="badge">{t.country}</span>
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