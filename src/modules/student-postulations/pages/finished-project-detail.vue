<template>
  <div class="project-detail-view">
    <button @click="goBack" class="back-button">
      <i class="pi pi-arrow-left"></i> Volver a postulaciones
    </button>

    <div class="project-header">
      <h1>{{ project.title }}</h1>
      <span class="status-badge finished">Finalizado</span>
    </div>

    <div class="project-content">
      <div class="message">
        <p>Tu participación en este proyecto ha finalizado.</p>
        <p>Gracias por tu contribución.</p>
      </div>

      <div class="project-description">
        <h3>Resumen</h3>
        <p>{{ project.description }}</p>
      </div>

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
    </div>

    <button @click="goToRating" class="rate-button">
      Calificar empresa
    </button>
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
    });

    const formatDate = (dateString) => {
      if (!dateString) return 'No especificada';
      return new Date(dateString).toLocaleDateString();
    };


    const goBack = () => {
      router.push('/student/postulations');
    };

    const fetchProject = async () => {
      try {
        const portfolioService = new PortfolioService();
        project.value = await portfolioService.getProjectById(route.params.id);
      } catch (error) {
        console.error("Error loading project:", error);
        await router.push('/portfolio');
      }
    };

    const goToRating = () => {
      router.push(`/project/rate/${route.params.id}`);
    };

    onMounted(fetchProject);

    return {
      project,
      formatDate,
      goToRating,
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

.status-badge.finished {
  background: #9C27B0;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.message {
  background: #F3F4F6;
  padding: 1rem;
  border-left: 5px solid #9C27B0;
  margin-bottom: 2rem;
  border-radius: 4px;
  color: #374151;
}

.rate-button {
  margin-top: 2rem;
  background: #9C27B0;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.rate-button:hover {
  background: #7B1FA2;
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
