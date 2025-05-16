import { createRouter, createWebHistory } from 'vue-router'

// Vistas
import ManagerApplicationsView from '@/modules/applications/views/manager-applications-view.component.vue'
import ManagerProjectsView from '@/modules/projects/views/manager-projects-view.component.vue'



import RegisterPage from "@/modules/auth/pages/register-page.vue";
import LoginPage from "@/modules/auth/pages/login-page.vue";
import RecoverPasswordPage from "@/modules/auth/pages/recover-password-page.vue";


// Layouts
import ManagerLayout from '@/shared/layouts/manager-layout.component.vue'
import StudentLayout from '@/shared/layouts/student-layout.component.vue'


const routes = [

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


    {
        path: '/student',
        component: StudentLayout,
        children: [
            {
                path: 'opportunities',
                name: 'StudentOpportunities',
                component: () => import('@/modules/opportunities/views/opportunity-list.page.vue')
            },
            {
                path: 'opportunities/:id',
                name: 'StudentOpportunityDetail',
                component: () => import('@/modules/opportunities/views/opportunity-detail.page.vue'),
                props: true
            },
            {
                path: 'companies/:id',
                name: 'StudentCompanyDetail',
                component: () => import('@/modules/companies/views/company-detail.page.vue')
            },
            {
                path: 'portfolio',
                name: 'StudentPortfolio',
                component: () => import('@/modules/portfolio/pages/portfolio-page.vue')
            },
            {
                path: '/portfolio/:id',
                name: 'StudentProjectDetail',
                component: () => import('@/modules/portfolio/pages/project-detail.vue'),
                props: true
            },
            {
                path: 'postulations',
                name: 'StudentPostulations',
                component: () => import('@/modules/student-postulations/pages/student-postulations-page.vue')
            },
            {
                path: '/postulations/finished/:id',
                name: 'FinishedProjectDetail',
                component: () => import('@/modules/student-postulations/pages/finished-project-detail.vue'),
            },
            {
                path: '/postulations/student/:id',
                name: 'StudentPostulationDetail',
                component: () => import('@/modules/student-postulations/pages/student-postulation-detail.vue'),
            }


        ]
    },










    { path: '/',
        redirect: '/login'
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