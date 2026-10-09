<template>
  <div class="container mt-4">
    <h1>Add Book</h1>

    <form @submit.prevent="addBook">
      <div class="mb-3">
        <label for="isbn" class="form-label">ISBN</label>
        <input type="number" class="form-control" id="isbn" v-model.number="isbn" required />
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" v-model="name" required />
      </div>

      <button type="submit" class="btn btn-primary">Add Book</button>
    </form>

    <!-- Show the outcome: what the user typed vs what the Cloud Function saved -->
    <div v-if="savedBook" class="alert alert-success mt-3">
      <p class="mb-1"><strong>You typed:</strong> {{ typedName }}</p>
      <p class="mb-0">
        <strong>Saved to Firestore by Cloud Function:</strong>
        {{ savedBook.name }} (ISBN: {{ savedBook.isbn }})
      </p>
    </div>
    <p v-if="error" class="text-danger mt-3">{{ error }}</p>

    <BookList :key="listKey" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { FUNCTIONS_BASE } from '../config.js'
import BookList from '../components/BookList.vue'

const isbn = ref(null)
const name = ref('')
const typedName = ref('')
const savedBook = ref(null)
const error = ref(null)
const listKey = ref(0)

const addBook = async () => {
  try {
    typedName.value = name.value
    const response = await axios.post(`${FUNCTIONS_BASE}/addBook`, {
      isbn: Number(isbn.value),
      name: name.value
    })
    savedBook.value = response.data
    error.value = null
    listKey.value++ // reload BookList so the new book appears
    isbn.value = null
    name.value = ''
  } catch (err) {
    error.value = 'Error adding book'
    savedBook.value = null
  }
}
</script>
