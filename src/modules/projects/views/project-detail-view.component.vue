<script>
import { getProjectById, updateProject, deleteProject, createProject } from '@/modules/projects/services/project.service'

export default {
  name: 'project-detail-view',
  data() {
    return {
      project: null,
      isEditing: false,
      editData: {},
      newSkill: '',
      errors: {
        title: false,
        manager: false
      }
    }
  },
  async created() {
    const id = this.$route.params.id
    if (id !== 'new') {
      this.project = await getProjectById(id)
      this.editData = { ...this.project }
      if (this.editData.dueDate && this.editData.dueDate.match(/\d{4}-\d{2}-\d{2}/)) {
        this.editData.dueDate = this.editData.dueDate.split('T')[0]
      }
    } else {
      this.isEditing = true
      this.editData = {
        title: '',
        manager: '',
        status: 'Pendiente',
        dueDate: '',
        description: '',
        skills: [],
        members: []
      }
    }
  },
  methods: {
    validateForm() {
      this.errors.title = !this.editData.title.trim()
      this.errors.manager = !this.editData.manager.trim()

      return !this.errors.title && !this.errors.manager
    },
    async saveProject() {
      if (!this.validateForm()) {
        return
      }

      try {
        if (this.project) {
          this.project = await updateProject(this.project.id, this.editData)
        } else {
          this.project = await createProject(this.editData)
          this.$router.push(`/manager/projects/${this.project.id}`)
        }
        this.isEditing = false
      } catch (error) {
        console.error('Error saving project:', error)
        alert('No se pudo guardar el proyecto')
      }
    },
    async deleteProject() {
      if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
        try {
          await deleteProject(this.project.id)
          this.$router.push('/manager/projects')
        } catch (error) {
          console.error('Error deleting project:', error)
          alert('No se pudo eliminar el proyecto')
        }
      }
    },
    startEditing() {
      this.editData = { ...this.project }
      if (this.editData.dueDate && this.editData.dueDate.match(/\d{4}-\d{2}-\d{2}/)) {
        this.editData.dueDate = this.editData.dueDate.split('T')[0]
      }
      this.isEditing = true
    },
    cancelEditing() {
      if (this.project) {
        this.isEditing = false
      } else {
        this.$router.push('/manager/projects')
      }
    },
    addSkill() {
      const skill = this.newSkill.trim();
      if (skill && !this.editData.skills.includes(skill)) {
        this.editData.skills = [...this.editData.skills, skill];
        this.newSkill = '';
      }
    }
  }
}
</script>

<template>
  <div class="project-detail">
    <router-link to="/manager/projects" class="back-link">
      ← Volver a Proyectos
    </router-link>

    <div v-if="!isEditing && project" class="project-info">
      <div class="header">
        <h1>{{ project.title }}</h1>
        <div class="actions">
          <button @click="startEditing" class="edit-btn">Editar</button>
          <button @click="deleteProject" class="delete-btn">Eliminar</button>
        </div>
      </div>

      <div class="meta">
        <p><strong>Responsable:</strong> {{ project.manager }}</p>
        <p><strong>Estado:</strong> {{ project.status }}</p>
        <p><strong>Fecha límite:</strong> {{ project.dueDate }}</p>
      </div>

      <div class="skills">
        <h3>Habilidades requeridas:</h3>
        <div class="skill-tags">
          <span v-for="skill in project.skills" :key="skill" class="skill-tag">
            {{ skill }}
          </span>
        </div>
      </div>

      <div class="description">
        <h3>Descripción:</h3>
        <p>{{ project.description }}</p>
      </div>

      <div class="members">
        <h3>Integrantes:</h3>
        <p v-if="project.members.length === 0">No hay integrantes asignados</p>
        <ul v-else>
          <li v-for="member in project.members" :key="member">{{ member }}</li>
        </ul>
      </div>
    </div>

    <div v-else class="edit-form">
      <h1>{{ project ? 'Editar Proyecto' : 'Nuevo Proyecto' }}</h1>

      <div class="form-group" :class="{ 'error': errors.title }">
        <label>Título: <span class="required">*</span></label>
        <input v-model="editData.title" type="text" placeholder="Nombre del proyecto">
        <span v-if="errors.title" class="error-message">Este campo es obligatorio</span>
      </div>

      <div class="form-group" :class="{ 'error': errors.manager }">
        <label>Responsable: <span class="required">*</span></label>
        <input v-model="editData.manager" type="text" placeholder="Nombre del responsable">
        <span v-if="errors.manager" class="error-message">Este campo es obligatorio</span>
      </div>

      <div class="form-group">
        <label>Estado:</label>
        <select v-model="editData.status">
          <option value="Pendiente">Pendiente</option>
          <option value="En curso">En curso</option>
          <option value="Finalizado">Finalizado</option>
        </select>
      </div>

      <div class="form-group">
        <label>Fecha límite:</label>
        <input v-model="editData.dueDate" type="date">
      </div>

      <div class="form-group">
        <label>Habilidades requeridas</label>
        <div class="skill-tags">
          <span v-for="(skill, index) in editData.skills" :key="index" class="skill-tag">
            {{ skill }}
            <button
                @click="editData.skills = editData.skills.filter((_, i) => i !== index)"
                class="remove-skill"
            >
              ×
            </button>
          </span>
        </div>
        <div class="add-skill">
          <input
              v-model="newSkill"
              @keyup.enter="addSkill"
              placeholder="Ej: Vue.js, MongoDB"
          >
          <button @click="addSkill">+</button>
        </div>
      </div>

      <div class="form-group">
        <label>Descripción:</label>
        <textarea v-model="editData.description" rows="5" placeholder="Descripción del proyecto"></textarea>
      </div>

      <div class="form-actions">
        <button @click="saveProject" class="save-btn">Guardar</button>
        <button @click="cancelEditing" class="cancel-btn" v-if="project">Cancelar</button>
        <button @click="cancelEditing" class="cancel-btn" v-else>Volver</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-detail {
  padding: 2rem;
}

.back-link {
  display: inline-block;
  margin-bottom: 1rem;
  color: #1c1f2b;
  text-decoration: none;
  font-weight: 600;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.edit-btn {
  background: #FFD479;
  color: #1c1f2b;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.delete-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.meta {
  margin-bottom: 1.5rem;
}

.meta p {
  margin: 0.5rem 0;
}

.skills, .description, .members {
  margin-bottom: 1.5rem;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.skill-tag {
  background: #dce5f5;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
}

.remove-skill {
  margin-left: 0.3rem;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.edit-form {
  max-width: 800px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-family: inherit;
}

.form-group textarea {
  resize: vertical;
}

.add-skill {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.add-skill input {
  flex: 1;
}

.add-skill button {
  background: #FFD479;
  border: none;
  border-radius: 6px;
  padding: 0 1rem;
  cursor: pointer;
  font-weight: bold;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.save-btn {
  background: #FFD479;
  color: #1c1f2b;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.cancel-btn {
  background: #d4d4d4;
  color: #1c1f2b;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.required {
  color: #ff6b6b;
}

.error input {
  border-color: #ff6b6b;
}

.error-message {
  color: #ff6b6b;
  font-size: 0.8rem;
  position: absolute;
  bottom: -1.2rem;
}

</style>