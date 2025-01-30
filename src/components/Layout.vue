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
      <div class="content flex-grow-1 p-2">
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
}

@media (max-width: 768px) {
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
