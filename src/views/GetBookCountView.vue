<template>
  <div class="container mt-4 text-center">
    <h1>Book Counter</h1>
    <button class="btn btn-primary" @click="getBookCount">Get Book Count</button>
    <p v-if="count !== null" class="mt-3">Total number of books: {{ count }}</p>
    <p v-if="error" class="mt-3 text-danger">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { FUNCTIONS_BASE } from '../config.js'

const count = ref(null)
const error = ref(null)

const getBookCount = async () => {
  try {
    const response = await axios.get(`${FUNCTIONS_BASE}/countBooks`)
    count.value = response.data.count
    error.value = null
  } catch (err) {
    error.value = 'Error fetching book count'
    count.value = null
  }
}
</script>