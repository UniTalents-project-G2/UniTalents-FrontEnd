<script>
export default {
  name: 'postulations-card',
  props: {
    id: Number,
    title: String,
    pending: Number,
    createdAt: String
  }
}
</script>

<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <p>👤 {{ pending }} personas pendientes</p>
    <p>📅 {{ createdAt }}</p>
    <router-link :to="`/manager/applications/${id}`">
      <button>Ver más</button>
    </router-link>
  </div>
</template>


<style scoped>
.card {
  background: #fff;
  border: 2px solid #1c1f2b;
  border-radius: 8px;
  padding: 1.5rem;
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
}

h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1c1f2b;
  margin: 0;
}

.meta {
  font-size: 0.95rem;
  color: #1c1f2b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

button {
  background: #FFD479;
  color: #1c1f2b;
  border: none;
  width: 100%;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
}

button:hover {
  background-color: #ffc84c;
}

</style>
