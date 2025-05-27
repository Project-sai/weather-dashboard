import { WeatherProvider } from './context/WeatherContext';
import SearchBar from './components/SearchBar/SearchBar';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import ErrorDisplay from './components/ErrorDisplay/ErrorDisplay';
import styles from './App.module.css';

function App() {
  return (
    <WeatherProvider>
      <div className={styles.app}>
        <h1 className={styles.appTitle}>Weather Dashboard</h1>
        <SearchBar />
        <ErrorDisplay />
        <WeatherDisplay />
      </div>
    </WeatherProvider>
  );
}

export default App;