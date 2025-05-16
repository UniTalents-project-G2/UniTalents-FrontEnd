<script>
import { getOpportunityById } from '../services/opportunity.service';
import { StudentPostulationService } from '@/modules/student-postulations/services/student-postulations.service.js';

export default {
  name: 'OpportunityDetailPage',
  data() {
    return {
      opportunity: null,
      postulationService: new StudentPostulationService()
    };
  },
  async created() {
    const id = this.$route.params.id;
    this.opportunity = await getOpportunityById(id);
  },
  methods: {
    async postularme() {
      try {
        await this.postulationService.createPostulation({
          projectId: this.opportunity.id,
          postulationStatus: 'pending'
        });
        alert('¡Postulación enviada exitosamente!');
        this.$router.push('/student/postulations');
      } catch (error) {
        alert('Ocurrió un error al postular.');
      }
    }
  }


};
</script>
<template>
  <div class="opportunity-detail">
    <button class="back-btn" @click="$router.push('/student/opportunities')">
      ← Volver a Oportunidades
    </button>

    <div v-if="opportunity" class="detail-container">
      <div class="left">
        <h2>{{ opportunity.title }}</h2>
        <div class="tags">
          <span v-for="tech in opportunity.technologies" :key="tech" class="tag">{{ tech }}</span>
        </div>
        <p class="description">{{ opportunity.description }}</p>
      </div>

      <div class="right">
        <div class="published">
          <span class="label">Fecha de publicación</span>
          <p>{{ opportunity.datePublished }}</p>
        </div>

        <div class="company">
          <span class="label">Empresa</span>
          <img :src="opportunity.company.logoUrl" class="logo" />
          <p>{{ opportunity.company.name }}</p>
        </div>

        <div class="actions">
          <button class="company-btn" @click="$router.push(`/student/companies/${opportunity.company.id}`)">
            Ver empresa
          </button>
          <button class="post-btn" @click="postularme">Postularme</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.opportunity-detail {
  background-color: #f7f0e6;
  min-height: 100vh;
  padding: 2rem 1.5rem;
  font-family: 'Inter', sans-serif;
}

.back-btn {
  background: none;
  border: none;
  color: #111;
  font-weight: bold;
  margin-bottom: 1rem;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
}

.detail-container {
  background: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}


.left {
  width: 60%;
}
.right {
  width: 35%;
  text-align: center;
}

.description {
  margin: 1.5rem 0;
}

.tags {
  margin-top: 1rem;
}
.tag {
  background-color: #dbeafe;
  color: #1e3a8a;
  padding: 6px 10px;
  border-radius: 6px;
  margin-right: 0.5rem;
  font-size: 0.9rem;
}

.label {
  font-weight: bold;
  color: #444;
  display: block;
  margin-bottom: 0.25rem;
}

.logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0.5rem auto;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.company-btn {
  background-color: #111827;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.post-btn {
  background-color: #facc15;
  color: #111;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}
</style>

