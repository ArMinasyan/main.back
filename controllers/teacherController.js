const Teacher = require('../models/Teacher');

const getTeachers = async (req, res) => {
    try {
        const results = await Teacher.getAllTeachers();
        return res.status(200).json({results});
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

};


module.exports = {
    getTeachers
};
