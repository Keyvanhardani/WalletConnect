import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '@/Pages/Welcome.vue'
import Dashboard from '@/Pages/Dashboard.vue'
import Web3Login from '@/Pages/Auth/Web3Login.vue'

const routes = [
    {
        path: '/',
        component: Welcome,
        name: 'welcome',
    },
    {
        path: '/dashboard',
        component: Dashboard,
        name: 'dashboard',
    },
    {
        path: '/login',
        component: () => import('@/Pages/Auth/Login.vue'),
        name: 'login',
    },
    {
        path: '/web3-login',
        component: Web3Login,
        name: 'web3-login',
    },
    {
        path: '/register',
        component: () => import('@/Pages/Auth/Register.vue'),
        name: 'register',
    },
    {
        path: '/forgot-password',
        component: () => import('@/Pages/Auth/ForgotPassword.vue'),
        name: 'forgot-password',
    },
    {
        path: '/reset-password/:token',
        component: () => import('@/Pages/Auth/ResetPassword.vue'),
        name: 'reset-password',
    },
    {
        path: '/verify-email',
        component: () => import('@/Pages/Auth/VerifyEmail.vue'),
        name: 'verify-email',
    },
    {
        path: '/profile',
        component: () => import('@/Pages/Profile/Edit.vue'),
        name: 'profile.edit',
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
