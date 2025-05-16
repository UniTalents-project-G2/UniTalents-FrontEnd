export class Student {
    constructor({ id, name, career, rating, skills = [], avatar, portfolioUrl, reputation = [] }) {
        this.id = id
        this.name = name
        this.career = career
        this.rating = rating
        this.skills = skills
        this.avatar = avatar
        this.portfolioUrl = portfolioUrl
        this.reputation = reputation
    }

    hasSkill(skill) {
        return this.skills.includes(skill)
    }

    reputationAverage() {
        if (!this.reputation.length) return null
        const sum = this.reputation.reduce((acc, r) => acc + r.score, 0)
        return (sum / this.reputation.length).toFixed(1)
    }
}
