import { useState } from 'react';
import { useWeather } from '../../context/WeatherContext';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [city, setCity] = useState('');
  const { fetchWeather, loading } = useWeather();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className={styles.searchInput}
      />
      <button 
        type="submit" 
        className={styles.searchButton}
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchBar;