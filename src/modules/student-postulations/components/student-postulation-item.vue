<template>
  <div class="postulation-card" @click="viewProjectDetails">
    <div class="card-content">
      <div class="text-content">
        <h3 class="project-title">{{ project.title }}</h3>
        <p class="manager-name">{{ project.manager }}</p>
      </div>
      <span :class="['status-chip', statusClass]">
        {{ formattedStatus }}
      </span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import {Project} from "@/modules/projects/models/project.entity.js";
import {StudentPostulation} from "@/modules/student-postulations/model/student-postulation.entity.js";

export default {
  props: {
    postulation: {
      type: StudentPostulation,
      required: true,
      validator: (p) => p.id && p.projectId && p.postulationStatus
    },
    project: {
      type: Project,
      required: true,
      validator: (p) => p.title && p.manager
    }
  },
  setup(props) {
    const router = useRouter();

    const statusMap = {
      'en_curso': { text: 'En Curso', class: 'in-progress' },
      'finalizado': { text: 'Finalizado', class: 'completed' },
      'rechazado': { text: 'Rechazado', class: 'rejected' }
    };

    const formattedStatus = computed(() =>
        statusMap[props.postulation.postulationStatus]?.text || props.postulation.postulationStatus
    );

    const statusClass = computed(() =>
        statusMap[props.postulation.postulationStatus]?.class || 'default'
    );

    const viewProjectDetails = () => {
      if (props.postulation.postulationStatus === 'finalizado') {
        router.push(`/postulations/finished/${props.postulation.projectId}`);
      } else {
        router.push(`/postulations/student/${props.project.id}`);
      }


    };

    return {
      formattedStatus,
      statusClass,
      viewProjectDetails
    };
  }
};
</script>

<style scoped>
.postulation-card {
  background: white;
  border-radius: 8px;
  padding: 3rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1rem;
}

.postulation-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.text-content {
  flex: 1;
  min-width: 0;
}

.project-title {
  margin: 0;
  color: #1C1F2B;
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.manager-name {
  margin: 0.25rem 0 0;
  color: #6B7280;
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-chip {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  flex-shrink: 0;
}

.status-chip.in-progress {
  background: #FFEB3B;
  color: #000;
}

.status-chip.completed {
  background: #4CAF50;
  color: white;
}

.status-chip.rejected {
  background: #F44336;
  color: white;
}

.status-chip.default {
  background: #E5E7EB;
  color: #4B5563;
}
</style>