import { useWeather } from '../../context/WeatherContext';
import styles from './ErrorDisplay.module.css';

const ErrorDisplay = () => {
  const { error } = useWeather();

  if (!error) return null;

  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>{error}</p>
      <p className={styles.errorHint}>Please try another city name.</p>
    </div>
  );
};

export default ErrorDisplay;