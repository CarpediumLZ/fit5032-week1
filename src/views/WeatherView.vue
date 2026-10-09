<template>
  <div class="container text-center mt-4">
    <h1>WEATHER APP</h1>

    <div class="d-flex justify-content-center gap-2 my-3">
      <input
        type="text"
        v-model="city"
        placeholder="Enter city name, e.g. Clayton, AU"
        class="form-control w-auto"
        @keyup.enter="searchByCity"
      />
      <button class="btn btn-primary" @click="searchByCity">Search</button>
    </div>

    <p v-if="loading">Loading...</p>
    <p v-if="error" class="text-danger">{{ error }}</p>

    <main>
      <!-- Only show when we have data from the API -->
      <div v-if="weatherData">
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        <img :src="iconUrl" alt="Weather Icon" />
        <p class="fs-4">{{ temperature }} °C</p>
        <span class="text-capitalize">{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const apikey = import.meta.env.VITE_OPENWEATHER_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

const city = ref('')
const weatherData = ref(null)
const error = ref(null)
const loading = ref(false)

// units=metric -> the API returns Celsius directly
const temperature = computed(() =>
  weatherData.value ? weatherData.value.main.temp.toFixed(1) : null
)

// Weather icon image
const iconUrl = computed(() =>
  weatherData.value
    ? `https://openweathermap.org/img/wn/${weatherData.value.weather[0].icon}@2x.png`
    : null
)

const fetchWeatherData = async (url) => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get(url)
    weatherData.value = response.data
  } catch (err) {
    weatherData.value = null
    if (err.response?.status === 404) error.value = 'City not found. Try e.g. "Clayton, AU".'
    else if (err.response?.status === 401) error.value = 'API key not active yet (can take up to 2 hours).'
    else error.value = 'Error fetching weather data.'
  } finally {
    loading.value = false
  }
}

// Weather at the current location (browser GPS)
const fetchCurrentLocationWeather = () => {
  if (!navigator.geolocation) {
    error.value = 'Geolocation is not supported by this browser.'
    return
  }
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords
      await fetchWeatherData(
        `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`
      )
    },
    () => {
      error.value = 'Location permission denied. Please search a city instead.'
    }
  )
}

// Search weather by city name
const searchByCity = async () => {
  const q = city.value.trim()
  if (!q) return
  await fetchWeatherData(`${BASE_URL}?q=${encodeURIComponent(q)}&appid=${apikey}&units=metric`)
}

onMounted(fetchCurrentLocationWeather)
</script>