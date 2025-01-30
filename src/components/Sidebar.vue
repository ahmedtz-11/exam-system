<script setup>
defineProps({
  isCollapsed: Boolean,
});
</script>

<template>
    <aside :class="['sidebar', 'bg-success', { 'sidebar-collapsed': isCollapsed }]">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/layout">
            <i class="bi bi-house"></i>
            <span v-if="!isCollapsed">Home</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/school">
            <i class="bi bi-info-circle"></i>
            <span v-if="!isCollapsed">About</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/contact">
            <i class="bi bi-envelope"></i>
            <span v-if="!isCollapsed">Contact</span>
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
    width: 40px;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 6px 10px;
  }
  
  /* .nav-link i {
    font-size: 1.2rem;
  } */
  </style>