<script>
import { getAllOpportunities } from '../services/opportunity.service';
import OpportunityCard from './opportunity-card.component.vue';

export default {
  name: 'OpportunityList',
  components: {
    OpportunityCard
  },
  data() {
    return {
      opportunities: []
    };
  },
  async created() {
    this.opportunities = await getAllOpportunities();
  }
};
</script>


<template>
  <section class="opportunity-list">
    <h2>Nuestras recomendaciones</h2>
    <div class="card-grid">
      <OpportunityCard
          v-for="op in opportunities"
          :key="op.id"
          :opportunity="op"
      />
    </div>
  </section>
</template>


<style scoped>
.opportunity-list {
  padding: 2rem;
}

.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
