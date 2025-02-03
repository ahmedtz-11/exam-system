<script setup>
import { ref, computed } from "vue";

// Define subjects
const subjects = ref([
  "Math",
  "Science",
  "English",
  "History",
  "Geography",
  "Physics",
  "Chemistry",
  "Biology",
]);

// Sample data with students randomly registered to 5 or 6 subjects
const schools = ref([
  {
    id: 1,
    name: "Greenwood High",
    location: "Mwanza",
    students: [
      {
        id: 1,
        studentId: "S001",
        scores: {
          Math: 85,
          Science: 78,
          English: 90,
          History: 88,
          Geography: 76,
          Biology: 65,
        },
      },
      {
        id: 2,
        studentId: "S002",
        scores: {
          Math: 75,
          Science: 80,
          English: 85,
          Physics: 79,
          Geography: 82,
        },
      },
    ],
  },
  {
    id: 2,
    name: "Lakeview Secondary",
    location: "Shinyanga",
    students: [
      {
        id: 3,
        studentId: "S003",
        scores: {
          Math: 70,
          Science: 65,
          English: 80,
          History: 72,
          Geography: 68,
        },
      },
      {
        id: 4,
        studentId: "S004",
        scores: {
          Math: 82,
          Science: 88,
          English: 75,
          History: 78,
          Geography: 79,
        },
      },
    ],
  },
  {
    id: 3,
    name: "Sunrise Academy",
    location: "Dodoma",
    students: [
      {
        id: 5,
        studentId: "S005",
        scores: {
          Math: 90,
          Science: 85,
          English: 88,
          History: 92,
          Geography: 87,
        },
      },
      {
        id: 6,
        studentId: "S006",
        scores: {
          Math: 78,
          Science: 82,
          English: 80,
          Physics: 75,
          Geography: 79,
          Chemistry: 70,
        },
      },
    ],
  },
  {
    id: 4,
    name: "Mountaintop High",
    location: "Arusha",
    students: [
      {
        id: 7,
        studentId: "S007",
        scores: {
          Math: 65,
          Science: 70,
          English: 68,
          Physics: 72,
          Geography: 74,
        },
      },
      {
        id: 8,
        studentId: "S008",
        scores: {
          Math: 88,
          Science: 90,
          English: 85,
          History: 89,
          Biology: 91,
        },
      },
    ],
  },
  {
    id: 5,
    name: "Riverside School",
    location: "Mwanza",
    students: [
      {
        id: 9,
        studentId: "S009",
        scores: {
          Math: 77,
          Science: 80,
          English: 82,
          History: 79,
          Geography: 81,
          Biology: 71,
        },
      },
      {
        id: 10,
        studentId: "S010",
        scores: {
          Math: 85,
          Science: 88,
          English: 90,
          History: 87,
          Geography: 89,
        },
      },
    ],
  },
  {
    id: 6,
    name: "Hilltop Academy",
    location: "Dodoma",
    students: [
      {
        id: 11,
        studentId: "S011",
        scores: {
          Math: 72,
          Science: 75,
          English: 78,
          History: 74,
          Geography: 76,
        },
      },
      {
        id: 12,
        studentId: "S012",
        scores: {
          Math: 80,
          Science: 82,
          English: 85,
          History: 81,
          Geography: 83,
          Physics: 72,
        },
      },
    ],
  },
  {
    id: 7,
    name: "Valley View School",
    location: "Arusha",
    students: [
      {
        id: 13,
        studentId: "S013",
        scores: {
          Math: 68,
          Science: 72,
          English: 70,
          History: 74,
          Geography: 71,
        },
      },
      {
        id: 14,
        studentId: "S014",
        scores: {
          Math: 90,
          Science: 92,
          English: 88,
          History: 91,
          Geography: 89,
        },
      },
    ],
  },
  {
    id: 8,
    name: "Oceanview High",
    location: "Shinyanga",
    students: [
      {
        id: 15,
        studentId: "S015",
        scores: {
          Math: 75,
          Science: 78,
          English: 80,
          History: 77,
          Geography: 79,
          Physics: 72,
        },
      },
      {
        id: 16,
        studentId: "S016",
        scores: {
          Math: 82,
          Science: 85,
          English: 88,
          History: 84,
          Geography: 86,
        },
      },
    ],
  },
]);

