const db = require('../config/database.config.js');
const router = require('express').Router();


router.get('/polls', (req, res) => {
    db.query('SELECT * FROM polls', (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Hiba történt a lekérdezés során."})
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Nincs elérhető szavazás." })
        }

        res.status(200).json(results)
    })
})

router.post('/polls', (req, res) => {
    const title = req.body.title;

    if (!title) {
        return res.status(400).json({ error: "A cím megadása kötelező." })
    }

    db.query('INSERT INTO polls (title) VALUES (?)', [title], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Hiba történt a szavazás létrehozása során.", details: err })
        }
        res.status(201).json(results)
    })
});

router.delete('/polls/:id', (req, res) => {
    const pollId = req.params.id;

    db.query('DELETE FROM polls WHERE id = ?', [pollId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Hiba történt a szavazás törlése során.", details: err })
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "A szavazás nem található." })
        }
        res.status(200).send();
    })
});

router.get('/polls/:id/options', (req, res) => {
    const pollId = req.params.id;

    db.query('SELECT * FROM options WHERE poll_id = ?', [pollId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Hiba történt a választható lehetőségek lekérdezése során.", details: err })
        }
        res.status(200).json(results)
    })
});

router.post('/options', (req, res) => {
    const { poll_id, name } = req.body;

    db.query('INSERT INTO options (poll_id, name) VALUES (?, ?)', [poll_id, name], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Hiba történt a választható lehetőség létrehozása során.", details: err })
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "A választható lehetőség nem található." })
        }
        res.status(201).json(results)
    })
})

router.delete('/options/:id', (req, res) => {
    const optionId = req.params.id;

    db.query('DELETE FROM options WHERE id = ?', [optionId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Hiba történt a választható lehetőség törlése során.", details: err })
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "A választható lehetőség nem található." })
        }
        res.status(201).json(results)
    })
})

router.post('/votes', (req, res) => {
    const { option_id } = req.body;

    db.query('INSERT INTO votes (option_id) VALUES (?)', [option_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Hiba történt a szavazás létrehozása során.", details: err })
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "A szavazás nem található." })
        }   
        res.status(201).json(results)
    })
});

router.get('/polls/:id/stats', (req, res) => {
    const pollId = req.params.id;

    db.query('SELECT option_id, name, vote_count FROM poll_stats WHERE poll_id = ?', [pollId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Hiba történt a statisztikák lekérdezése során.", details: err })
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Nincs elérhető statisztika." })
        }
        res.status(200).json(results)
    })
});

module.exports = router;
