<script>
import ProjectCard from '@/modules/projects/components/project-card.component.vue'
import { getAllProjects } from '@/modules/projects/services/project.service'

export default {
  name: 'manager-projects-view',
  components: {
    ProjectCard
  },
  data() {
    return {
      projects: []
    }
  },
  async created() {
    this.projects = await getAllProjects()
  }
}
</script>

<template>
  <div class="projects-view">
    <div class="header">
      <h1>Mis Proyectos</h1>
      <router-link to="/manager/projects/new">
        <button class="new-project-btn">Nuevo Proyecto</button>
      </router-link>
    </div>

    <div class="projects-grid">
      <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :id="project.id"
          :title="project.title"
          :manager="project.manager"
          :status="project.status"
          :dueDate="project.dueDate"
      />
    </div>
  </div>
</template>

<style scoped>
.projects-view {
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h1 {
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.new-project-btn {
  background: #1c1f2b;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.new-project-btn:hover {
  background-color: #2a2e3d;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
</style>