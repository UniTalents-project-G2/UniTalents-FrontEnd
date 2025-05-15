import { createRouter, createWebHistory } from 'vue-router'

// Vistas
import ManagerApplicationsView from '@/modules/applications/views/manager-applications-view.component.vue'
import ManagerProjectsView from '@/modules/projects/views/manager-projects-view.component.vue'

// Layouts
import ManagerLayout from '@/shared/layouts/manager-layout.component.vue'
import RegisterPage from "@/modules/auth/pages/register-page.vue";
import LoginPage from "@/modules/auth/pages/login-page.vue";
import RecoverPasswordPage from "@/modules/auth/pages/recover-password-page.vue";




const routes = [
    {
        path: '/',
        redirect: '/manager/projects'
=======
        redirect: '/register'
    },
    {
        path: '/manager',
        component: ManagerLayout,
        children: [
            {
                path: 'projects',
                name: 'ManagerProjects',
                component: ManagerProjectsView
            },
            {
                path: 'projects/new',
                name: 'NewProject',
                component: () => import('@/modules/projects/views/project-detail-view.component.vue')
            },
            {
                path: 'projects/:id',
                name: 'ProjectDetail',
                component: () => import('@/modules/projects/views/project-detail-view.component.vue')
            },

            {
                path: 'applications',
                name: 'ManagerApplications',
                component: ManagerApplicationsView
            },
            {
                path: 'applications/:id',
                name: 'ManagerApplicationDetail',
                component: () =>
                    import('@/modules/applications/views/manager-application-detail-view.component.vue')
            },
            {
                path: 'applications/:applicationId/students/:studentId',
                name: 'ManagerStudentReputation',
                component: () => import('@/modules/users/views/student-reputation-view.component.vue')
            },

            {
                path: 'company',
                name: 'ManagerCompanyView',
                component: () => import('@/modules/users/views/manager-company-view.component.vue')
            },
            {
                path: 'company/edit',
                name: 'EditCompanyView',
                component: () => import('@/modules/users/views/edit-company-view.component.vue')
            }
        ]
    },
    { path: '/register',
        name: 'register',
        component: RegisterPage,
        meta: { title: 'Register' }


    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
        meta: { title: 'Login' }
    },
    {
        path: '/recover-password',
        name: 'recover-password',
        component: RecoverPasswordPage,
        meta: { title: 'Recover Password' }
    }


]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router