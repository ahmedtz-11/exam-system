<script setup>
import { ref, computed } from "vue";

// Sample data for schools and students
const schools = ref([
  {
    id: 1,
    name: "Greenwood High",
    location: "City A",
    students: [
      {
        id: 1,
        name: "John Doe",
        studentId: "S001",
        gender: "Male",
        dob: "2005-03-22",
        address: "123 Main St",
        phone: "0712345678",
      },
      {
        id: 2,
        name: "Jane Smith",
        studentId: "S002",
        gender: "Female",
        dob: "2006-07-15",
        address: "456 Elm St",
        phone: "0723456789",
      },
    ],
  },
  {
    id: 2,
    name: "Lakeview Secondary",
    location: "City B",
    students: [
      {
        id: 3,
        name: "Michael Johnson",
        studentId: "S003",
        gender: "Male",
        dob: "2004-09-10",
        address: "789 Oak St",
        phone: "0734567890",
      },
    ],
  },
  {
    id: 3,
    name: "Starlight Academy",
    location: "City A",
    students: [
      {
        id: 4,
        name: "Emily Davis",
        studentId: "S004",
        gender: "Female",
        dob: "2005-12-25",
        address: "101 Pine St",
        phone: "0745678901",
      },
    ],
  },
  {
    id: 4,
    name: "Unity High School",
    location: "City C",
    students: [
      {
        id: 5,
        name: "James Wilson",
        studentId: "S005",
        gender: "Male",
        dob: "2006-01-30",
        address: "202 Maple St",
        phone: "0756789012",
      },
    ],
  },
]);

// Search, filter and pagination states
const searchQuery = ref("");
const filterLocation = ref("");
const currentPage = ref(1);
const itemsPerPage = 5;

// Modal state for adding/editing student
const isModalOpen = ref(false);
const isEditing = ref(false);
const selectedStudent = ref({
  id: null,
  name: "",
  studentId: "",
  gender: "",
  dob: "",
  address: "",
  phone: "",
  school: null,
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
      address: "",
      phone: "",
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
  <div class="card p-3">
    <h2>Students</h2>

    <!-- Search and Filter Controls -->
    <div class="row mb-3">
      <div class="col-md-5">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Search by school name..."
        />
      </div>
      <div class="col-md-4">
        <select v-model="filterLocation" class="form-control">
          <option value="">All Locations</option>
          <option
            v-for="location in ['City A', 'City B', 'City C']"
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
            <table class="table table-striped">
              <thead class="table-dark">
                <tr>
                  <th class="fw-bold">Name</th>
                  <th class="fw-bold">Student ID</th>
                  <th class="fw-bold">Gender</th>
                  <th class="fw-bold">DOB</th>
                  <th class="fw-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in school.students" :key="student.id">
                  <td>{{ student.name }}</td>
                  <td>{{ student.studentId }}</td>
                  <td>{{ student.gender }}</td>
                  <td>{{ student.dob }}</td>
                  <td>
                    <button
                      class="btn btn-outline-primary btn-sm me-2"
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
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <nav aria-label="Student Pagination">
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
    </nav>

    <!-- Modal for Adding/Editing Student -->
    <div
      v-if="isModalOpen"
      class="modal fade show"
      tabindex="-1"
      style="display: block"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ isEditing ? "Edit Student" : "Add Student" }}
            </h5>
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
            <div class="mb-2">
              <label for="address" class="form-label">Address</label>
              <input
                id="address"
                v-model="selectedStudent.address"
                type="text"
                class="form-control"
                placeholder="Enter address"
              />
            </div>
            <div class="mb-2">
              <label for="phone" class="form-label">Phone</label>
              <input
                id="phone"
                v-model="selectedStudent.phone"
                type="text"
                class="form-control"
                placeholder="Enter phone number"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="isModalOpen = false"
            >
              Close
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
/* Additional styling for modal and pagination */
.modal.fade.show {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
