<script>
export default {
  name: 'edit-tags-modal',
  props: {
    modelValue: Array
  },
  data() {
    return {
      tags: [...this.modelValue],
      newTag: ''
    }
  },
  methods: {
    addTag() {
      const tag = this.newTag.trim()
      if (tag && !this.tags.includes(tag)) {
        this.tags.push(tag)
        this.newTag = ''
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1)
    },
    saveChanges() {
      this.$emit('update:modelValue', this.tags)
      this.$emit('close')
    }
  }
}
</script>

<template>
  <div class="overlay" @click.self="$emit('close')">
    <div class="modal">
      <h3>Editar Tecnologías</h3>

      <div class="tag-list">
        <span
            v-for="(tag, index) in tags"
            :key="tag"
            class="tag"
        >
          {{ tag }}
          <button class="remove" @click="removeTag(index)">×</button>
        </span>
      </div>

      <div class="add-tag">
        <input
            v-model="newTag"
            type="text"
            placeholder="Nueva tecnología"
            @keyup.enter="addTag"
        />
        <button @click="addTag">Agregar</button>
      </div>

      <div class="actions">
        <button class="cancel" @click="$emit('close')">Cancelar</button>
        <button class="save" @click="saveChanges">Guardar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  width: 400px;
  font-family: 'Nunito', sans-serif;
}

h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background: #c9d8f0;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  font-size: 0.85rem;
}

.remove {
  margin-left: 0.4rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  color: #1c1f2b;
}

.add-tag {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
}

.add-tag input {
  flex: 1;
  padding: 0.4rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.add-tag button {
  padding: 0.4rem 0.8rem;
  background: #FFD479;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.cancel {
  background: #1c1f2b;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.save {
  background: #FFD479;
  color: #1c1f2b;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
</style>
