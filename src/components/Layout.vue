<script setup>
import { ref } from "vue";
import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";

const isSidebarCollapsed = ref(false);

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};
</script>

<template>
  <div class="app-container">
    <Navbar @toggle-sidebar="toggleSidebar"/>
    <div class="main-content d-flex">
      <Sidebar :isCollapsed="isSidebarCollapsed" />
      <div :class="['content flex-grow-1 p-2', { 'collapsed': isSidebarCollapsed }]">
  <router-view />
</div>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  flex: 1;
  overflow: hidden;
}

.content {
  overflow-y: auto;
  transition: margin-left 0.3s;
}

.sidebar-collapsed + .content {
  margin-left: 35px;
}

.content.collapsed {
  margin-left: 35px;
}



@media (max-width: 768px) {
  .content {
    margin-left: 0; /* Sidebar becomes an overlay on small screens */
  }

  .sidebar {
    position: absolute;
    z-index: 1000;
    height: 100vh;
  }

  .sidebar-collapsed {
    width: 0;
    overflow: hidden;
  }
}
</style>
