import express, { Request, Response, NextFunction } from 'express';
import db from '../../db/models';
import { restoreUser } from '../../utils/auth';
import { check } from 'express-validator';
import { handleValidationErrors } from '../../utils/validation';
const { Product, ProductImage } = db;

const router = require('express').Router();
 
const validateProduct = [
    check('name')
        .isLength({ min: 2 })
        .withMessage('Name must be more than 1 character.'),
    check('description')
        .isLength({ min: 4 })
        .withMessage('Please provide a description with at least 4 characters.'),
    check('price')
        .isFloat({ min: 0 })
        .withMessage('Price must be a postive number.'),
    handleValidationErrors
];


//Get all Products
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.findAll({
            include: [
                {
                    model: ProductImage,
                    as: 'ProductImages',
                    attributes: ['id', 'url'],
                }
            ]
        });

        res.status(200).json({ products });
    } catch (error) {
        next(error);
    }
});


//Create a Product
router.post('/', validateProduct, async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    try {
        const { name, description, price } = req.body;

        const newProduct = await db.Product.create({
            name,
            description,
            price,
            userId: req.user.id
        });

        return res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
});

//Edit a Product
router.put('/:id', validateProduct, async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.id;
        const userId = req.user?.id;
        const { name, description, price } = req.body;

        if (!userId) {
            return res.status(401).json({ message: 'You must be logged in' });
        }


        const product = await db.Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }


        if (product.userId !== userId) {
            return res.status(403).json({ message: 'You do not have permission to edit this product' });
        }

        if (name !== undefined) product.name = name;
        if (description !== undefined) product.description = description;
        if (price !== undefined) product.price = price;

        await product.save();

        return res.json(product);
    } catch (error) {
        next(error);
    }
});


//Delete a product
router.delete('/:id', async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.id;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized: You must be logged in' });
        }

        const product = await db.Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.userId !== userId) {
            return res.status(403).json({ message: 'You do not have permission to delete this product' });
        }

        await product.destroy();

        return res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        next(error);
    }
});



export = router;
