<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import Alert from "@/components/Alert.vue";
import dataService from "@/services/dataService";

const router = useRouter();
const showAlert = ref(false);
const alertMessage = ref("");
const alertType = ref("danger");
const showPassword = ref(false);
const captchaImage = ref("");

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
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  captcha: yup.string().required("Captcha is required"),
});

// Vee-Validate Form and Fields
const { handleSubmit } = useForm({ validationSchema });

const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");
const { value: captcha, errorMessage: captchaError } = useField("captcha");

// CAPTCHA Image
const fetchCaptcha = () => {
  captchaImage.value = ""; // Clear previous image
  setTimeout(() => {
    captchaImage.value = `http://localhost:8080/necta-api/captcha/getCaptcha.php?rand=${Date.now()}`;
  }, 100); // Small delay to ensure refresh
};


// Handle Form Submission
const onSubmit = handleSubmit(async (values) => {
  console.log("Submitting CAPTCHA:", values.captcha); // Debugging log
  
  try {
    const response = await dataService.login({
      email: values.email,
      password: values.password,
      captcha: values.captcha,
    });

    if (response.data.success) {
      // Store user info in sessionStorage
      sessionStorage.setItem("auth", "true");
      sessionStorage.setItem(
        "user",
        JSON.stringify({ id: response.data.id, email: values.email })
      );

      router.push("/home");
    } else {
      alertMessage.value =
        response.data.error || "Login failed. Please check your credentials.";
      alertType.value = "danger";
      showAlert.value = true;
      fetchCaptcha();
    }
  } catch (error) {
    alertMessage.value = "An error occurred. Please try again.";
    alertType.value = "danger";
    showAlert.value = true;
    fetchCaptcha();
  }
});

onMounted(() => {
  fetchCaptcha();
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
          rgba(20, 150, 80, 0.9)
        ),
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
        <h2 class="fw-bold">NECTA</h2>
      </div>
      <div class="card-body fs-5">
        <form @submit.prevent="onSubmit">
          <!-- Username Field -->
          <div class="mb-3">
            <label for="email" class="form-label">
              <i class="bi bi-person-fill me-2"></i>Email
            </label>
            <input
              type="text"
              id="email"
              v-model="email"
              class="form-control form-control-lg"
              :class="{ 'is-invalid': emailError }"
              style="background-color: rgba(5, 200, 5, 0.2)"
            />
            <div v-if="emailError" class="text-danger mt-1">
              {{ emailError }}
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
                class="form-control form-control-lg"
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
          <div class="d-flex justify-content-end">
            <a
              href="#"
              @click.prevent="forgotPassword"
              class="text-decoration-none text-success"
              >Forgot Password?</a
            >
          </div>

          <div class="mb-3">
            <label for="captcha" class="form-label"
              ><i class="bi bi-shield-lock-fill me-2"></i>Captcha</label
            >
            <div class="input-group">
              <img
                :src="captchaImage"
                alt="CAPTCHA"
                class="captcha-img"
                @click="fetchCaptcha"
              />
              <input
                type="text"
                id="captcha"
                v-model="captcha"
                class="form-control form-control-lg"
                :class="{ 'is-invalid': captchaError }"
                style="background-color: rgba(5, 200, 5, 0.2)"
              />
            </div>

            <div v-if="captchaError" class="text-danger mt-1">
              {{ captchaError }}
            </div>
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

.captcha-img {
  border-radius: 5px;
}
</style>

<!-- // Forgot Password Placeholder
// const forgotPassword = () => {
//   alertMessage.value = "Forgot password functionality is under construction.";
//   alertType.value = "info";
//   showAlert.value = true;
// };

// Mock Authentication Data
// const users = [
//   { username: "admin", password: "admin123" },
//   { username: "user", password: "user123" },
// ];

// Handle Form Submission
// const onSubmit = handleSubmit((values) => {
//   const user = users.find(
//     (u) => u.email === values.email && u.password === values.password
//   );

//   if (user) {
//     sessionStorage.setItem("auth", "true");
//     sessionStorage.setItem("user", JSON.stringify({ email: values.email }));
//     router.push("/home");
//   } else {
//     alertMessage.value = "Invalid credentials";
//     alertType.value = "danger";
//     showAlert.value = true;
//   }
// }); -->
