import { Opportunity } from '../models/opportunity.entity';
import http from '@/shared/services/http.instance.js';

const OPPORTUNITIES_PATH = import.meta.env.VITE_OPPORTUNITIES_ENDPOINT_PATH;
const COMPANIES_PATH = import.meta.env.VITE_COMPANIES_ENDPOINT_PATH;

export const getAllOpportunities = async () => {
    try {
        const [oppsRes, companiesRes] = await Promise.all([
            http.get(OPPORTUNITIES_PATH),
            http.get(COMPANIES_PATH)
        ]);

        const oppsData = oppsRes.data;
        const companiesData = companiesRes.data;

        return oppsData.map(op => {
            const company = companiesData.find(c => c.id === op.companyId);
            return new Opportunity({ ...op, company });
        });

    } catch (error) {
        console.error('Error al obtener oportunidades:', error);
        return [];
    }
};

export const getOpportunityById = async (id) => {
    try {
        const [oppRes, companiesRes] = await Promise.all([
            http.get(`${OPPORTUNITIES_PATH}/${id}`),
            http.get(COMPANIES_PATH)
        ]);

        const oppData = oppRes.data;
        const companiesData = companiesRes.data;

        const company = companiesData.find(c => c.id === oppData.companyId);
        return new Opportunity({ ...oppData, company });

    } catch (error) {
        console.error('Error al obtener la oportunidad:', error);
        return null;
    }
};
