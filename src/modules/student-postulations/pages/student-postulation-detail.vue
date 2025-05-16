<template>
  <div class="project-detail-view">
    <button @click="goBack" class="back-button">
      <i class="pi pi-arrow-left"></i> Volver a postulaciones
    </button>

    <div class="project-header">
      <h1>{{ project.title }}</h1>
      <span class="status-badge">{{ project.status }}</span>
    </div>

    <div class="project-content">
      <div class="project-meta">
        <div class="meta-item">
          <i class="pi pi-user"></i>
          <span>{{ project.manager }}</span>
        </div>
        <div class="meta-item">
          <i class="pi pi-calendar"></i>
          <span>{{ formatDate(project.dueDate) }}</span>
        </div>
      </div>

      <div class="project-description">
        <h3>Descripción</h3>
        <p>{{ project.description }}</p>
      </div>

      <div class="project-skills">
        <h3>Habilidades requeridas</h3>
        <div class="skills-list">
          <span
              v-for="(skill, index) in project.skills"
              :key="index"
              class="skill-tag"
          >
            {{ skill }}
          </span>
        </div>
      </div>

      <div class="project-members" v-if="project.members.length > 0">
        <h3>Equipo</h3>
        <div class="members-list">
          <span
              v-for="(member, index) in project.members"
              :key="index"
              class="member-tag"
          >
            {{ member }}
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {PortfolioService} from "@/modules/portfolio/services/portfolio.service.js";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const project = ref({

      title: '',
      status: '',
      manager: '',
      dueDate: '',
      description: '',
      skills: [],
      members: []
    });
    const loading = ref(true);

    const formatDate = (dateString) => {
      if (!dateString) return 'No especificada';
      return new Date(dateString).toLocaleDateString();
    };

    const fetchProject = async () => {
      try {
        const portfolioService = new PortfolioService();
        const projectData = await portfolioService.getProjectById(route.params.id);


        project.value = {
          ...projectData,
          members: projectData.members || []
        };

      } catch (error) {
        console.error("Error loading project:", error);
        await router.push('/portfolio');
      } finally {
        loading.value = false;
      }
    };

    const goBack = () => {
      router.go(-1);
    };

    onMounted(fetchProject);

    return {
      project,
      loading,
      formatDate,
      goBack
    };
  }
};
</script>

<style scoped>
.project-detail-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.project-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.project-header h1 {
  margin: 0;
  color: #1C1F2B;
}

.status-badge {
  background: #4CAF50;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.project-meta {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  color: #6B7280;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.project-description {
  margin-bottom: 2rem;
}

.project-description h3,
.project-skills h3,
.project-members h3 {
  color: #1C1F2B;
  margin-bottom: 1rem;
}

.skills-list,
.members-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag,
.member-tag {
  background: #E5E7EB;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: #4B5563;
}

.back-button {
  background: none;
  border: none;
  color: #1C1F2B;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  margin-bottom: 1rem;
}

.back-button:hover {
  text-decoration: underline;
}
</style>