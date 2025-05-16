<script>
import { getPostulationById, getMultipleStudents } from '@/modules/applications/services/postulation.service'
import StudentCard from '@/modules/users/components/student-card.component.vue'

export default {
  name: 'manager-application-detail-view',
  components: {
    StudentCard
  },
  data() {
    return {
      postulation: {},
      applicants: [],
      filteredApplicants: [],
      filters: {
        career: '',
        skill: '',
        minRating: ''
      }
    }
  },
  async created() {
    const id = Number(this.$route.params.id)
    this.postulation = await getPostulationById(id)
    this.applicants = await getMultipleStudents(this.postulation.applicants)
    this.filteredApplicants = this.applicants
  },
  computed: {
    careers() {
      return [...new Set(this.applicants.map(s => s.career))]
    },
    allSkills() {
      return [...new Set(this.applicants.flatMap(s => s.skills))]
    }
  },
  methods: {
    applyFilters() {
      this.filteredApplicants = this.applicants.filter(student => {
        const matchesCareer = !this.filters.career || student.career === this.filters.career
        const matchesSkill = !this.filters.skill || student.skills.includes(this.filters.skill)
        const matchesRating = !this.filters.minRating || student.rating >= parseFloat(this.filters.minRating)
        return matchesCareer && matchesSkill && matchesRating
      })
    },
    handleViewReputation(student) {
      console.log('Ver reputación de:', student.name)

    }
  }
}
</script>

<template>
  <div class="application-detail">
    <router-link to="/manager/applications" class="back">
      ← Volver a Evaluaciones
    </router-link>

    <h1>{{ postulation.title }}</h1>

    <div class="filters">
      <select v-model="filters.career">
        <option value="">Carrera</option>
        <option v-for="c in careers" :key="c" :value="c">{{ c }}</option>
      </select>

      <select v-model="filters.skill">
        <option value="">Habilidades</option>
        <option v-for="s in allSkills" :key="s" :value="s">{{ s }}</option>
      </select>

      <select v-model="filters.minRating">
        <option value="">Calificación mínima</option>
        <option v-for="r in [5, 4, 3, 2, 1]" :key="r" :value="r">{{ r }}</option>
      </select>

      <button @click="applyFilters">Filtrar</button>
    </div>

    <div class="student-cards">
      <StudentCard
          v-for="student in filteredApplicants"
          :key="student.id"
          :id="student.id"
          :name="student.name"
          :career="student.career"
          :rating="student.rating"
          :skills="student.skills"
          :avatar="student.avatar"
          :portfolioUrl="student.portfolioUrl"
          :applicationId="postulation.id"
      />
    </div>
  </div>
</template>

<style scoped>
.application-detail {
  padding: 2rem;
  background: #f4f1ea;
}

.application-detail h1 {
  font-family: Inter, sans-serif;
}

.back {
  display: inline-block;
  margin-bottom: 1rem;
  color: #1c1f2b;
  text-decoration: none;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.filters select,
.filters button {
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.student-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
