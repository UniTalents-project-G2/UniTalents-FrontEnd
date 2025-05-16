<template>
  <aside class="sidebar">
    <div class="logo-container">
      <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgvCsufMnEbJGV3lUDDIVJzrt_0h1LGoGcW26SsmrCMYUPOxVrSBrtAWYePDBixX3g5mOd0W_9y6Gb4NfTtCRYxKssHvlzuKRm2siI6k3oT1UeSGwNcw7nIYroOFQZ8rXjgVkMFNorTd-65rgFev0NW6Xitt3gTTuMMSWx6NF9yPejDrCvTLdX5AnBQ_UE/s832/LogoUniTalents%20Connect.png" alt="UniTalents Connect" class="logo"/>
    </div>

    <nav class="nav">
      <RouterLink to="/manager/projects" class="nav-item" active-class="active">
        <i class="fas fa-briefcase"></i>
        <span>Proyectos</span>
      </RouterLink>

      <RouterLink to="/manager/applications" class="nav-item" active-class="active">
        <i class="fas fa-clipboard-check"></i>
        <span>Postulaciones</span>
      </RouterLink>

      <RouterLink to="/manager/company" class="nav-item" active-class="active">
        <i class="fas fa-user"></i>
        <span>Mi empresa</span>
      </RouterLink>

      <RouterLink to="/manager/settings" class="nav-item" active-class="active">
        <i class="fas fa-cog"></i>
        <span>Configuración</span>
      </RouterLink>
    </nav>

    <div class="logout">
      <RouterLink to="/" class="nav-item">
        <span>Cerrar Sesión</span>
      </RouterLink>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'ManagerSidebar'
}
</script>

<style scoped>
.sidebar {
  width: 220px;
  height: 100vh;
  background-color: #1C1F2B;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem 1rem;
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.logo {
  width: 120px;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.nav-item:hover {
  background-color: #2a2e3d;
}

.nav-item.active {
  background-color: #FFD479;
  color: black;
  font-weight: bold;
}

.logout {
  margin-top: auto;
}
</style>
