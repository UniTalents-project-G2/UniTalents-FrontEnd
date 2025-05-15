import http from '@/shared/services/http.instance'
import { Project } from '../models/project.entity'

export async function getAllProjects() {
    const res = await http.get('/projects')
    return res.data.map(p => new Project(p))
}

export async function getProjectById(id) {
    const res = await http.get(`/projects/${id}`)
    return new Project(res.data)
}

export async function createProject(projectData) {
    const res = await http.post('/projects', projectData)
    return new Project(res.data)
}

export async function updateProject(id, projectData) {
    const res = await http.put(`/projects/${id}`, projectData)
    return new Project(res.data)
}

export async function deleteProject(id) {
    const res = await http.delete(`/projects/${id}`)
    return res.data
}