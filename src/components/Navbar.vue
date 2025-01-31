<script setup>
const emit = defineEmits(["toggle-sidebar"]);

const toggleSidebar = () => {
  emit("toggle-sidebar");
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: rgba(70, 150, 50, 0.6);">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">EXAM</a>
      <button class="navbar-toggler" type="button" @click="toggleSidebar">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>
</template>
