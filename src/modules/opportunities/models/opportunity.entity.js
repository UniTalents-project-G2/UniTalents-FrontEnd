export class Opportunity {
    constructor({
                    id = null,
                    title = '',
                    description = '',
                    technologies = [],
                    budget = 0,
                    datePublished = '',
                    companyId = null,
                    company = null
                }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.technologies = technologies;
        this.budget = budget;
        this.datePublished = datePublished;
        this.companyId = companyId;
        this.company = company;
    }
}
