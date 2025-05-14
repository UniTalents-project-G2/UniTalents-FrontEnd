<script>
import ManagerSidebar from '@/shared/components/manager-sidebar.component.vue'
import PostulationList from '@/modules/applications/components/postulation-list.component.vue'

export default {
  name: 'manager-applications-view',
  components: {
    ManagerSidebar,
    PostulationList
  }
}
</script>

<template>
  <div class="layout">
    <main class="content">
      <h1>Postulaciones</h1>
      <PostulationList />
    </main>
  </div>
</template>


<style scoped>
.layout {
  display: flex;
}

.content {
  flex: 1;
  padding: 2rem;
  background-color: #f4f1ea;
}

.content h1{
  font-family: Inter, sans-serif;
}
</style>