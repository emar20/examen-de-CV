import { Router } from "express"
const router= Router()
import myProfileData from './data.json' assert { type: 'json' };
router.get('/',async (req, res) => {
const data = await fs.readFile('./data.json', 'utf-8');
res.render('index',myProfileData)
});
router.get('/about', (req, res) => res.render('about',{title:'Sobre Nosotros'}))
router.get('/contact', (req, res) => res.render('contact',{title: 'Contáctanos'}))

export default router