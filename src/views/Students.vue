<script setup>
import { ref, computed } from "vue";

// Sample data for schools and students
const schools = ref([
  {
    id: 1,
    name: "Greenwood High",
    location: "Mwanza",
    students: [
      {
        id: 1,
        name: "Emanuel Munisi",
        studentId: "S001",
        gender: "Male",
        dob: "2005-03-22",
        status: "Eligible",
        subjects: ["Math", "Science"],
      },
      {
        id: 2,
        name: "Jane Smith",
        studentId: "S002",
        gender: "Female",
        dob: "2006-07-15",
        status: "Eligible",
        subjects: ["English", "History"],
      },
      {
        id: 3,
        name: "Sophie Williams",
        studentId: "S003",
        gender: "Female",
        dob: "2005-05-12",
        status: "Absent",
        subjects: ["Geography", "Math"],
      },
      {
        id: 4,
        name: "David Lee",
        studentId: "S004",
        gender: "Male",
        dob: "2004-11-22",
        status: "Eligible",
        subjects: ["Science", "History"],
      },
    ],
  },
  {
    id: 2,
    name: "Lakeview Secondary",
    location: "Shinyanga",
    students: [
      {
        id: 5,
        name: "Michael Johnson",
        studentId: "S005",
        gender: "Male",
        dob: "2004-09-10",
        status: "Eligible",
        subjects: ["Math", "Science"],
      },
      {
        id: 6,
        name: "Alicia Turner",
        studentId: "S006",
        gender: "Female",
        dob: "2006-02-05",
        status: "Eligible",
        subjects: ["English", "Geography"],
      },
      {
        id: 7,
        name: "Lucas King",
        studentId: "S007",
        gender: "Male",
        dob: "2005-07-18",
        status: "Disqualified",
        subjects: ["History", "Science"],
      },
    ],
  },
  {
    id: 3,
    name: "Starlight Academy",
    location: "Mwanza",
    students: [
      {
        id: 8,
        name: "Emily Davis",
        studentId: "S008",
        gender: "Female",
        dob: "2005-12-25",
        status: "Eligible",
        subjects: ["Math", "History"],
      },
      {
        id: 9,
        name: "Olivia Brown",
        studentId: "S009",
        gender: "Female",
        dob: "2004-06-05",
        status: "Pending",
        subjects: ["Geography", "English"],
      },
    ],
  },
  {
    id: 4,
    name: "Unity High School",
    location: "Kagera",
    students: [
      {
        id: 10,
        name: "James Wilson",
        studentId: "S010",
        gender: "Male",
        dob: "2006-01-30",
        status: "Eligible",
        subjects: ["Science", "English"],
      },
      {
        id: 11,
        name: "Mia Thompson",
        studentId: "S011",
        gender: "Female",
        dob: "2005-10-13",
        status: "Eligible",
        subjects: ["Math", "History"],
      },
    ],
  },
]);

const subjects = ref(["Math", "Science", "English", "History", "Geography"]);
const searchQuery = ref("");
const filterLocation = ref("");
const currentPage = ref(1);
const itemsPerPage = 8;

// Modal state for adding/editing student
const isModalOpen = ref(false);
const isEditing = ref(false);
const selectedStudent = ref({
  id: null,
  name: "",
  studentId: "",
  gender: "",
  dob: "",
  status: "",
  school: null,
  subjects: [],
});

// Computed properties
const filteredSchools = computed(() => {
  return schools.value.filter(
    (school) =>
      school.name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      (filterLocation.value ? school.location === filterLocation.value : true)
  );
});

const filteredStudents = computed(() => {
  return schools.value.flatMap((school) =>
    school.students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
        (filterLocation.value ? school.location === filterLocation.value : true)
    )
  );
});

// Paginate filtered students
const paginatedStudents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredStudents.value.slice(start, start + itemsPerPage);
});

// Total pages for pagination
const totalPages = computed(() =>
  Math.ceil(filteredStudents.value.length / itemsPerPage)
);

// Handle page change
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Open modal for add/edit student
const openModal = (student = null, schoolId = null) => {
  if (student) {
    isEditing.value = true;
    selectedStudent.value = { ...student, school: schoolId };
  } else {
    isEditing.value = false;
    selectedStudent.value = {
      id: null,
      name: "",
      studentId: "",
      gender: "",
      dob: "",
      status: "",
      school: schoolId,
    };
  }
  isModalOpen.value = true;
};

// Save student (add/edit)
const saveStudent = () => {
  const school = schools.value.find(
    (s) => s.id === selectedStudent.value.school
  );
  if (isEditing.value) {
    const index = school.students.findIndex(
      (s) => s.id === selectedStudent.value.id
    );
    if (index !== -1) school.students[index] = { ...selectedStudent.value };
  } else {
    selectedStudent.value.id = school.students.length + 1;
    school.students.push({ ...selectedStudent.value });
  }
  isModalOpen.value = false;
};

// Delete student
const deleteStudent = (schoolId, studentId) => {
  const school = schools.value.find((s) => s.id === schoolId);
  school.students = school.students.filter(
    (student) => student.id !== studentId
  );
};
</script>