const isModalOpen = ref(false);
const selectedStudent = ref(null);

// Search and Filter
const searchQuery = ref("");
const locationFilter = ref("");
const currentPage = ref(1);
const itemsPerPage = 4;

// Filtered and paginated schools
const filteredSchools = computed(() => {
  return schools.value.filter((school) => {
    const matchesSearch = school.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchesLocation = locationFilter.value
      ? school.location === locationFilter.value
      : true;
    return matchesSearch && matchesLocation;
  });
});

// Paginated schools
const paginatedSchools = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredSchools.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredSchools.value.length / itemsPerPage)
);

const openModal = (student) => {
  selectedStudent.value = { ...student, scores: { ...student.scores } };
  isModalOpen.value = true;
};

const saveScores = () => {
  const school = schools.value.find((s) =>
    s.students.some((st) => st.id === selectedStudent.value.id)
  );
  const student = school.students.find(
    (st) => st.id === selectedStudent.value.id
  );
  student.scores = { ...selectedStudent.value.scores };
  isModalOpen.value = false;
};
</script>

<template>
  <div class="card p-3 border-success">
    <h2>Examination Scores</h2>

    <!-- Search and Filter -->
    <div class="row g-2 mb-3">
      <div class="col-12 col-sm-6 col-md-5">
        <div class="input-group">
          <span class="input-group-text bg-success text-white"
            ><i class="bi bi-search"></i
          ></span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by school name"
            class="form-control border-success"
          />
        </div>
      </div>
      <div class="col-12 col-sm-6 col-md-4">
        <select v-model="locationFilter" class="form-select border-success">
          <option value="">All Locations</option>
          <option
            v-for="location in [...new Set(schools.map((s) => s.location))]"
            :key="location"
            :value="location"
          >
            {{ location }}
          </option>
        </select>
      </div>
    </div>

    <!-- Schools List -->
    <div class="accordion" id="accordionSchools">
      <div
        v-for="school in paginatedSchools"
        :key="school.id"
        class="accordion-item"
      >
        <h2 class="accordion-header" :id="'heading-' + school.id">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="'#collapse-' + school.id"
          >
            {{ school.name }} ({{ school.location }})
          </button>
        </h2>
        <div :id="'collapse-' + school.id" class="accordion-collapse collapse">
          <div class="accordion-body">
            <div class="table-responsive">
              <table class="table table-striped">
                <thead class="table-success">
                  <tr>
                    <th class="fw-bold">Student ID</th>
                    <th
                      v-for="subject in subjects"
                      :key="subject"
                      class="fw-bold"
                    >
                      {{ subject }}
                    </th>
                    <th class="fw-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="student in school.students" :key="student.id">
                    <td>{{ student.studentId }}</td>
                    <td v-for="subject in subjects" :key="subject">
                      {{
                        student.scores[subject] !== undefined
                          ? student.scores[subject]
                          : "-"
                      }}
                    </td>
                    <td>
                      <button
                        class="btn btn-outline-primary btn-sm"
                        @click="openModal(student)"
                      >
                        <i class="bi bi-pen"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <nav v-if="totalPages > 1">
      <ul class="pagination mt-3">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="btn btn-success btn-md" @click="currentPage--">
            <i class="bi bi-skip-backward-fill"></i>
          </button>
        </li>
        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page }"
        >
          <button
            class="btn btn-outline-success btn-md"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="btn btn-success btn-md" @click="currentPage++">
            <i class="bi bi-skip-forward-fill"></i>
          </button>
        </li>
      </ul>
    </nav>

    <!-- Modal for Editing Scores -->
    <div v-if="isModalOpen" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Edit Scores</h3>
            <button
              type="button"
              class="btn-close"
              @click="isModalOpen = false"
            ></button>
          </div>
          <div class="modal-body">
            <div
              v-for="subject in Object.keys(selectedStudent.scores)"
              :key="subject"
              class="mb-2"
            >
              <label class="form-label">{{ subject }}</label>
              <input
                type="number"
                v-model="selectedStudent.scores[subject]"
                class="form-control"
                min="0"
                max="100"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger" @click="isModalOpen = false">
              Cancel
            </button>
            <button class="btn btn-success" @click="saveScores">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal.fade.show {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
