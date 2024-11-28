const db = require('../config/db');

exports.createHabit = (data, callback) => {
    const query = `INSERT INTO habits (user_id, name, description, frequency, target) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [data.user_id, data.name, data.description, data.frequency, data.target], callback);
};

exports.getUserHabits = (userId, callback) => {
    const query = `SELECT * FROM habits WHERE user_id = ?`;
    db.query(query, [userId], callback);
};

exports.updateHabit = (id, data, callback) => {
    const query = `UPDATE habits SET name = ?, description = ?, frequency = ?, progress = ?, target = ? WHERE id = ?`;
    db.query(query, [data.name, data.description, data.frequency, data.progress, data.target, id], callback);
};

exports.deleteHabit = (id, callback) => {
    const query = `DELETE FROM habits WHERE id = ?`;
    db.query(query, [id], callback);
};
