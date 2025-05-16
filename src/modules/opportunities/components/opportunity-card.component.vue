<template>
  <div class="opportunity-card">
    <div class="card-header">
      <h3>{{ opportunity.title }}</h3>
      <p class="company">{{ opportunity.company.name }}</p>
    </div>
    <p class="published-date">Hace {{ daysSincePublished }} días</p>
    <p class="budget">$ {{ opportunity.budget }}</p>
    <button @click="goToDetail">Postularme</button>
  </div>
</template>

<script>
export default {
  name: 'OpportunityCard',
  props: {
    opportunity: {
      type: Object,
      required: true
    }
  },
  computed: {
    daysSincePublished() {
      const publishedDate = new Date(this.opportunity.datePublished);
      const today = new Date();
      const diffTime = Math.abs(today - publishedDate);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  },
  methods: {
    goToDetail() {
      this.$router.push(`/student/opportunities/${this.opportunity.id}`);
    }
  }
};
</script>

<style scoped>
.opportunity-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 1.5rem;
  width: 320px; /* antes 250px */
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
.card-header h3 {
  margin: 0;
}
.company {
  font-size: 0.9rem;
  color: #666;
}
.published-date {
  font-size: 0.8rem;
  color: #999;
}
.budget {
  font-weight: bold;
  margin: 0.5rem 0;
}
button {
  background-color: #fcd34d;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
}
</style>
