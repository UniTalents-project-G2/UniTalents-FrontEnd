<script>
import OpportunityList from '../components/opportunity-list.component.vue';

export default {
  name: 'OpportunityListPage',
  components: {
    OpportunityList
  }
};
</script>


<template>
  <div class="opportunity-page">
    <OpportunityList />
  </div>
</template>


<style scoped>
.opportunity-page {
  background-color: #f5f0e7;
  min-height: 100vh;
  padding: 50px;
}
</style>
