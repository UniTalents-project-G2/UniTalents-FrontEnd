import httpInstance from "@/shared/services/http.instance.js";

import {StudentPostulation} from "@/modules/student-postulations/model/student-postulation.entity.js";
/**
 * @class StudentPostulationService
 * @description Service class for handling student project postulations
 */
export class StudentPostulationService {
    /** @type {string} The API endpoint for student postulations */
    resourceEndpoint = import.meta.env.VITE_STUDENT_POSTULATIONS_ENDPOINT_PATH || '/studentPostulations';

    /**
     * Gets all student postulations
     * @returns {Promise<StudentPostulation[]>} Array of StudentPostulation instances
     */
    async getAllPostulations() {
        try {
            const response = await httpInstance.get(this.resourceEndpoint);
            return response.data.map(postulation => new StudentPostulation(postulation));
        } catch (error) {
            console.error("Error fetching postulations:", error);
            throw error;
        }
    }

    /**
     * Gets postulations by student ID
     * @param {string|number} studentId - Student ID
     * @returns {Promise<StudentPostulation[]>} Array of postulations
     */
    async getByStudentId(studentId) {
        try {
            const response = await httpInstance.get(`${this.resourceEndpoint}?studentId=${studentId}`);
            return response.data.map(postulation => new StudentPostulation(postulation));
        } catch (error) {
            console.error(`Error fetching postulations for student ${studentId}:`, error);
            throw error;
        }
    }


    /**
     * Gets a specific postulation by ID
     * @param {string|number} id - Postulation ID
     * @returns {Promise<StudentPostulation>} Postulation instance
     */
    async getPostulationById(id) {
        try {
            const response = await httpInstance.get(`${this.resourceEndpoint}/${id}`);
            return new StudentPostulation(response.data);
        } catch (error) {
            console.error(`Error fetching postulation ${id}:`, error);
            throw error;
        }
    }




}