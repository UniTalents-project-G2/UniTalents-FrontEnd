<script>
import StudentSidebar from '@/shared/components/student-sidebar.component.vue'

export default {
  name: 'StudentLayout',
  components: {
    StudentSidebar
  }
}
</script>


<template>
  <div class="layout">
    <StudentSidebar></StudentSidebar>
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
