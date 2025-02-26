<script setup>
import { ref, computed, onMounted } from "vue";
import { useSchoolsStore } from "@/stores/schools";
import AddSchool from "./Modals/AddSchool.vue";
import ViewSchool from "./Modals/ViewSchool.vue";

const schoolsStore = useSchoolsStore();
const searchQuery = ref("");
const filterType = ref("");
const currentPage = ref(1);
const itemsPerPage = 3;

// Computed properties for filtering, pagination and searching
const filteredSchools = computed(() => {
  return schoolsStore.schools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      (filterType.value ? school.type === filterType.value : true)
  );
});

const paginatedSchools = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredSchools.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() =>
  Math.ceil(filteredSchools.value.length / itemsPerPage)
);

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Modal states
const showModal = ref(false);
const currentModal = ref("");
const modalData = ref(null);

const openAddSchoolModal = () => {
  modalData.value = null;
  showModal.value = true;
  currentModal.value = "add";
};

const openEditSchoolModal = (school) => {
  modalData.value = { ...school };
  showModal.value = true;
  currentModal.value = "edit";
};

const openViewSchoolModal = (school) => {
  modalData.value = { ...school };
  showModal.value = true;
  currentModal.value = "view";
};

// Delete school
const deleteSchool = (id) => {
  schoolsStore.deleteSchool(id);
};

onMounted(() => {
  schoolsStore.fetchSchools();
});
</script>

<template>
  <div class="card p-3 border-success">
    <h2>Schools Registered</h2>

    <!-- SEARCH AND FILTER CONTROLS -->
    <div class="row g-2 mb-3">
      <div class="col-12 col-sm-6 col-md-5">
        <div class="input-group">
          <span class="input-group-text bg-success text-white"
            ><i class="bi bi-search"></i
          ></span>
          <input
            v-model="searchQuery"
            type="text"
            class="form-control border-success"
            placeholder="Search by name..."
          />
        </div>
      </div>
      <div class="col-12 col-sm-6 col-md-4">
        <select v-model="filterType" class="form-control border-success">
          <option value="">All Types</option>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
      </div>
      <div class="col-md-3 text-end">
        <button class="btn btn-success" @click="openAddSchoolModal()">
          Add School
        </button>
      </div>
    </div>

    <!-- SCHOOLS TABLE -->
    <div class="table-responsive">
      <table class="table table-striped">
        <thead class="table-success">
          <tr>
            <th class="fw-bold">Centre No.</th>
            <th class="fw-bold">Name</th>
            <th class="fw-bold">Type</th>
            <th class="fw-bold">Location</th>
            <th class="fw-bold text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="school in paginatedSchools" :key="school.id">
            <td>S.{{ school.centre_no }}</td>
            <td>{{ school.name }}</td>

            <td>{{ school.ownership_type }}</td>
            <td>{{ school.location }}</td>
            <td class="text-center">
              <div class="btn-group">
                <button
                  class="btn btn-outline-success btn-sm"
                  @click="openViewSchoolModal(school)"
                >
                  <i class="bi bi-eye"></i>
                </button>
                <button
                  class="btn btn-outline-primary btn-sm"
                  @click="openEditSchoolModal(school)"
                >
                  <i class="bi bi-pen"></i>
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  @click="deleteSchool(school.id)"
                >
                  <i class="bi bi-trash3"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- PAGINATION CONTROLS -->
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

    <!-- MODALS -->
    <AddSchool
      v-if="(currentModal === 'add' || currentModal === 'edit') && showModal"
      :school="modalData"
      @close="showModal = false"
    />

    <ViewSchool
      v-if="currentModal === 'view' && showModal"
      :school="modalData"
      @close="showModal = false"
    />
  </div>
</template>

<style scoped></style>
