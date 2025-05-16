import httpInstance from "@/shared/services/http.instance.js";
import { Project} from "@/modules/projects/models/project.entity.js";

/**
 * @class PortfolioService
 * @description Service class for handling CRUD operations on projects
 */
export class PortfolioService {
    /** @type {string} The API endpoint for projects */
    resourceEndpoint = import.meta.env.VITE_PROJECTS_ENDPOINT_PATH || '/projects';

    /**
     * Gets all projects
     * @returns {Promise<Project[]>} Array of Project instances
     */
    async getAllProjects() {
        try {
            const response = await httpInstance.get(this.resourceEndpoint);
            return response.data.map(project => new Project(project));
        } catch (error) {
            console.error("Error fetching projects:", error);
            throw error;
        }
    }

    /**
     * Gets a project by ID
     * @param {string|number} id - Project ID
     * @returns {Promise<Project>} Project instance
     */
     async getProjectById(id) {
        try {
            const response = await httpInstance.get(`${this.resourceEndpoint}/${id}`);
            return new Project(response.data);
        } catch (error) {
            console.error(`Error fetching project ${id}:`, error);
            throw error;
        }
    }

    /**
     * Creates a new project
     * @param {Object} projectData - Project data
     * @returns {Promise<Project>} Created project instance
     */
    async createProject(projectData) {
        try {
            const response = await httpInstance.post(this.resourceEndpoint, projectData);
            return new Project(response.data);
        } catch (error) {
            console.error("Error creating project:", error);
            throw error;
        }
    }

    /**
     * Updates a project
     * @param {string|number} id - Project ID
     * @param {Object} updateData - Data to update
     * @returns {Promise<Project>} Updated project instance
     */
    async updateProject(id, updateData) {
        try {
            const response = await httpInstance.put(`${this.resourceEndpoint}/${id}`, updateData);
            return new Project(response.data);
        } catch (error) {
            console.error(`Error updating project ${id}:`, error);
            throw error;
        }
    }

    /**
     * Deletes a project
     * @param {string|number} id - Project ID
     * @returns {Promise<void>}
     */
    async deleteProject(id) {
        try {
            await httpInstance.delete(`${this.resourceEndpoint}/${id}`);
        } catch (error) {
            console.error(`Error deleting project ${id}:`, error);
            throw error;
        }
    }

    /**
     * Gets projects by status
     * @param {string} status - Project status (e.g., 'active', 'completed')
     * @returns {Promise<Project[]>} Filtered projects
     */
    async getProjectsByStatus(status) {
        try {
            const response = await httpInstance.get(`${this.resourceEndpoint}?status=${status}`);
            return response.data.map(project => new Project(project));
        } catch (error) {
            console.error(`Error fetching ${status} projects:`, error);
            throw error;
        }
    }

    /**
     * Gets projects containing specific skills
     * @param {string[]} skills - Array of skills
     * @returns {Promise<Project[]>} Filtered projects
     */
    async getProjectsBySkills(skills) {
        try {
            const response = await httpInstance.get(
                `${this.resourceEndpoint}?skills=${skills.join(',')}`
            );
            return response.data.map(project => new Project(project));
        } catch (error) {
            console.error(`Error fetching projects with skills ${skills}:`, error);
            throw error;
        }
    }


}