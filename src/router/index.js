import Layout from "@/components/Layout.vue";
import Home from "@/views/Home.vue";
import LoginForm from "@/views/LoginForm.vue";
import Schools from "@/views/Schools.vue";
import Students from "@/views/Students.vue";
import { createWebHistory, createRouter } from "vue-router";


const routes = [
    {
        path: '/',
        component: LoginForm
    },
    {
        path: '/layout',
        component: Layout,
        children: [
            {
                path: '',
                component: Home
            },
            {
                path: '/school',
                component: Schools
            },
            {
                path: '/students',
                component: Students
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

export default router