const pool = require('../db/database');

class Problem {
    static async create(problem) {
        const query = `
            INSERT INTO problems (problem_id, user_phone_hash, category, text, voice_base64, image_base64, timestamp, is_synced)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
        const values = [
            problem.problem_id,
            problem.user_phone_hash,
            problem.category,
            problem.text,
            problem.voice_base64 || null,
            problem.image_base64 || null,
            problem.timestamp,
            problem.is_synced || false
        ];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async getAll() {
        const query = `
            SELECT p.*, 
                   json_agg(a.*) as answers 
            FROM problems p
            LEFT JOIN answers a ON a.problem_id = p.problem_id
            GROUP BY p.id
            ORDER BY p.timestamp DESC
        `;
        const result = await pool.query(query);
        return result.rows;
    }

    static async getByCategory(category) {
        const query = `SELECT * FROM problems WHERE category = $1 ORDER BY timestamp DESC`;
        const result = await pool.query(query, [category]);
        return result.rows;
    }

    static async updateSyncStatus(problemId, isSynced) {
        const query = `UPDATE problems SET is_synced = $1 WHERE problem_id = $2`;
        await pool.query(query, [isSynced, problemId]);
    }
}

module.exports = Problem;

