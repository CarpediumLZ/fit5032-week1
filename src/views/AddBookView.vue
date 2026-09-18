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

    <BookList />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import db from '../firebase/init.js'
import { collection, addDoc } from 'firebase/firestore'
import BookList from '../components/BookList.vue'

const isbn = ref(null)
const name = ref('')

const addBook = async () => {
  try {
    await addDoc(collection(db, 'books'), {
      isbn: Number(isbn.value),
      name: name.value
    })
    console.log('Book added to Firestore')
    isbn.value = null
    name.value = ''
  } catch (error) {
    console.error('Error adding book: ', error)
  }
}
</script>
