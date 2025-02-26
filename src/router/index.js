import Layout from "@/components/Layout.vue";
import Examination from "@/views/Examination.vue";
import Home from "@/views/Home.vue";
import LoginForm from "@/views/LoginForm.vue";
import Reports from "@/views/Reports.vue";
import Results from "@/views/Results.vue";
import Schools from "@/views/Schools.vue";
import Students from "@/views/Students.vue";
import { createWebHistory, createRouter } from "vue-router";


const routes = [
    {
        path: '/',
        component: LoginForm
    },
    {
        path: '/home',
        component: Layout,
        children: [
            {
                path: '',
                component: Home,
                meta: { title: 'Dashboard' } 
            },
            {
                path: '/school',
                component: Schools,
                meta: { title: 'Schools' } 
            },
            {
                path: '/students',
                component: Students,
                meta: { title: 'Students' } 
            },
            {
                path: '/exams',
                component: Examination,
                meta: { title: 'Exams' } 
            },
            {
                path: '/results',
                component: Results,
                meta: { title: 'Results' } 
            },
            {
                path: '/reports',
                component: Reports,
                meta: { title: 'Reports' } 
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  

export default router