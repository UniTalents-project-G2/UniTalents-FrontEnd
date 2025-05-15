/**
 * @class User
 * @description Represents a user in the system
 */
export class User {
    /**
     * @param {Object} user
     * @param {number} [user.id] - User ID (optional for creation)
     * @param {string} user.name - User's full name
     * @param {string} user.email - User's email address
     * @param {string} user.password - User's password
     * @param {string} user.rubro - User's professional area (from fields)
     */
    constructor({ id, name, email, password, rubro }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.rubro = rubro;
    }
}
