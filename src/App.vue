<template>
  <div class="container py-5">
    <h1 class="text-center mb-4 text-primary">User Management</h1>

    <!-- Create User Button -->
    <div class="text-end mb-3">
      <button class="btn btn-success" @click="openModal()">Create User</button>
    </div>

    <!-- Users List -->
    <ul class="list-group">
      <li v-for="user in users" :key="user.id" class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <h6 class="mb-0">{{ user.name }}</h6>
          <small class="text-muted">{{ user.email }}</small>
        </div>
        <div>
          <button class="btn btn-warning btn-sm me-2" @click="openModal(user)">Edit</button>
          <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)">Delete</button>
        </div>
      </li>
    </ul>

    <!-- Modal for Create/Edit -->
    <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true" ref="modal">
      <div class="modal-dialog">
        <form class="modal-content" @submit.prevent="saveUser">
          <div class="modal-header">
            <h5 class="modal-title" id="userModalLabel">{{ form.id ? 'Edit User' : 'Create User' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="resetForm()"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input v-model="form.name" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input v-model="form.email" type="email" class="form-control" required />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="resetForm()">Close</button>
            <button type="submit" class="btn btn-primary">{{ form.id ? 'Update' : 'Create' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      users: [],
      form: { id: null, name: '', email: '' },
      modalInstance: null,
    };
  },
  methods: {
    fetchUsers() {
      axios.get('http://localhost:3000/users')
        .then(res => this.users = res.data);
    },
    openModal(user = null) {
      this.form = user ? { ...user } : { id: null, name: '', email: '' };
      this.modalInstance.show();
    },
    saveUser() {
      const request = this.form.id
        ? axios.put(`http://localhost:3000/users/${this.form.id}`, this.form)
        : axios.post('http://localhost:3000/users', this.form);

      request.then(() => {
        this.fetchUsers();
        this.modalInstance.hide();
        this.resetForm();
      });
    },
    deleteUser(id) {
      axios.delete(`http://localhost:3000/users/${id}`)
        .then(() => this.fetchUsers());
    },
    resetForm() {
      this.form = { id: null, name: '', email: '' };
    }
  },
  mounted() {
    this.fetchUsers();
    const modalEl = this.$refs.modal;
    this.modalInstance = new Modal(modalEl);
  }
};
</script>
