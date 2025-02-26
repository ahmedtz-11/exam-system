import { defineStore } from "pinia";
import dataService from "@/services/dataService";

export const useSchoolsStore = defineStore("schools", {
  state: () => ({
    schools: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchSchools() {
      this.loading = true;
      try {
        const response = await dataService.getSplash(); 
        this.schools = response?.data?.data?.schools || [];
        console.log(this.schools);
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async createSchool(data) {
      try {
        const response = await dataService.createSchool(data);
        this.schools.push(response.data);
      } catch (err) {
        this.error = err.message;
      }
    },

    async updateSchool(id, data) {
      try {
        await dataService.updateSchool(id, data);
        this.schools = this.schools.map((school) =>
          school.id === id ? { ...school, ...data } : school
        );
      } catch (err) {
        this.error = err.message;
      }
    },

    async deleteSchool(id) {
      try {
        await dataService.deleteSchool(id);
        this.schools = this.schools.filter((school) => school.id !== id);
      } catch (err) {
        this.error = err.message;
      }
    },
  },
});
