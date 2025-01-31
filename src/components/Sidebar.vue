<script setup>
defineProps({
  isCollapsed: Boolean,
});
</script>

<template>
    <aside :class="['sidebar', 'bg-success', { 'sidebar-collapsed': isCollapsed }]">
      <ul class="nav flex-column fs-5">
        <li class="nav-item mb-2">
          <router-link class="nav-link text-white" to="/layout">
            <i class="bi bi-house"></i>
            <span v-if="!isCollapsed" class="ms-2">Home</span>
          </router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link class="nav-link text-white" to="/school">
            <i class="bi bi-buildings"></i>
            <span v-if="!isCollapsed" class="ms-2">Schools</span>
          </router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link class="nav-link text-white" to="/students">
            <i class="bi bi-mortarboard"></i>
            <span v-if="!isCollapsed" class="ms-2">Students</span>
          </router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link class="nav-link text-white" to="/contact">
            <i class="bi bi-envelope"></i>
            <span v-if="!isCollapsed" class="ms-2">Contact</span>
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
  }
  
  .sidebar-collapsed {
    width: 35px;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 9px;
  }
  
  </style>