import { createContext, useContext, useState, useEffect, useRef } from 'react';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [lastSearched, setLastSearched] = useState(() => {
    return localStorage.getItem('lastSearched') || 'bengaluru';
  });

  const intervalRef = useRef();

  const API_KEY = 'e58c6c921797fd1c9d19b0e0531a275e';

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      
      if (!weatherResponse.ok) throw new Error('City not found');
      
      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);
      
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      
      if (!forecastResponse.ok) throw new Error('Forecast not available');
      
      const forecastData = await forecastResponse.json();
      setForecastData(forecastData);
      
      setLastSearched(city);
      localStorage.setItem('lastSearched', city);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      intervalRef.current = setInterval(() => {
        fetchWeather(city);
      }, 30000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(lastSearched);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [unit]);

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        forecastData,
        loading,
        error,
        unit,
        lastSearched,
        fetchWeather,
        toggleUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};