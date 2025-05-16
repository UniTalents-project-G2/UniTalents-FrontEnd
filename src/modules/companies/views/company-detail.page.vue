<template>
  <div class="company-detail">
    <h2>Empresa encargada:</h2>

    <div class="card">
      <img :src="company.logoUrl" alt="Logo empresa" class="logo" />
      <p><strong>Nombre:</strong> {{ company.name }}</p>
      <p><strong>Creador:</strong> {{ company.creator }}</p>
      <p><strong>Ciudad/País:</strong> {{ company.location }}</p>
      <p><strong>Enfoque:</strong> {{ company.focus }}</p>
      <p><strong>Correo electrónico:</strong> {{ company.email }}</p>
      <p><strong>Celular:</strong> {{ company.phone }}</p>

      <div class="rating">
        ⭐ {{ company.rating }}
      </div>

      <p><strong>Tecnologías y Especializaciones dentro de la empresa</strong></p>
      <div class="tags">
        <span v-for="tech in company.technologies" :key="tech" class="tag">{{ tech }}</span>
      </div>

      <button class="exit-btn" @click="$router.push('/student/opportunities')">Salir</button>
    </div>
  </div>
</template>

<script>
import http from "@/shared/services/http.instance.js";

export default {
  name: 'CompanyDetailPage',
  data() {
    return {
      company: {}
    };
  },
  async created() {
    const id = this.$route.params.id;
    const response = await http.get(`${import.meta.env.VITE_COMPANIES_ENDPOINT_PATH}/${id}`);
    this.company = response.data;
  }
};
</script>

<style scoped>
.company-detail {
  background-color: #f7f0e6;
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 2rem 3rem;
  width: 600px;
  margin: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

h2 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: bold;
  color: #111827;
}

.logo {
  width: 240px;
  border-radius: 12px;
  display: block;
  margin: 1rem auto;
}

.card p {
  margin: 0.2rem 0;
  color: #111;
  font-size: 0.95rem;
}

.card strong {
  color: #111827;
}

.rating {
  font-size: 1.1rem;
  color: #fbbf24;
  margin: 1rem 0 0.5rem;
  text-align: center;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0 2rem;
  justify-content: center;
}
.tag {
  background-color: #cbd5e1;
  color: #1e293b;
  padding: 5px 12px;
  border-radius: 5px;
  font-size: 0.85rem;
}

.exit-btn {
  background-color: #111827;
  color: white;
  padding: 10px 22px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  display: block;
  margin: auto;
  transition: background 0.3s ease;
}
.exit-btn:hover {
  background-color: #000;
}
</style>
