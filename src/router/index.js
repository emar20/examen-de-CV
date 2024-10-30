import { Router } from "express";
import { promises as fs } from 'fs';
import path from 'path';

const router = Router();

const loadProfileData = async () => {
const jsonPath = path.join(process.cwd(), 'data.json'); 
const data = await fs.readFile(jsonPath, 'utf-8');
    return JSON.parse(data);
};

router.get('/', async (req, res) => {
    try {
        const myProfileData = await loadProfileData();
        res.render('index', myProfileData);
    } catch (err) {
        console.error('Error loading profile data:', err);
        res.status(500).send('Error loading profile data');
    }
});
router.get('/about', (req, res) => res.render('about', { title: 'Sobre Nosotros' }));
router.get('/contact', (req, res) => res.render('contact', { title: 'Contáctanos' }));

export default router;