export class Postulation {
    constructor({ id, title, createdAt, pending, applicants = [], selectedStudentId = null}) {
        this.id = id
        this.title = title
        this.createdAt = createdAt
        this.pending = pending
        this.applicants = applicants
        this.selectedStudentId = selectedStudentId
    }

    isOpen() {
        return this.pending > 0
    }

    close() {
        this.pending = 0
    }

    applicantCount() {
        return this.applicants.length
    }

    addApplicant(studentId) {
        if (this.isOpen() && !this.applicants.includes(studentId)) {
            this.applicants.push(studentId)
            this.pending++
        }
    }


}
