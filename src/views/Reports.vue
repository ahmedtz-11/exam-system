<script setup>
import { ref, computed } from "vue";

// Sample school and student data
const schools = ref([
  {
    id: 1,
    name: "Greenwood High",
    location: "Mwanza",
    male: 20,
    female: 15,
    studentsSat: 30,
    students: [{ studentId: "S001", scores: { Math: 85, Science: 78 } }],
  },
  {
    id: 2,
    name: "Lakeview Secondary",
    location: "Shinyanga",
    male: 18,
    female: 12,
    studentsSat: 25,
    students: [{ studentId: "S002", scores: { Math: 75, Science: 80 } }],
  },
  {
    id: 3,
    name: "Sunrise Academy",
    location: "Dodoma",
    male: 22,
    female: 18,
    studentsSat: 38,
    students: [{ studentId: "S003", scores: { Math: 90, Science: 85 } }],
  },
]);

const totalStudents = computed(() => {
  const male = schools.value.reduce((sum, school) => sum + school.male, 0);
  const female = schools.value.reduce((sum, school) => sum + school.female, 0);
  return { male, female, total: male + female };
});

const totalSchools = computed(() => schools.value.length);

const studentsSatExam = computed(() =>
  schools.value.reduce((sum, school) => sum + school.studentsSat, 0)
);

const passingRate = computed(() => {
  let passed = 0,
    total = 0;
  schools.value.forEach((school) => {
    school.students.forEach((student) => {
      const avg =
        Object.values(student.scores).reduce((a, b) => a + b, 0) /
        Object.values(student.scores).length;
      if (avg >= 50) passed++;
      total++;
    });
  });
  return ((passed / total) * 100).toFixed(2);
});

const getTopSchools = computed(() => {
  return schools.value
    .sort((a, b) => b.studentsSat - a.studentsSat)
    .slice(0, 5);
});
</script>

<template>
  <div class="card p-3 border-success">
    <h2>Reports</h2>

    <!-- Summary Statistics -->
    <div class="row text-center g-3 mb-3">
      <div class="col-md-3">
        <div class="card p-2  border-success text-mute">
          <div class="row">
            <div class="col-md-6">
              <i class="bi bi-mortarboard-fill fs-1"></i>
              <h5>Students Registered</h5>
            </div>
            <div class="col-md-6 my-auto">
              <h1 class="fw-bold text-success">10,300</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card p-2 border-success text-mute">
          <div class="row">
            <div class="col-md-5">
              <i class="bi bi-activity fs-1"></i>
              <h5>Gender Ratio</h5>
            </div>
            <div class="col-md-3 my-auto text-success">
              <h5>MALE</h5>
              <h5 class="fw-bold">60%</h5>
            </div>
            <div class="col-md-4 my-auto text-success">
              <h5>FEMALE</h5>
              <h5 class="fw-bold">40%</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card p-2 border-success text-mute">
          <div class="row">
            <div class="col-md-6">
              <i class="bi bi-building fs-1"></i>
              <h5>Total Schools Registered</h5>
            </div>
            <div class="col-md-6 my-auto">
              <h1 class="fw-bold text-success">250</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card p-2 border-success text-mute">
          <div class="row">
            <div class="col-md-6">
              <i class="bi bi-people-fill fs-1"></i>
              <h5>Students Sat for Exam</h5>
            </div>
            <div class="col-md-6 my-auto">
              <h1 class="fw-bold text-success">10,250</h1>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-success border-2" />
    <!-- Passing Rate -->
    <div class="mt-2 mb-2">
      <h3 class="text-success">
        <i class="bi bi-bar-chart me-2"></i> Passing Rate
      </h3>
      <div class="row text-center g-2">
        <div class="col-md-4">
          <div class="card p-2 bg-light border-success mb-3">
            <h4>Both</h4>
            <h5>95.3%</h5>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card p-2 bg-light border-success mb-3">
            <h4>Boys</h4>
            <h5>92.5%</h5>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card p-2 bg-light border-success mb-3">
            <h4>Girls</h4>
            <h5>89.5%</h5>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-success border-2" />

    <!-- Top 5 List -->
    <div class="card p-3 mt-2 border-success">
      <h3 class="text-success"><i class="bi bi-trophy me-2"></i> Top 5 List</h3>
      <div class="row mb-2 g-3">
        <div class="col-md-6">
          <div class="card p-2 bg-light">
            <h4 class="text-success">Students</h4>
            <div class="table-responsive">
              <table class="table table-striped table-bordered">
                <thead>
                  <tr class="table-success">
                    <th class="fw-bold">Student No.</th>
                    <th class="fw-bold">School</th>
                    <th class="fw-bold">Div.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="school in getTopSchools" :key="school.id">
                    <td>{{ school.name }}</td>
                    <td>{{ school.location }}</td>
                    <td>{{ school.studentsSat }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card p-2 bg-light">
            <h4 class="text-success">Schools</h4>
            <div class="table-responsive">
              <table class="table table-striped table-bordered">
                <thead>
                  <tr class="table-success">
                    <th class="fw-bold">School</th>
                    <th class="fw-bold">Region</th>
                    <th class="fw-bold">Students Sat</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="school in getTopSchools" :key="school.id">
                    <td>{{ school.name }}</td>
                    <td>{{ school.location }}</td>
                    <td>{{ school.studentsSat }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <hr class="border-success" />
      <div class="row g-3 mt-2">
        <div class="col-md-6">
          <div class="card p-2 bg-light">
            <h4 class="text-success">Subjects</h4>
            <div class="table-responsive">
              <table class="table table-striped table-bordered">
                <thead>
                  <tr class="table-success">
                    <th class="fw-bold">School</th>
                    <th class="fw-bold">Region</th>
                    <th class="fw-bold">Students Sat</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="school in getTopSchools" :key="school.id">
                    <td>{{ school.name }}</td>
                    <td>{{ school.location }}</td>
                    <td>{{ school.studentsSat }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card p-2 bg-light">
            <h4 class="text-success">Regions</h4>
            <div class="table-responsive">
              <table class="table table-striped table-bordered">
                <thead>
                  <tr class="table-success">
                    <th class="fw-bold">School</th>
                    <th class="fw-bold">Region</th>
                    <th class="fw-bold">Students Sat</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="school in getTopSchools" :key="school.id">
                    <td>{{ school.name }}</td>
                    <td>{{ school.location }}</td>
                    <td>{{ school.studentsSat }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
