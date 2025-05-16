<template>
  <div class="portfolio-list">
    <h2 class="list-title">Proyectos Completados</h2>

    <div class="projects-grid">
      <PortfolioItem
          v-for="project in completedProjects"
          :key="project.id"
          :project="project"
      />
    </div>

    <div v-if="!loading && completedProjects.length === 0" class="empty-message">
      No hay proyectos completados
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import {PortfolioService} from "@/modules/portfolio/services/portfolio.service.js";
import PortfolioItem from "@/modules/portfolio/components/portfolio-item.component.vue";

export default {
  components: { PortfolioItem },
  setup() {
    const completedProjects = ref([]);
    const loading = ref(false);
    const portfolioService = new PortfolioService();

    const loadCompletedProjects = async () => {
      try {
        loading.value = true;
        const allProjects = await portfolioService.getAllProjects();
        completedProjects.value = allProjects.filter(
            project => project.status === 'Finalizado'
        );
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(loadCompletedProjects);

    return { completedProjects, loading };
  }
};
</script>

<style scoped>
.portfolio-list {
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.list-title {
  color: #1C1F2B;
  margin-bottom: 1.5rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.empty-message {
  text-align: center;
  color: #6B7280;
  padding: 2rem;
  border: 1px dashed #E5E7EB;
  border-radius: 8px;
}
</style>