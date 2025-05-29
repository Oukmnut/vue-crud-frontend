<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">User Management</h1>

    <form @submit.prevent="saveUser" class="mb-4">
      <div class="mb-3">
        <input v-model="form.name" type="text" class="form-control" placeholder="Name" required />
      </div>
      <div class="mb-3">
        <input v-model="form.email" type="email" class="form-control" placeholder="Email" required />
      </div>
      <button type="submit" class="btn btn-primary w-100">
        {{ form._id ? 'Update User' : 'Create User' }}
      </button>
    </form>

    <ul class="list-group">
      <li v-for="user in users" :key="user._id" class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <h6 class="mb-0">{{ user.name }}</h6>
          <small class="text-muted">{{ user.email }}</small>
        </div>
        <div>
          <button @click="editUser(user)" class="btn btn-warning btn-sm me-2">Edit</button>
          <button @click="deleteUser(user._id)" class="btn btn-danger btn-sm">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      form: { _id: null, name: '', email: '' }
    };
  },
  methods: {
    fetchUsers() {
      axios.get('http://localhost:3000/users')
        .then(res => this.users = res.data);
    },
    saveUser() {
      const request = this.form._id
        ? axios.put(`http://localhost:3000/users/${this.form._id}`, this.form)
        : axios.post('http://localhost:3000/users', this.form);

      request.then(() => {
        this.fetchUsers();
        this.form = { _id: null, name: '', email: '' };
      }).catch(err => console.error(err.response?.data));
    },
    editUser(user) {
      this.form = { ...user };
    },
    deleteUser(id) {
      axios.delete(`http://localhost:3000/users/${id}`)
        .then(() => this.fetchUsers())
        .catch(err => console.error(err.response?.data));
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>
