<template>
  <div class="register-page">
    <Toast />

    <div class ="register-container">

      <div class ="register-side">
        <RegisterForm @success="onRegisterSuccess" @error="onRegisterError" />
      </div>
      <div class="auth-text-side">
        <auth-text></auth-text>
      </div >
    </div>
  </div>
</template>

<script>
import { useToast } from 'primevue/usetoast';
import RegisterForm from "@/modules/auth/components/register-form.vue";
import Toast from 'primevue/toast';
import AuthText from "@/modules/auth/components/auth-text.vue";
export default {
  components: {
    AuthText,
    RegisterForm,
    Toast
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    onRegisterSuccess() {
      this.toast.add({
        severity: 'success',
        summary: 'Registration Successful',
        detail: 'Redirecting to login...',
        life: 2500,
        styleClass: 'custom-toast',
        contentStyleClass: 'custom-toast-content',

        style: {
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },

      });
    },
    onRegisterError(error) {
      this.toast.add({
        severity: 'error',
        summary: 'Registration Failed',
        detail: error.message || 'An error occurred',
        life: 3000
      });
    }
  }
};
</script>

<style>

.register-container{


  display: flex;
  width: 60vw;
  height: 75vh;
  border: 2px solid #1C1F2B;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  align-self: center;
}


.register-page{
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  justify-self: center;

}

.register-side,
.auth-text-side {
  width: 50%;
  height: 100%;
}

.register-side{
  background-color: #F5F0E6;

}

.auth-text-side{
  background-color: #1C1F2B;
}


.register-page {
  min-height: 100vh;
  width: 70vw;
}



</style>