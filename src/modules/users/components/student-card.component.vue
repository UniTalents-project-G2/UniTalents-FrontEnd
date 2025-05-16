<script>
export default {
  name: 'student-card.component',
  props: {
    id: [String, Number],
    name: String,
    career: String,
    rating: Number,
    skills: Array,
    avatar: String,
    portfolioUrl: String,
    applicationId: [String, Number]
  }
}
</script>

<template>
  <div class="student-card">
    <img :src="avatar" alt="Foto del estudiante" />
    <div class="info">
      <h3>{{ name }}</h3>
      <p>{{ career }}</p>
      <p>⭐ {{ rating }}</p>
      <div class="skills">
        <span
            v-for="skill in skills"
            :key="skill"
            class="badge"
        >{{ skill }}</span>
      </div>
      <a :href="portfolioUrl" target="_blank">Ver portafolio</a>
    </div>
    <router-link :to="`/manager/applications/${applicationId}/students/${id}`">
      <button class="reputation">Ver reputación</button>
    </router-link>
  </div>
</template>

<style scoped>
.student-card {
  display: flex;
  align-items: center;
  background: #fff;
  border: 2px solid #1c1f2b;
  border-radius: 10px;
  padding: 1rem;
  gap: 1rem;
}

.student-card img {
  width: 150px;
  height: 150px;
  border-radius: 100%;
  object-fit: cover;
}

.info {
  flex: 1;
}

.skills {
  margin: 0.5rem 0;
}

.badge {
  background: #dce5f5;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
}

.reputation {
  background: #FFD479;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  cursor: pointer;
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
</style>
