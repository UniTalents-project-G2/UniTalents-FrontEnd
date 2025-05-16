<script>
import {
  getStudentById,
  getPostulationById,
  selectStudentInPostulation
} from '@/modules/applications/services/postulation.service'

export default {
  name: 'student-reputation-view',
  data() {
    return {
      student: null,
      postulationId: null,
      alreadyAccepted: false
    }
  },
  async created() {
    const studentId = Number(this.$route.params.studentId)
    this.postulationId = Number(this.$route.params.applicationId)

    this.student = await getStudentById(studentId)
    const postulation = await getPostulationById(this.postulationId)
    this.alreadyAccepted = postulation.selectedStudentId === this.student.id
  },
  methods: {
    async acceptStudent() {
      try {
        await selectStudentInPostulation(this.postulationId, this.student.id)
        this.alreadyAccepted = true
        alert(`Estudiante ${this.student.name} ha sido aceptado correctamente.`)
      } catch (error) {
        console.error('Error al aceptar estudiante:', error)
        alert('No se pudo aceptar al estudiante.')
      }
    },
    async cancelAcceptance() {
      try {
        await selectStudentInPostulation(this.postulationId, null)
        this.alreadyAccepted = false
        alert('Selección cancelada correctamente.')
      } catch (error) {
        console.error('Error al cancelar selección:', error)
        alert('No se pudo quitar la aceptación.')
      }
    }

  }
}
</script>

<template>
  <div class="student-reputation">
    <router-link :to="`/manager/applications/${postulationId}`" class="back">
      ← Volver
    </router-link>

    <div class="profile">
      <img :src="student.avatar" alt="Foto" />
      <div class="info">
        <h2>{{ student.name }}</h2>
        <p>{{ student.career }}</p>
        <p class="rating">
          ⭐ {{ student.rating }} — {{ student.reputation.length }} proyectos completados
        </p>
      </div>
      <button
          class="accept-btn"
          v-if="!alreadyAccepted"
          @click="acceptStudent"
      >
        Aceptar
      </button>

      <button
          class="cancel-btn"
          v-else
          @click="cancelAcceptance"
      >
        Quitar Aceptado
      </button>

    </div>

    <h3>Reputación</h3>

    <div class="reputation-cards">
      <div
          class="reputation-card"
          v-for="rep in student.reputation"
          :key="rep.project"
      >
        <div class="left">
          <h4>{{ rep.project }}</h4>
          <p>{{ rep.company }}</p>
          <p>⭐ {{ rep.score }}</p>
        </div>
        <p class="comment">“{{ rep.comment }}”</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.student-reputation {
  padding: 2rem;
  background: #f4f1ea;
  font-family: 'Nunito', sans-serif;
}

.back {
  display: inline-block;
  margin-bottom: 1rem;
  color: #1c1f2b;
  text-decoration: none;
  font-weight: 600;
}

.profile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.profile img {
  width: 200px;
  height: 200px;
  border-radius: 100%;
  object-fit: cover;
  margin-right: 1.5rem;
}

.info {
  flex: 1;
  margin-left: 1rem;
}

.info h2 {
  margin: 0;
  font-size: 1.5rem;
}

.info p {
  margin: 0.3rem 0;
  font-size: 1rem;
}

.info a {
  font-size: 0.95rem;
  color: #3366cc;
  text-decoration: underline;
}

.accept-btn {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  width: 10%;
  margin: 0 auto;
  display: block;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  background: #FFD479;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.accept-btn:disabled {
  background: #ddd;
  cursor: not-allowed;
  color: #555;
}

.accept-btn:hover:not(:disabled) {
  background-color: #ffc84c;
}

.cancel-btn {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  width: 10%;
  margin: 0 auto;
  display: block;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  background: #d4d4d4;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
  color: #1c1f2b;
}

.reputation-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.reputation-card {
  display: flex;
  justify-content: space-between;
  background: white;
  border: 2px solid #1c1f2b;
  border-radius: 10px;
  padding: 1rem;
}

.reputation-card .left h4 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.reputation-card .left p {
  margin: 0.2rem 0;
}

.reputation-card .comment {
  width: 50%;
  font-style: italic;
  text-align: right;
  color: #333;
}
</style>
