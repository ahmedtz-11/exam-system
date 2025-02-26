<script setup>
import { ref, computed } from "vue";
import { useStudentsStore } from "@/stores/students";
import { useSchoolsStore } from "@/stores/schools";

const schoolsStore = useSchoolsStore();
const studentsStore = useStudentsStore();

const searchQuery = ref("");
const filterLocation = ref("");
const currentPage = ref(1);
const itemsPerPage = 8;
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

// Declare selectedSchool as a ref to track the selected school
const selectedSchool = ref(null);

// Filter schools based on search and location
const filteredSchools = computed(() => {
  return schoolsStore.schools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      (filterLocation.value ? school.location === filterLocation.value : true)
  );
});

// Filter students by school name, using selectedSchool
const filteredStudentsBySchool = computed(() => {
  // Ensure studentsStore.students is populated
  if (
    !studentsStore.students ||
    studentsStore.students.length === 0 ||
    !selectedSchool.value
  ) {
    return [];
  }

  // Filter students by school name
  return studentsStore.students.filter(
    (student) => student.school_name === selectedSchool.value
  );
});

// Paginate filtered students
const paginatedStudents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredStudentsBySchool.value.slice(start, start + itemsPerPage);
});

// Total number of pages for pagination
const totalPages = computed(() =>
  Math.ceil(filteredStudentsBySchool.value.length / itemsPerPage)
);

// Change page when navigating through pagination
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Open modal to edit or create a student
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

// Save student to the store
const saveStudent = () => {
  schoolsStore.saveStudent(selectedStudent.value, isEditing.value);
  isModalOpen.value = false;
};

// Delete student from the store
const deleteStudent = (schoolId, studentId) => {
  schoolsStore.deleteStudent(schoolId, studentId);
};

// Function to handle opening the accordion and setting the selected school
const openSchoolAccordion = (schoolName) => {
  selectedSchool.value = schoolName; // Set the selected school
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
    <!-- <div class="accordion" id="accordionSchools">
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
            <div class="text-end mb-2">
              <button
                class="btn btn-success"
                @click="openModal(null, school.id)"
              >
                Add Student
              </button>
            </div>

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
                  <tr v-for="student in paginatedStudents" :key="student.id">
                    <td>{{ student.registration_number }}</td>
                    <td>
                      {{ student.first_name }} {{ student.middle_name }}
                      {{ student.last_name }}
                    </td>
                    <td>{{ student.gender }}</td>
                    <td>{{ student.dob }}</td>
                    <td>{{ student.subjects.join(", ") }}</td>
                    <td>{{ student.status }}</td>
                    <td>
                      <div class="btn-group">
                        <button
                          class="btn btn-outline-primary btn-sm"
                          @click="openModal(student, student.school_name)"
                        >
                          <i class="bi bi-pen"></i>
                        </button>
                        <button
                          class="btn btn-outline-danger btn-sm"
                          @click="
                            deleteStudent(student.school_name, student.id)
                          "
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
    </div> -->

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
            @click="
              selectedSchool.value =
                selectedSchool.value === school.name ? null : school.name
            "
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
                  <!-- Display students for the current school -->
                  <tr
                    v-for="student in filteredStudentsBySchool"
                    :key="student.id"
                  >
                    <td>{{ student.registration_number }}</td>
                    <td>
                      {{ student.first_name }} {{ student.middle_name }}
                      {{ student.last_name }}
                    </td>
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

            <!-- Pagination for filtered students in each school -->
            <div
              v-if="filteredStudentsBySchool.length > itemsPerPage"
              class="d-flex justify-content-between"
            >
              <button
                class="btn btn-secondary btn-sm"
                @click="goToPage(currentPage.value - 1)"
                :disabled="currentPage.value <= 1"
              >
                Previous
              </button>
              <button
                class="btn btn-secondary btn-sm"
                @click="goToPage(currentPage.value + 1)"
                :disabled="currentPage.value >= totalPages.value"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <!-- <nav>
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
    </nav> -->
  </div>
</template>

<style scoped></style>

<!-- <div v-if="isModalOpen" class="modal fade show d-block" tabindex="-1">
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
        
        <div class="mb-2">
          <label class="form-label">Subjects Enrolled</label>
          <div class="row p-2">
            <div
              class="form-check col-md-4"
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
          class="btn btn-secondary"
          @click="isModalOpen = false"
        >
          Cancel
        </button>
        <button type="button" class="btn btn-success" @click="saveStudent">
          Save
        </button>
      </div>
    </div>
  </div>
</div> -->
