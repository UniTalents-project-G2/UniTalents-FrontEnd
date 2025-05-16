import http from '@/shared/services/http.instance'
import { Postulation } from '../models/postulation.entity'
import { Student } from '@/modules/users/models/student.entity'


export async function getAllPostulations() {
    const res = await http.get('/postulations')
    return res.data.map(p => new Postulation(p))
}

export async function getPostulationById(id) {
    const res = await http.get(`/postulations/${id}`)
    return new Postulation(res.data)
}

export async function getMultipleStudents(ids) {
    const requests = ids.map(id => http.get(`/students/${id}`))
    const responses = await Promise.all(requests)
    return responses.map(res => new Student(res.data))
}

export async function getStudentById(id) {
    const res = await http.get(`/students/${id}`)
    return new Student(res.data)
}

export async function selectStudentInPostulation(postulationId, studentId) {
    const res = await http.patch(`/postulations/${postulationId}`, {
        selectedStudentId: studentId
    })
    return res.data
}

