<script>
import PostulationCard from "@/modules/applications/components/postulations-card.component.vue";
import { getAllPostulations } from '@/modules/applications/services/postulation.service'

export default {
  name: 'PostulationList',
  components: {
    PostulationCard
  },
  data() {
    return {
      postulations: []
    }
  },
  async mounted() {
    try {
      this.postulations = await getAllPostulations()
    } catch (error) {
      console.error('Error cargando postulaciones:', error)
    }
  }
}
</script>


<template>
  <div class="cards">
    <PostulationCard
        v-for="postulation in postulations"
        :key="postulation.id"
        :id="postulation.id"
        :title="postulation.title"
        :pending="postulation.applicantCount()"
        :createdAt="postulation.createdAt"
    />
  </div>
</template>


<style scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1rem;
}
</style>
