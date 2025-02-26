<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  school: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close", "save"]);

const closeModal = () => {
  emit("close");
};
</script>

<template>
  <Teleport to="body">
    <div
      class="modal fade show d-block"
      tabindex="-1"
      style="background: rgba(0, 0, 0, 0.8)"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h4 class="modal-title">
              <i class="bi bi-buildings"></i> {{ school.name }}
            </h4>
            <button
              type="button"
              class="btn-close btn-close-white"
              @click="closeModal"
            ></button>
          </div>

          <div class="modal-body">
            <div class="container">
              <div class="row mb-1">
                <div class="col-12">
                  <h5 class="text-muted">School Information</h5>
                  <hr />
                </div>
                <div class="col-md-12">
                  <p class="fs-5">
                    <span class="text-success"
                      ><i class="bi bi-pass me-1"></i>Centre Number:
                    </span>
                    S.{{ school.centre_no }}
                  </p>
                </div>
                <div class="col-md-12">
                  <p class="fs-5">
                    <span class="text-success"
                      ><i class="bi bi-geo-alt me-1"></i>Region:
                    </span>
                    {{ school.location }}
                  </p>
                </div>
                <div class="col-md-12">
                  <p class="fs-5">
                    <span class="text-success"
                      ><i class="bi bi-telephone me-1"></i>Contact:
                    </span>
                    {{ school.tel_no }}
                  </p>
                </div>
                <div class="col-md-12">
                  <p class="fs-5">
                    <span class="text-success"
                      ><i class="bi bi-building me-1"></i>Ownership:
                    </span>
                    {{ school.ownership_type }}
                  </p>
                </div>
                <div class="col-md-12">
                  <p class="fs-5">
                    <span class="text-success"
                      ><i class="bi bi-mortarboard me-1"></i>Number of Students:
                    </span>
                    30
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-danger" @click="closeModal">
              Close <i class="bi bi-x-circle-fill ms-1"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  font-family: 'DM Sans', sans-serif;
}
</style>
