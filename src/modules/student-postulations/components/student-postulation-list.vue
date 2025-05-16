<!-- StudentPostulationList.vue -->
<template>
  <div class="postulation-list">
    <StudentPostulationItem
        @click="goToProject(project)"
        v-for="post in postulationsWithProjects"
        :key="post.id"
        :postulation="post"
        :project="post.project"
    />
  </div>
</template>

<script>
import StudentPostulationItem from "@/modules/student-postulations/components/student-postulation-item.vue";
import { StudentPostulationService} from "@/modules/student-postulations/services/student-postulations.service.js";
import { PortfolioService } from '@/modules/portfolio/services/portfolio.service.js';

export default {
  name: 'StudentPostulationList',
  components: {
    StudentPostulationItem
  },
  data() {
    return {
      postulationsWithProjects: []
    };
  },
  async mounted() {
    const studentPostulationService = new StudentPostulationService();
    const portfolioService = new PortfolioService();

    try {
      const [postulations, projects] = await Promise.all([
        studentPostulationService.getAllPostulations(),
        portfolioService.getAllProjects()
      ]);

      this.postulationsWithProjects = postulations.map(post => {
        const relatedProject = projects.find(p => p.id === post.projectId);
        return {
          ...post,
          project: relatedProject
        };
      });
    } catch (error) {
      console.error('Error loading postulations with projects:', error);
    }
  }
};
</script>

<style scoped>
.postulation-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}




</style>
