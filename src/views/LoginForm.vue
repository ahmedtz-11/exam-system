<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import Alert from "@/components/Alert.vue";

const router = useRouter();
const showAlert = ref(false);
const alertMessage = ref("");
const alertType = ref("danger");
const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Forgot Password Placeholder
const forgotPassword = () => {
  alertMessage.value = "Forgot password functionality is under construction.";
  alertType.value = "info";
  showAlert.value = true;
};

// Vee-Validate Schema
const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

// Vee-Validate Form and Fields
const { handleSubmit } = useForm({
  validationSchema,
});

const { value: username, errorMessage: usernameError } = useField("username");
const { value: password, errorMessage: passwordError } = useField("password");

// Mock Authentication Data
const users = [
  { username: "admin", password: "admin123" },
  { username: "user", password: "user123" },
];

// Handle Form Submission
const onSubmit = handleSubmit((values) => {
  const user = users.find(
    (u) => u.username === values.username && u.password === values.password
  );

  if (user) {
    sessionStorage.setItem("auth", "true");
    sessionStorage.setItem("user", JSON.stringify({ username: values.username }));
    router.push("/layout");
  } else {
    alertMessage.value = "Invalid credentials";
    alertType.value = "danger";
    showAlert.value = true;
  }
});
</script>

<template>
  <Alert
    :message="alertMessage"
    :type="alertType"
    :show="showAlert"
    @close="showAlert = false"
  />
  <div
    class="d-flex justify-content-center align-items-center vh-100"
    style="
      background-image: linear-gradient(
          rgba(55, 165, 55, 0.8),
          rgba(20, 150, 80, 0.9)), 
          url('/images/library.jpg');
        
      background-size: cover;
      background-position: center;
    "
  >
    <div
      class="card shadow-lg text-success"
      style="width: 550px; background-color: rgba(255, 255, 255, 0.6)"
    >
      <div class="card-header text-center">
        <h2 class="fw-bold">Exam Council</h2>
      </div>
      <div class="card-body fs-5">
        <form @submit.prevent="onSubmit">
          <!-- Username Field -->
          <div class="mb-3">
            <label for="username" class="form-label">
              <i class="bi bi-person-fill me-2"></i>Username
            </label>
            <input
              type="text"
              id="username"
              v-model="username"
              class="form-control fs-5"
              :class="{ 'is-invalid': usernameError }"
              style="background-color: rgba(5, 200, 5, 0.2)"
            />
            <div v-if="usernameError" class="text-danger mt-1">
              {{ usernameError }}
            </div>
          </div>
          <!-- Password Field -->
          <div class="mb-3">
            <label for="password" class="form-label">
              <i class="bi bi-key-fill me-2"></i>Password
            </label>
            <div class="input-group">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                class="form-control fs-5"
                :class="{ 'is-invalid': passwordError }"
                style="background-color: rgba(5, 200, 5, 0.2)"
              />
              <button
                type="button"
                class="btn btn-success"
                @click="togglePasswordVisibility"
              >
                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
            </div>
            <div v-if="passwordError" class="text-danger mt-1">
              {{ passwordError }}
            </div>
          </div>
          <!-- Forgot Password -->
          <div class="d-flex justify-content-end mb-3">
            <a
              href="#"
              @click.prevent="forgotPassword"
              class="text-decoration-none text-success"
              >Forgot Password?</a
            >
          </div>
          <!-- Submit Button -->
          <button type="submit" class="btn btn-success fs-5 w-100">
            <i class="bi bi-box-arrow-in-right me-2"></i> Login
          </button>
        </form>
      </div>
      <p class="text-center mt-4 fs-6">
          Powered by: <br />
          <img
            src="/images/rahisi-4-removebg-preview.png?url"
            alt="Company Logo"
            class="img-fluid"
            style="height: 30px"
          />
        </p>
    </div>
  </div>
</template>

<style scoped>
.card {
    border-radius: 20px;
}
</style>
