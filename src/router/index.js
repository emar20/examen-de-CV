import { Router } from "express";
import { promises as fs } from 'fs';
import path from 'path';
import pkg from 'pg';
const { Client } = pkg;
const client = new Client({
	user: 'postgres.fcmmckloyhiheojzwlqb',
	password: 'zthgyR2ZfVKJDJZh',
	host: 'aws-0-us-west-1.pooler.supabase.com',
	port: '6543',
	database: 'postgres',
});
const router = Router();

const loadProfileData = async () => {
const jsonPath = path.join(process.cwd(), 'data.json'); 
const data = await fs.readFile(jsonPath, 'utf-8');
    return JSON.parse(data);
};

router.get('/', async (req, res) => {
    await connectDB();
    let result = [];
    try {
        const resp = await client.query('SELECT * FROM profiles');
        if (resp) {
            result = resp.rows;
            console.log(resp.rows)
        }
    } catch (err) {
        console.error('Error executing query:', err);
    } finally {
        await disconnectDB();
    }
    console.log(result);

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
const connectDB = async () => {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL database');
    } catch (err) {
        console.error('Error connecting to PostgreSQL database:', err);
    }
};

const disconnectDB = async () => {
    try {
        await client.end();
        console.log('Connection to PostgreSQL closed');
    } catch (err) {
        console.error('Error closing connection:', err);
    }
};