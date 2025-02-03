<script setup>
defineProps({
  isCollapsed: Boolean,
});
</script>

<template>
    <aside :class="['sidebar', { 'sidebar-collapsed': isCollapsed }]">
      <ul class="nav flex-column fs-5">
        <li class="nav-item mb-2">
          <router-link class="nav-link text-success" to="/layout">
            <i class="bi bi-house"></i>
            <span v-if="!isCollapsed" class="ms-2">Home</span>
          </router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link class="nav-link text-success" to="/school">
            <i class="bi bi-buildings"></i>
            <span v-if="!isCollapsed" class="ms-2">Schools</span>
          </router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link class="nav-link text-success" to="/students">
            <i class="bi bi-mortarboard"></i>
            <span v-if="!isCollapsed" class="ms-2">Students</span>
          </router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link class="nav-link text-success" to="/exams">
            <i class="bi bi-book-half"></i>
            <span v-if="!isCollapsed" class="ms-2">Examination</span>
          </router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link class="nav-link text-success" to="/results">
            <i class="bi bi-easel"></i>
            <span v-if="!isCollapsed" class="ms-2">Results</span>
          </router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link class="nav-link text-success" to="/reports">
            <i class="bi bi-file-earmark-text"></i>
            <span v-if="!isCollapsed" class="ms-2">Reports</span>
          </router-link>
        </li>
      </ul>
    </aside>
  </template>
  
  <style scoped>
  .sidebar {
    width: 250px;
    height: 100vh;
    transition: width 0.3s;
    background: rgb(210, 255, 210);
    border-right: 1px solid green;
  }
  
  .sidebar-collapsed {
    width: 35px;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 8px;
  }
  
  </style>