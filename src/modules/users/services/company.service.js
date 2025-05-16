import http from '@/shared/services/http.instance'
import { Company } from '../models/company.entity'

export async function getCompanyById(id) {
    const res = await http.get(`/companies/${id}`)
    return new Company(res.data)
}
export async function updateCompany(id, data) {
    const res = await http.put(`/companies/${id}`, data)
    return res.data
}

