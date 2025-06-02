import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

// Дані меню
const dishesData = [
  { id: 1, name: 'Борщ', ingredients: ['буряк', 'капуста', 'картопля', 'морква', 'цибуля', 'м’ясо', 'томат'], img: 'images/borscht.webp', price: 120 },
  { id: 2, name: 'Вареники', ingredients: ['борошно', 'картопля', 'цибуля', 'вершкове масло'], img: 'images/vareniki.webp', price: 100 },
  { id: 3, name: 'Галушки', ingredients: ['борошно', 'яйця', 'сіль', 'сметана'], img: 'images/galushky.jpg', price: 110 },
  { id: 4, name: 'Котлета по-київськи', ingredients: ['куряче філе', 'вершкове масло', 'панірувальні сухарі', 'яйця'], img: 'images/kiev_cutlet.webp', price: 150 },
  { id: 5, name: 'Салат Олів’є', ingredients: ['картопля', 'морква', 'горошок', 'ковбаса', 'яйця', 'майонез'], img: 'images/olivie.webp', price: 90 },
  { id: 6, name: 'Пампушки з часником', ingredients: ['борошно', 'дріжджі', 'часник', 'олія'], img: 'images/pampushky.webp', price: 70 },
  { id: 7, name: 'Деруни', ingredients: ['картопля', 'цибуля', 'яйця', 'сметана'], img: 'images/deruny.webp', price: 85 },
  { id: 8, name: 'Квасоля по-українськи', ingredients: ['квасоля', 'морква', 'цибуля', 'олія', 'зелень'], img: 'images/beans.webp', price: 95 },
  { id: 9, name: 'Пиріг з м’ясом', ingredients: ['борошно', 'м’ясо', 'цибуля', 'яйця', 'вершкове масло'], img: 'images/meat_pie.webp', price: 130 },
  { id: 10, name: 'Крученики', ingredients: ['свинина', 'гриби', 'цибуля', 'спеції'], img: 'images/kruchenyky.webp', price: 140 },
  { id: 11, name: 'Уха', ingredients: ['риба', 'картопля', 'морква', 'цибуля', 'зелень'], img: 'images/fish_soup.webp', price: 125 },
  { id: 12, name: 'Компот', ingredients: ['вишня', 'яблуко', 'груша', 'цукор'], img: 'images/kompot.webp', price: 50 },
];

// Компонент Інгредієнтів
function Ingredients({ items }) {
  return (
    <ul style={{ fontStyle: 'italic', color: '#555', marginTop: 5 }}>
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}

// Компонент страви
function Dish({ dish }) {
  const [showIngredients, setShowIngredients] = useState(false);

  return (
    <tr>
      <td>
        <span 
          onClick={() => setShowIngredients(!showIngredients)} 
          style={{ cursor: 'pointer', color: '#2a7ae2', textDecoration: 'underline' }}
        >
          {dish.name}
        </span>
        {showIngredients && <Ingredients items={dish.ingredients} />}
      </td>
      <td>{dish.ingredients.join(', ')}</td>
      <td><img src={dish.img} alt={dish.name} width="80" style={{ borderRadius: 8 }} /></td>
      <td>{dish.price} грн</td>
    </tr>
  );
}

// Компонент меню
function Menu() {
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedDishes = [...dishesData].sort((a, b) => 
    sortOrder === 'asc' ? a.price - b.price : b.price - a.price
  );

  return (
    <section>
      <h2 style={{ color: '#d35400', borderBottom: '2px solid #d35400', display: 'inline-block' }}>Меню</h2>
      <button 
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} 
        style={{ marginLeft: 20, padding: '5px 15px', cursor: 'pointer' }}
      >
        Сортувати за ціною: {sortOrder === 'asc' ? 'зростання' : 'спадання'}
      </button>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20, backgroundColor: '#fff' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8b500', color: 'white' }}>
            <th>Назва страви</th>
            <th>Інгредієнти</th>
            <th>Зображення</th>
            <th>Ціна</th>
          </tr>
        </thead>
        <tbody>
          {sortedDishes.map(dish => <Dish key={dish.id} dish={dish} />)}
        </tbody>
      </table>
    </section>
  );
}

// Компонент кухарів
function Chefs() {
  const chefs = [
    { id: 1, name: 'Олег К.', img: 'images/chef1.webp' },
    { id: 2, name: 'Євген В.', img: 'images/chef2.jpg' },
    { id: 3, name: 'Артем П.', img: 'images/chef3.webp' },
    { id: 4, name: 'Іван І.', img: 'images/chef4.webp' },
  ];

  return (
    <section>
      <h2 style={{ color: '#d35400' }}>Наші кухарі</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-around', textAlign: 'center' }}>
        {chefs.map(chef => (
          <div key={chef.id} style={{ width: 180 }}>
            <img src={chef.img} alt={chef.name} style={{ width: '100%', borderRadius: 10 }} />
            <p style={{ marginTop: 10, fontWeight: 'bold', color: '#d35400' }}>{chef.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Компонент відгуків
function Comments() {
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({ name: '', comment: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (formData.name.trim() && formData.comment.trim()) {
      setComments(prev => [...prev, { name: formData.name.trim(), comment: formData.comment.trim() }]);
      setFormData({ name: '', comment: '' });
    } else {
      alert('Будь ласка, заповніть обидва поля.');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20, backgroundColor: '#f9f9f9', borderRadius: 10 }}>
      <h3>Залиште свій відгук:</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Ім’я:</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          style={{ width: '100%', marginBottom: 10, padding: 8, fontSize: 16 }}
        />
        <label htmlFor="comment">Коментар:</label>
        <textarea 
          id="comment" 
          name="comment" 
          value={formData.comment} 
          onChange={handleChange} 
          rows="4" 
          style={{ width: '100%', marginBottom: 10, padding: 8, fontSize: 16 }}
        />
        <button type="submit" style={{ backgroundColor: '#d35400', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>
          Надіслати
        </button>
      </form>

      <div style={{ marginTop: 30 }}>
        <h4>Відгуки клієнтів:</h4>
        {comments.length === 0 && <p>Поки немає відгуків.</p>}
        <ul>
          {comments.map((c, idx) => (
            <li key={idx} style={{ marginBottom: 15, borderBottom: '1px solid #ddd', paddingBottom: 10 }}>
              <strong>{c.name}:</strong> <br />
              <span>{c.comment}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Компонент Про нас
function About() {
  return (
    <section>
      <h2 style={{ color: '#d35400' }}>Про нас</h2>
      <p>Ласкаво просимо до нашого ресторану! Ми пропонуємо традиційні українські страви за найкращими рецептами.</p>
      <Comments />
    </section>
  );
}

// Основний компонент з меню навігації
function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: 1000, margin: 'auto', padding: 20 }}>
        <nav style={{ marginBottom: 30, borderBottom: '2px solid #d35400', paddingBottom: 10 }}>
          <NavLink to="/" style={({ isActive }) => ({ marginRight: 20, color: isActive ? '#d35400' : '#555', textDecoration: 'none', fontWeight: isActive ? 'bold' : 'normal' })} end>
            Меню
          </NavLink>
          <NavLink to="/chefs" style={({ isActive }) => ({ marginRight: 20, color: isActive ? '#d35400' : '#555', textDecoration: 'none', fontWeight: isActive ? 'bold' : 'normal' })}>
            Наші кухарі
          </NavLink>
          <NavLink to="/about" style={({ isActive }) => ({ color: isActive ? '#d35400' : '#555', textDecoration: 'none', fontWeight: isActive ? 'bold' : 'normal' })}>
            Про нас
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/chefs" element={<Chefs />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
