<script setup>
import { computed, ref, onMounted } from "vue";
import BarChart from "@/components/BarChart.vue";
import PieChart from "@/components/PieChart.vue";
import dataService from "@/services/dataService";
import { useSchoolsStore } from "@/stores/schools";
import { useStudentsStore } from "@/stores/students";

const schoolsStore = useSchoolsStore();
const studentsStore = useStudentsStore();

// Sample Data for Bar Chart
const barChartData = ref({
  labels: ["Math", "Science", "English", "History", "Physics", "Kiswahili"],
  datasets: [
    {
      label: "Average Score",
      data: [55, 80, 68, 90, 60, 85],
      backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545", "#ff9977", "#dcd3a2"],
    },
  ],
});

// Sample Data for Pie Chart
const pieChartData = ref({
  labels: ["Pass (%)", "Fail (%)"],
  datasets: [
    {
      data: [95, 5],
      backgroundColor: ["#28a745", "#dc3545"],
    },
  ],
});

// Chart Options
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});

// Define reactive data
const students = ref([
  { id: 1, name: "John Doe", school: "Greenwood High" },
  { id: 2, name: "Jane Smith", school: "Sunrise Academy" },
  { id: 3, name: "Alice Johnson", school: "Maplewood School" },
  { id: 4, name: "Bob Brown", school: "Greenwood High" },
  { id: 5, name: "Charlie Davis", school: "Sunrise Academy" },
]);

const schools = ref([
  { id: 1, name: "Greenwood High" },
  { id: 2, name: "Sunrise Academy" },
  { id: 3, name: "Maplewood School" },
]);

const notifications = ref([
  { id: 1, message: "Exam results will be released on 30th October." },
  { id: 2, message: "Registration for the next term is now open." },
  { id: 3, message: "Deadline for exam fee payment is 15th November." },
]);

const pendingResults = ref(12);
const upcomingExams = ref(5);
const issuesReported = ref(3);
const completedExams = ref(20);

// Computed property for recent students
const recentStudents = computed(() => students.value.slice(-5));

onMounted(() => {
  studentsStore.fetchStudents();
  schoolsStore.fetchSchools();

  dataService.getSplash();
});
</script>

<template>
  <div class="card p-3 border-success">
    <h2>Overall Statistics</h2>

    <!-- Cards Section -->
    <div class="row mt-2">
      <div class="col-md-4">
        <div class="card text-white bg-success mb-2" id="cards">
          <div class="card-body">
            <h5 class="card-title">
              <i class="bi bi-people-fill me-2"></i> Total Students
            </h5>
            <p class="card-text fs-4 fw-bold">{{ students.length }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-white bg-warning mb-2" id="cards">
          <div class="card-body">
            <h5 class="card-title">
              <i class="bi bi-building me-2"></i> Total Schools
            </h5>
            <p class="card-text fs-4 fw-bold">{{ schools.length }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-white bg-primary mb-2" id="cards">
          <div class="card-body">
            <h5 class="card-title">
              <i class="bi bi-file-earmark-text me-2"></i> Pending Results
            </h5>
            <p class="card-text fs-4 fw-bold">{{ pendingResults }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tables Section -->
    <div class="row mt-2">
      <div class="col-md-6">
        <h3 class="text-success">
          <i class="bi bi-people me-2"></i> Recent Students
        </h3>
        <table class="table table-striped">
          <thead>
            <tr class="table-success">
              <th class="fw-bold">ID</th>
              <th class="fw-bold">Name</th>
              <th class="fw-bold">School</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in recentStudents" :key="student.id">
              <td>{{ student.id }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.school }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="col-md-6">
        <h3 class="text-success">
          <i class="bi bi-bell me-2"></i> Notifications
        </h3>
        <ul class="list-group">
          <li
            v-for="notification in notifications"
            :key="notification.id"
            class="list-group-item"
          >
            <i class="bi bi-bell"></i> {{ notification.message }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="row g-3 mt-3">
      <div class="col-md-6">
        <h3 class="text-success">
          <i class="bi bi-bar-chart me-2"></i> Exam Performance
        </h3>
        <div class="card p-3" style="height: 300px">
          <BarChart :chartData="barChartData" :chartOptions="chartOptions" />
        </div>
      </div>
      <div class="col-md-6">
        <h3 class="text-success">
          <i class="bi bi-pie-chart me-2"></i> Result Distribution
        </h3>
        <div class="card p-3" style="height: 300px">
          <PieChart :chartData="pieChartData" :chartOptions="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#cards {
  transition: transform 0.2s;
}
#cards:hover {
  transform: scale(1.02);
}
</style>
