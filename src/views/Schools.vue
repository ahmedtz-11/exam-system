<script setup>
import { ref, computed } from "vue";

// Sample schools data
const schools = ref([
  {
    id: 1,
    name: "Greenwood High",
    code: "GH001",
    type: "Private",
    location: "Dar es Salaam",
  },
  {
    id: 2,
    name: "Lakeview Secondary",
    code: "LV002",
    type: "Public",
    location: "Mwanza",
  },
  {
    id: 3,
    name: "Starlight Academy",
    code: "SA003",
    type: "Private",
    location: "Arusha",
  },
  {
    id: 4,
    name: "Unity High School",
    code: "UH004",
    type: "Public",
    location: "Dodoma",
  },
  {
    id: 5,
    name: "Sunrise Secondary",
    code: "SS005",
    type: "Private",
    location: "Mbeya",
  },
  {
    id: 6,
    name: "Ocean Breeze School",
    code: "OB006",
    type: "Public",
    location: "Tanga",
  },
  {
    id: 7,
    name: "Mountain View Academy",
    code: "MV007",
    type: "Private",
    location: "Kilimanjaro",
  },
  {
    id: 8,
    name: "Royal College",
    code: "RC008",
    type: "Private",
    location: "Zanzibar",
  },
  {
    id: 9,
    name: "Bright Future School",
    code: "BF009",
    type: "Public",
    location: "Iringa",
  },
  {
    id: 10,
    name: "Global Vision Academy",
    code: "GV010",
    type: "Private",
    location: "Morogoro",
  },
]);

// Search, filter, and pagination states
const searchQuery = ref("");
const filterType = ref("");
const currentPage = ref(1);
const itemsPerPage = 8;

// Modal states
const isModalOpen = ref(false);
const isEditing = ref(false);
const selectedSchool = ref({
  id: null,
  name: "",
  code: "",
  type: "",
  location: "",
});

// Computed property for filtering and searching
const filteredSchools = computed(() => {
  return schools.value.filter(
    (school) =>
      school.name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      (filterType.value ? school.type === filterType.value : true)
  );
});

// Computed property for paginated schools
const paginatedSchools = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredSchools.value.slice(start, start + itemsPerPage);
});

// Total pages
const totalPages = computed(() =>
  Math.ceil(filteredSchools.value.length / itemsPerPage)
);

// Change page
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Open modal for add or edit
const openModal = (school = null) => {
  if (school) {
    isEditing.value = true;
    selectedSchool.value = { ...school };
  } else {
    isEditing.value = false;
    selectedSchool.value = {
      id: null,
      name: "",
      code: "",
      type: "",
      location: "",
    };
  }
  isModalOpen.value = true;
};

// Save school (add or update)
const saveSchool = () => {
  if (isEditing.value) {
    const index = schools.value.findIndex(
      (s) => s.id === selectedSchool.value.id
    );
    if (index !== -1) schools.value[index] = { ...selectedSchool.value };
  } else {
    selectedSchool.value.id = schools.value.length + 1;
    schools.value.push({ ...selectedSchool.value });
  }
  isModalOpen.value = false;
};

// Delete school
const deleteSchool = (id) => {
  schools.value = schools.value.filter((s) => s.id !== id);
};
</script>

<template>
  <div class="card p-3">
    <h2>Schools & Institutions</h2>

    <!-- Search and Filter Controls -->
    <div class="row mb-3">
      <div class="col-md-5">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Search by name..."
        />
      </div>
      <div class="col-md-4">
        <select v-model="filterType" class="form-control">
          <option value="">All Types</option>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
      </div>
      <div class="col-md-3 text-end">
        <button class="btn btn-success" @click="openModal()">Add School</button>
      </div>
    </div>

    <!-- Schools Table -->
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th class="fw-bold">Name</th>
          <th class="fw-bold">Code</th>
          <th class="fw-bold">Type</th>
          <th class="fw-bold">Location</th>
          <th class="fw-bold text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="school in paginatedSchools" :key="school.id">
          <td>{{ school.name }}</td>
          <td>{{ school.code }}</td>
          <td>{{ school.type }}</td>
          <td>{{ school.location }}</td>
          <td class="text-center">
            <button
              class="btn btn-outline-primary btn-sm me-2"
              @click="openModal(school)"
            >
              <i class="bi bi-pen"></i>
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteSchool(school.id)"
            >
              <i class="bi bi-trash3"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <nav>
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button
            class="btn btn-success btn-md"
            @click="goToPage(currentPage - 1)"
          >
            Previous
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
            Next
          </button>
        </li>
      </ul>
    </nav>

    <!-- Modal -->
    <div v-if="isModalOpen" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ isEditing ? "Edit School" : "Add School" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="isModalOpen = false"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-2">
              <label for="schoolName" class="form-label">School Name</label>
              <input
                id="schoolName"
                v-model="selectedSchool.name"
                type="text"
                class="form-control"
                placeholder="Enter school name"
              />
            </div>

            <div class="mb-2">
              <label for="schoolCode" class="form-label">School Code</label>
              <input
                id="schoolCode"
                v-model="selectedSchool.code"
                type="text"
                class="form-control"
                placeholder="Enter school code"
              />
            </div>

            <div class="mb-2">
              <label for="schoolType" class="form-label">School Type</label>
              <select
                id="schoolType"
                v-model="selectedSchool.type"
                class="form-control"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <div>
              <label for="schoolLocation" class="form-label">Location</label>
              <input
                id="schoolLocation"
                v-model="selectedSchool.location"
                type="text"
                class="form-control"
                placeholder="Enter location"
              />
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" @click="isModalOpen = false">
              Cancel
            </button>
            <button class="btn btn-primary" @click="saveSchool">
              {{ isEditing ? "Update" : "Save" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Backdrop -->
    <div v-if="isModalOpen" class="modal-backdrop fade show"></div>
  </div>
</template>

<style scoped>
.table-dark {
  background-color: #343a40 !important;
  color: white;
}
</style>
