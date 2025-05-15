<script>
import { getCompanyById, updateCompany } from '@/modules/users/services/company.service'
import EditTagsModal from '@/shared/components/edit-tags-modal.component.vue'


export default {
  name: 'EditCompanyView',
  components: {EditTagsModal},
  data() {
    return {
      form: {
        id: null,
        name: '',
        creator: '',
        location: '',
        focus: '',
        email: '',
        phone: '',
        logoUrl: '',
        technologies: []
      },
      showTagModal: false
    }
  },
  async created() {
    const company = await getCompanyById(1)
    this.form = { ...company }
  },
  methods: {
    async saveChanges() {
      try {
        await updateCompany(this.form.id, this.form)
        alert('Cambios guardados correctamente')
        this.$router.push('/manager/company')
      } catch (err) {
        alert('Error al guardar los cambios')
        console.error(err)
      }
    },
    cancelEdit() {
      this.$router.push('/manager/company')
    },
    handleImageChange(event) {
      const file = event.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        this.form.logoUrl = e.target.result
      }
      reader.readAsDataURL(file)
    }

  }
}
</script>

<template>
  <div class="edit-company">
    <h1>Mi Empresa</h1>
    <div class="edit-form">
      <div class="image-column">
        <img :src="form.logoUrl" class="logo" />
        <input type="file" accept="image/*" @change="handleImageChange" />
      </div>

      <div class="fields">
        <label>Nombre</label>
        <input v-model="form.name" type="text" />

        <label>Creador</label>
        <input v-model="form.creator" type="text" />

        <label>Ciudad/País</label>
        <input v-model="form.location" type="text" />

        <label>Enfoque</label>
        <input v-model="form.focus" type="text" />

        <label>Correo electrónico</label>
        <input v-model="form.email" type="email" />

        <label>Celular</label>
        <input v-model="form.phone" type="text" />
      </div>
    </div>

    <p class="subtitle">Tecnologías y Especializaciones dentro de la empresa
      <button class="change-btn" @click="showTagModal = true">Cambiar</button>
    </p>

    <div class="tags">
      <span class="tag" v-for="tech in form.technologies" :key="tech">
        {{ tech }}
      </span>
    </div>

    <div class="actions">
      <button class="cancel" @click="cancelEdit">Cancelar</button>
      <button class="save" @click="saveChanges">Guardar Cambios</button>
    </div>
  </div><EditTagsModal
    v-if="showTagModal"
    v-model="form.technologies"
    @close="showTagModal = false"/>


</template>

<style scoped>
.edit-company {
  background: #f4f1ea;
  padding: 2rem;
  font-family: 'Nunito', sans-serif;
}

.edit-form {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.image-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 350px;
  height: 350px;
  object-fit: contain;
  border-radius: 100%;
  background: #eee;
  margin-bottom: 0.5rem;
}

.fields {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.fields label {
  font-weight: bold;
  margin-top: 0.5rem;
}

.fields input {
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
}

.subtitle {
  font-weight: 600;
  margin: 1rem 0 0.5rem;
}

input[type="file"] {
  margin-top: 0.5rem;
  font-size: 0.9rem;
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

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

button {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.cancel {
  background: #1c1f2b;
  color: white;
}

.save {
  background: #FFD479;
  color: #1c1f2b;
}

.change-btn {
  margin-left: 1rem;
  background: #FFD479;
  font-size: 0.75rem;
  padding: 0.4rem 0.6rem;
}
</style>
