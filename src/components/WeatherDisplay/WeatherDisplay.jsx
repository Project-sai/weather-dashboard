import { useWeather } from '../../context/WeatherContext';
import styles from './WeatherDisplay.module.css';

const WeatherDisplay = () => {
  const { weatherData, forecastData, loading, error, unit, toggleUnit } = useWeather();

  if (loading && !weatherData) {
    return <div className={styles.loading}>Loading weather data...</div>;
  }

  if (error || !weatherData || !forecastData) {
    return null;
  }

  const temperature = Math.round(weatherData.main.temp);
  const weatherIcon = weatherData.weather[0].icon;
  const cityName = weatherData.name;
  const country = weatherData.sys.country;

  const dailyForecasts = {};
  forecastData.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = item;
    }
  });

  const forecastDays = Object.entries(dailyForecasts).slice(0, 7);

  
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={styles.weatherContainer}>
      <div className={styles.locationUnit}>
        <div className={styles.location}>{cityName}, {country}</div>
        <button onClick={toggleUnit} className={styles.unitToggle}>
          °{unit === 'metric' ? 'C' : 'F'}
        </button>
      </div>

      <div className={styles.currentWeather}>
        <div className={styles.temperature}>{temperature}°</div>
        <img
          src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
          alt="weather icon"
          className={styles.weatherIcon}
        />
      </div>

      <div className={styles.forecast}>
        {forecastDays.map(([date, forecast]) => {
          const day = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
          const temp = Math.round(forecast.main.temp);
          const icon = forecast.weather[0].icon;

          return (
            <div key={date} className={styles.forecastDay}>
              <div className={styles.forecastDate}>{day}</div>
              <img
                src={`https://openweathermap.org/img/wn/${icon}.png`}
                alt="weather icon"
                className={styles.forecastIcon}
              />
              <div className={styles.forecastTemp}>{temp}°</div>
            </div>
          );
        })}
      </div>

      <div className={styles.time}>{currentTime}</div>
    </div>
  );
};

export default WeatherDisplay;