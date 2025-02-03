<script>
export default {
  data() {
    return {
      // Raw data for students
      students: [
        { id: 1, name: "John Doe", school: "Greenwood High" },
        { id: 2, name: "Jane Smith", school: "Sunrise Academy" },
        { id: 3, name: "Alice Johnson", school: "Maplewood School" },
        { id: 4, name: "Bob Brown", school: "Greenwood High" },
        { id: 5, name: "Charlie Davis", school: "Sunrise Academy" },
      ],
      // Raw data for schools
      schools: [
        { id: 1, name: "Greenwood High" },
        { id: 2, name: "Sunrise Academy" },
        { id: 3, name: "Maplewood School" },
      ],
      // Raw data for notifications
      notifications: [
        { id: 1, message: "Exam results will be released on 30th October." },
        { id: 2, message: "Registration for the next term is now open." },
        { id: 3, message: "Deadline for exam fee payment is 15th November." },
      ],
      // Additional data
      pendingResults: 12,
      upcomingExams: 5,
      issuesReported: 3,
      completedExams: 20,
    };
  },
  computed: {
    // Get the 5 most recent students
    recentStudents() {
      return this.students.slice(-5);
    },
  },
};
</script>

<template>
  <div class="card p-3 border-success">
    <h2>Dashboard</h2>

    <!-- Cards Section -->
    <div class="row mt-2">
      <div class="col-md-4">
        <div class="card text-white bg-primary mb-3" id="cards">
          <div class="card-body">
            <h5 class="card-title">
              <i class="bi bi-people-fill me-2"></i> Total Students
            </h5>
            <p class="card-text fs-4 fw-bold">{{ students.length }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-white bg-success mb-3" id="cards">
          <div class="card-body">
            <h5 class="card-title">
              <i class="bi bi-building me-2"></i> Total Schools
            </h5>
            <p class="card-text fs-4 fw-bold">{{ schools.length }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-white bg-warning mb-3" id="cards">
          <div class="card-body">
            <h5 class="card-title">
              <i class="bi bi-file-earmark-text me-2"></i> Pending Results
            </h5>
            <p class="card-text fs-4 fw-bold">{{ pendingResults }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Additional Cards Section -->
    <div class="row mt-2">
      <div class="col-md-4">
        <div class="card text-white bg-info mb-3" id="cards">
          <div class="card-body">
            <h5 class="card-title">
              <i class="bi bi-calendar-check me-2"></i> Upcoming Exams
            </h5>
            <p class="card-text fs-4 fw-bold">{{ upcomingExams }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-white bg-danger mb-3" id="cards">
          <div class="card-body">
            <h5 class="card-title">
              <i class="bi bi-exclamation-triangle me-2"></i> Issues Reported
            </h5>
            <p class="card-text fs-4 fw-bold">{{ issuesReported }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-white bg-secondary mb-3" id="cards">
          <div class="card-body">
            <h5 class="card-title">
              <i class="bi bi-check-circle me-2"></i> Completed Exams
            </h5>
            <p class="card-text fs-4 fw-bold">{{ completedExams }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tables Section -->
    <div class="row mt-3">
      <div class="col-md-6">
        <h3 class="text-success"><i class="bi bi-people me-2"></i> Recent Students</h3>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>School</th>
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
        <h3 class="text-success"><i class="bi bi-bell me-2"></i> Notifications</h3>
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
    <div class="row mt-4">
      <div class="col-md-6">
        <h3 class="text-success"><i class="bi bi-bar-chart me-2"></i> Exam Performance</h3>
        <div class="card p-3">
          <p class="text-muted">
            Placeholder for a bar chart showing exam performance by subject.
          </p>
        </div>
      </div>
      <div class="col-md-6">
        <h3 class="text-success"><i class="bi bi-pie-chart me-2"></i> Result Distribution</h3>
        <div class="card p-3">
          <p class="text-muted">
            Placeholder for a pie chart showing result distribution (Pass/Fail).
          </p>
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
