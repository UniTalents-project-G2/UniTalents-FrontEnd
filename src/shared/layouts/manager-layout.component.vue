<script>
import ManagerSidebar from '@/shared/components/manager-sidebar.component.vue'

export default {
  name: 'ManagerLayout',
  components: {
    ManagerSidebar
  }
}
</script>


<template>
  <div class="layout">
    <ManagerSidebar />
    <main class="content">
      <router-view />
    </main>
  </div>
</template>



<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.content {
  flex: 1;
  padding: 2rem;
  background-color: #f4f1ea;
  overflow-y: auto;
}
</style>
