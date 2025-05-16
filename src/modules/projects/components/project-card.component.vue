<script>
export default {
  name: 'project-card',
  props: {
    id: [String, Number],
    title: String,
    manager: String,
    status: String,
    dueDate: String
  },
  computed: {
    statusClass() {
      return {
        'en-curso': this.status === 'En curso',
        'finalizado': this.status === 'Finalizado',
        'pendiente': this.status === 'Pendiente'
      }
    }
  }
}
</script>

<template>
  <div class="project-card">
    <div class="header">
      <h3>{{ title }}</h3>
      <span :class="['status', statusClass]">{{ status }}</span>
    </div>
    <p class="manager">Responsable: {{ manager }}</p>
    <p class="due-date">Fecha límite: {{ dueDate }}</p>
    <div class="actions">
      <router-link :to="`/manager/projects/${id}`">
        <button class="view-btn">Ver más</button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.project-card {
  background: #fff;
  border: 2px solid #1c1f2b;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
}

.status {
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.status.en-curso {
  background-color: #FFD479;
  color: #1c1f2b;
}

.status.finalizado {
  background-color: #d4d4d4;
  color: #1c1f2b;
}

.status.pendiente {
  background-color: #c9d8f0;
  color: #1c1f2b;
}

.manager, .due-date {
  margin: 0;
  font-size: 0.9rem;
  color: #555;
}

.actions {
  margin-top: 1rem;
}

.view-btn {
  background: #FFD479;
  color: #1c1f2b;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
}

.view-btn:hover {
  background-color: #ffc84c;
}
</style>