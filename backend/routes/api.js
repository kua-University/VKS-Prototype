const express = require('express');
const router = express.Router();
const pool = require('../db/database');
const crypto = require('crypto');

// Helper: Hash phone number
function hashPhone(phone) {
    return crypto.createHash('sha256').update(phone).digest('hex');
}

// GET all problems with their answers
router.get('/problems', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT p.*, 
                   COALESCE(json_agg(a.*) FILTER (WHERE a.id IS NOT NULL), '[]') as answers
            FROM problems p
            LEFT JOIN answers a ON a.problem_id = p.problem_id
            GROUP BY p.id
            ORDER BY p.timestamp DESC
        `);
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST create a new problem
router.post('/problems', async (req, res) => {
    try {
        const { phone, category, text, voiceBase64, timestamp } = req.body;
        const phoneHash = hashPhone(phone || 'anonymous');
        const problemId = `prob_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
        
        const query = `
            INSERT INTO problems (problem_id, user_phone_hash, category, text, voice_base64, timestamp, is_synced)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
        const values = [problemId, phoneHash, category, text || '', voiceBase64 || null, timestamp || Date.now(), false];
        const result = await pool.query(query, values);
        
        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST add an answer to a problem
router.post('/answers', async (req, res) => {
    try {
        const { problemId, phone, text, isChampionVerified, timestamp } = req.body;
        const phoneHash = hashPhone(phone || 'anonymous');
        const answerId = `ans_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
        
        const query = `
            INSERT INTO answers (answer_id, problem_id, user_phone_hash, text, is_champion_verified, timestamp)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const values = [answerId, problemId, phoneHash, text, isChampionVerified || false, timestamp || Date.now()];
        const result = await pool.query(query, values);
        
        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET answers for a specific problem
router.get('/answers/:problemId', async (req, res) => {
    try {
        const { problemId } = req.params;
        const query = `SELECT * FROM answers WHERE problem_id = $1 ORDER BY timestamp DESC`;
        const result = await pool.query(query, [problemId]);
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET unsynced problems (for sync simulation)
router.get('/sync/unsynced', async (req, res) => {
    try {
        const query = `SELECT * FROM problems WHERE is_synced = false`;
        const result = await pool.query(query);
        res.json({ success: true, count: result.rows.length, data: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// PUT mark problems as synced
router.put('/sync/mark-synced', async (req, res) => {
    try {
        const { problemIds } = req.body;
        const query = `UPDATE problems SET is_synced = true WHERE problem_id = ANY($1::text[])`;
        await pool.query(query, [problemIds]);
        res.json({ success: true, message: `${problemIds.length} problems marked as synced` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET statistics
router.get('/stats', async (req, res) => {
    try {
        const problemsCount = await pool.query(`SELECT COUNT(*) FROM problems`);
        const answersCount = await pool.query(`SELECT COUNT(*) FROM answers`);
        res.json({
            success: true,
            data: {
                totalProblems: parseInt(problemsCount.rows[0].count),
                totalAnswers: parseInt(answersCount.rows[0].count)
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
