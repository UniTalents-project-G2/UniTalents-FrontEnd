export class Project {
    constructor({
                    id,
                    title,
                    manager,
                    status,
                    dueDate,
                    description,
                    skills = [],
                    members = []
                }) {
        this.id = id
        this.title = title
        this.manager = manager
        this.status = status
        this.dueDate = dueDate
        this.description = description
        this.skills = skills
        this.members = members
    }

    isActive() {
        return this.status === 'En curso'
    }

    addMember(memberId) {
        if (!this.members.includes(memberId)) {
            this.members.push(memberId)
        }
    }

    removeMember(memberId) {
        this.members = this.members.filter(id => id !== memberId)
    }
}