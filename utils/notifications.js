class Notification extends Error {
    constructor(message, status, type) {
        super(message)
        this.type = type
    }
}

module.exports = {
    Notification
}