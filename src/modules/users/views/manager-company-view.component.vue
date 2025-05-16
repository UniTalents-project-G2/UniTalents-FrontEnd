<script>
import { getCompanyById } from '@/modules/users/services/company.service'

export default {
  name: 'manager-company-view',
  data() {
    return {
      company: {}
    }
  },
  async created() {
    this.company = await getCompanyById(1) // ← por ahora cargamos la empresa 1
  }
}
</script>

<template>
  <div class="company-view">
    <h1>Mi Empresa</h1>
    <div class="company-card">
      <img :src="company.logoUrl" class="logo" alt="Logo empresa" />
      <div class="info">
        <p><strong>Nombre:</strong> {{ company.name }}</p>
        <p><strong>Creador:</strong> {{ company.creator }}</p>
        <p><strong>Ciudad/País:</strong> {{ company.location }}</p>
        <p><strong>Enfoque:</strong> {{ company.focus }}</p>
        <p><strong>Correo electrónico:</strong> {{ company.email }}</p>
        <p><strong>Celular:</strong> {{ company.phone }}</p>
      </div>
    </div>

    <div class="rating">
      ⭐ {{ company.rating }}
    </div>

    <p class="subtitle">Tecnologías y Especializaciones dentro de la empresa</p>
    <div class="tags">
      <span
          class="tag"
          v-for="tech in company.technologies"
          :key="tech"
      >
        {{ tech }}
      </span>
    </div>

    <div class="buttons">
      <button class="delete">Eliminar Cuenta</button>
      <router-link to="/manager/company/edit">
        <button class="edit">Modificar perfil</button>
      </router-link>

    </div>
  </div>
</template>

<style scoped>
.company-view {
  background: #f4f1ea;
  padding: 2rem;
  font-family: 'Nunito', sans-serif;
}

.company-card {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.logo {
  width: 250px;
  height: 250px;
  object-fit: contain;
  border-radius: 100%;
  background: #eee;
}

.info p {
  margin: 0.4rem 0;
  font-size: 0.95rem;
}

.rating {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.subtitle {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.tags {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.tag {
  background: #c9d8f0;
  color: #1c1f2b;
  font-size: 0.9rem;
  border-radius: 20px;
  padding: 0.4rem 0.8rem;
}

.buttons {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

button {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.delete {
  background: #f87171;
  color: white;
}

.edit {
  background: #FFD479;
  color: #1c1f2b;
}
</style>
