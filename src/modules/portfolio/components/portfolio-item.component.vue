<template>
  <div
      class="portfolio-card"
      @click="goToProject"
  >
    <h3 class="card-title">{{ project.title }}</h3>
    <div class="skills-container">
      <span
          v-for="(skill, index) in project.skills"
          :key="index"
          class="skill-tag"
      >
        {{ skill }}
      </span>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  props: {
    project: {
      type: Object,
      required: true,
      validator: (p) => p.title && Array.isArray(p.skills) && p.id
    },
    userType: {
      type: String,
      default: 'student',
      validator: (value) => ['student', 'manager'].includes(value)
    }
  },
  setup(props) {
    const router = useRouter();

    const goToProject = () => {
      // Usamos el userType para determinar la ruta correcta
      if (props.userType === 'manager') {
        router.push({
          name: 'ManagerProjectDetail',
          params: { id: props.project.id }
        });
      } else {
        router.push({
          name: 'StudentProjectDetail',
          params: { id: props.project.id }
        });
      }
    };

    return { goToProject };
  }
};
</script>
<style scoped>
.portfolio-card {
  background: white;
  border-radius: 8px;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
}

.portfolio-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-title {
  margin: 0 0 0.75rem 0;
  color: #1C1F2B;
  font-size: 1.1rem;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background: #E5E7EB;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #4B5563;
}
</style>