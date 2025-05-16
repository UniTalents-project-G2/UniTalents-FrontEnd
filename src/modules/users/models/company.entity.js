export class Company {
    constructor({
                    id,
                    name,
                    creator,
                    location,
                    focus,
                    email,
                    phone,
                    rating,
                    technologies = [],
                    logoUrl
                }) {
        this.id = id
        this.name = name
        this.creator = creator
        this.location = location
        this.focus = focus
        this.email = email
        this.phone = phone
        this.rating = rating
        this.technologies = technologies
        this.logoUrl = logoUrl
    }

    formattedLocation() {
        return this.location || 'No especificado'
    }

    hasTechnology(tag) {
        return this.technologies.includes(tag)
    }
}
