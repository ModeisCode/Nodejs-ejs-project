import express from 'express'

const router = express.Router();

router.get('/signup' , (req,res) => {
    res.render('../templates/signup.ejs');
});

export default router;