<template>
  <div class="card p-3 border-success">
    <h2>Students Registration</h2>

    <!-- Search and Filter Controls -->
    <div class="row g-2 mb-3">
      <div class="col-md-5">
        <div class="input-group">
          <span class="input-group-text bg-success text-white">
            <i class="bi bi-search"></i>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            class="form-control border-success"
            placeholder="Search by school name..."
          />
        </div>
      </div>
      <div class="col-md-4">
        <select v-model="filterLocation" class="form-control border-success">
          <option value="">All Locations</option>
          <option
            v-for="location in ['Mwanza', 'Shinyanga', 'Kagera']"
            :key="location"
            :value="location"
          >
            {{ location }}
          </option>
        </select>
      </div>
    </div>

    <!-- Schools Accordion -->
    <div class="accordion" id="accordionSchools">
      <div
        v-for="school in filteredSchools"
        :key="school.id"
        class="accordion-item"
      >
        <h2 class="accordion-header" :id="'heading-' + school.id">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="'#collapse-' + school.id"
            aria-expanded="true"
            :aria-controls="'collapse-' + school.id"
          >
            {{ school.name }} ({{ school.location }})
          </button>
        </h2>
        <div
          :id="'collapse-' + school.id"
          class="accordion-collapse collapse"
          :aria-labelledby="'heading-' + school.id"
          data-bs-parent="#accordionSchools"
        >
          <div class="accordion-body">
            <!-- Add Student Button -->
            <div class="text-end mb-2">
              <button
                class="btn btn-success"
                @click="openModal(null, school.id)"
              >
                Add Student
              </button>
            </div>

            <!-- Student Table for each school -->
            <div class="table-responsive">
              <table class="table table-striped">
                <thead class="table-success">
                  <tr>
                    <th class="fw-bold">Student ID</th>
                    <th class="fw-bold">Name</th>
                    <th class="fw-bold">Gender</th>
                    <th class="fw-bold">DOB</th>
                    <th class="fw-bold">Subjects</th>
                    <th class="fw-bold">Status</th>
                    <th class="fw-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="student in school.students" :key="student.id">
                    <td>{{ student.studentId }}</td>
                    <td>{{ student.name }}</td>
                    <td>{{ student.gender }}</td>
                    <td>{{ student.dob }}</td>
                    <td>{{ student.subjects.join(", ") }}</td>
                    <td>{{ student.status }}</td>
                    <td>
                      <div class="btn-group">
                        <button
                          class="btn btn-outline-primary btn-sm"
                          @click="openModal(student, school.id)"
                        >
                          <i class="bi bi-pen"></i>
                        </button>
                        <button
                          class="btn btn-outline-danger btn-sm"
                          @click="deleteStudent(school.id, student.id)"
                        >
                          <i class="bi bi-trash3"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <nav>
      <ul class="pagination mt-3">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button
            class="btn btn-success btn-md"
            @click="goToPage(currentPage - 1)"
          >
            <i class="bi bi-skip-backward-fill"></i>
          </button>
        </li>
        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: page === currentPage }"
        >
          <button
            class="btn btn-outline-success btn-md"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button
            class="btn btn-success btn-md"
            @click="goToPage(currentPage + 1)"
          >
            <i class="bi bi-skip-forward-fill"></i>
          </button>
        </li>
      </ul>
    </nav>

    <!-- Modal for Adding/Editing Student -->
    <div v-if="isModalOpen" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">
              {{ isEditing ? "Edit Student" : "Add Student" }}
            </h3>
            <button
              type="button"
              class="btn-close"
              @click="isModalOpen = false"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-2">
              <label for="name" class="form-label">Name</label>
              <input
                id="name"
                v-model="selectedStudent.name"
                type="text"
                class="form-control"
                placeholder="Enter student name"
              />
            </div>
            <div class="mb-2">
              <label for="studentId" class="form-label">Student ID</label>
              <input
                id="studentId"
                v-model="selectedStudent.studentId"
                type="text"
                class="form-control"
                placeholder="Enter student ID"
              />
            </div>
            <div class="mb-2">
              <label for="gender" class="form-label">Gender</label>
              <select
                id="gender"
                v-model="selectedStudent.gender"
                class="form-control"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div class="mb-2">
              <label for="dob" class="form-label">Date of Birth</label>
              <input
                id="dob"
                v-model="selectedStudent.dob"
                type="date"
                class="form-control"
              />
            </div>
            <!-- Subjects Enrolled -->
            <div class="mb-2">
              <label class="form-label">Subjects Enrolled</label>
              <div>
                <div
                  class="form-check"
                  v-for="subject in subjects"
                  :key="subject"
                >
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="'subject-' + subject"
                    v-model="selectedStudent.subjects"
                    :value="subject"
                  />
                  <label class="form-check-label" :for="'subject-' + subject">
                    {{ subject }}
                  </label>
                </div>
              </div>
            </div>

            <!-- Examination Status -->
            <div class="mb-2">
              <label for="status" class="form-label">Examination Status</label>
              <select
                id="status"
                v-model="selectedStudent.status"
                class="form-control"
              >
                <option value="Eligible">Eligible</option>
                <option value="Pending">Pending</option>
                <option value="Disqualified">Disqualified</option>
                <option value="Absent">Absent</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              @click="isModalOpen = false"
            >
              Cancel
            </button>
            <button type="button" class="btn btn-primary" @click="saveStudent">
              Save
            </button>
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

<!-- Pagination Controls -->
<!-- <nav aria-label="Student Pagination">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="goToPage(currentPage - 1)">
            Previous
          </button>
        </li>
        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: currentPage === page }"
        >
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="goToPage(currentPage + 1)">
            Next
          </button>
        </li>
      </ul>
    </nav> -->
