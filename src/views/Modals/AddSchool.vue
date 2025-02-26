<script setup>
import { useField, useForm } from "vee-validate";
import { computed, watch } from "vue";
import * as yup from "yup";

const props = defineProps({
  school: {
    type: Object,
    default: null,
  },
});
const emit = defineEmits(["close"]);
const isEditing = computed(() => !!props.school);

// Form validation
const { handleSubmit, setValues } = useForm({
  validationSchema: yup.object({
    name: yup.string().required("School name is required"),
    centre_no: yup.string().required("Centre number is required"),
    tel_no: yup
      .string()
      .required("Phone number is required")
      .matches(
        /^(\+255|0)\d{9}$/,
        "Invalid phone number. Must be in the format +255XXXXXXXXX"
      ),
    ownership_type: yup
      .string()
      .oneOf(["Public", "Private"])
      .required("School type is required"),
    location: yup.string().required("Region is required"),
  }),
});

const { value: name, errorMessage: nameError } = useField("name");
const { value: centre_no, errorMessage: centre_noError } =
  useField("centre_no");
const { value: tel_no, errorMessage: tel_noError } = useField("tel_no");
const { value: ownership_type, errorMessage: typeError } =
  useField("ownership_type");
const { value: location, errorMessage: locationError } = useField("location");

watch(
  () => props.school,
  (newSchool) => {
    if (newSchool) {
      setValues({ ...newSchool }); // Update form when editing
    } else {
      setValues({
        name: "",
        centre_no: "",
        tel_no: "",
        ownership_type: "",
        location: "",
      }); // Reset form when adding new
    }
  },
  { immediate: true } // Run this watch immediately on mount
);

// Form submission
const saveSchool = handleSubmit((values) => {
  emit("save", {
    id: props.school?.id || null,
    ...values,
  });
  closeModal();
});

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
              <i class="bi bi-database-add"></i> {{ isEditing ? "Edit School" : "Add School" }}
            </h4>
            <button
              type="button"
              class="btn-close btn-close-white"
              @click="closeModal"
            ></button>
          </div>

          <div class="modal-body">
            <div class="mb-2">
              <label for="centre_no" class="form-label"
                >Centre Number</label
              >
              <input
                id="centre_no"
                v-model="centre_no"
                type="text"
                class="form-control"
                placeholder="Enter centre number..."
              />
              <small class="text-danger">{{ centre_noError }}</small>
            </div>

            <div class="mb-2">
              <label for="schoolName" class="form-label">School Name</label>
              <input
                id="schoolName"
                v-model="name"
                type="text"
                class="form-control"
                placeholder="Enter school name..."
              />
              <small class="text-danger">{{ nameError }}</small>
            </div>

            <div class="mb-2">
              <label for="tel_no" class="form-label">Active Phone Number</label>
              <input
                id="tel_no"
                v-model="tel_no"
                type="text"
                class="form-control"
                placeholder="+255XXXXXXXXX"
              />
              <small class="text-danger">{{ tel_noError }}</small>
            </div>

            <div class="mb-2">
              <label for="ownership_type" class="form-label"
                >Ownership Type</label
              >
              <select
                id="ownership_type"
                v-model="ownership_type"
                class="form-control"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
              <small class="text-danger">{{ typeError }}</small>
            </div>

            <div class="mb-2">
              <label for="schoolLocation" class="form-label">Region</label>
              <input
                id="schoolLocation"
                v-model="location"
                type="text"
                class="form-control"
                placeholder="Enter region..."
              />
              <small class="text-danger">{{ locationError }}</small>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-danger" @click="closeModal">Cancel <i class="bi bi-x-circle-fill ms-1"></i></button>
            <button class="btn btn-success" @click="saveSchool">
              {{ isEditing ? "Update" : "Save" }} <i class="bi bi-floppy-fill ms-1"></i>
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
