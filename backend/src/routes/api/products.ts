import express, { Request, Response, NextFunction } from 'express';
import db from '../../db/models';
import { requireAuth, restoreUser } from '../../utils/auth';
import { check } from 'express-validator';
import { handleValidationErrors } from '../../utils/validation';
const { Product, ProductImage, Review, User } = db;

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

const validateReview = [
  check('body')
    .exists({ checkFalsy: true })
    .withMessage("body text is required"),
  check('stars')
    .isFloat({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors
]

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
        const product = await db.Product.findByPk(productId);
        if (!userId) {
            return res.status(401).json({ message: 'You must be logged in' });
        }
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
        const product = await db.Product.findByPk(productId);
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized: You must be logged in' });
        }
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

//CREATE A REVIEW FOR A PRODUCT BASED ON PRODUCTID
router.post('/:productId/reviews', requireAuth, validateReview, async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    const { body, stars } = req.body;

    const product = await Product.findByPk(productId)
    if (!product) {
      return res.status(404).json({
        message: "product couldn't be found"
      });
    }
    const reviews = await Review.findOne({
      where: {
        userId: req.user.id,
        productId: product.id
      }
    });
    if (reviews) {
      return res.status(500).json({
        message: "User already has a review for this spot"
      });
    }
    const newReview = await Review.create({
      userId: req.user.id,
      productId,
      body,
      stars
    });
    const reviewWithUser = await Review.findOne({
      where: { id: newReview.id },
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName'],
        },
      ],
    });
    return res.status(201).json(reviewWithUser);
  } catch (error) {
      next(error);
  }
});

//GET ALL REVIEWS BY A SPOTS ID
router.get('/:id/reviews', async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
  try {
    const { id: productId } = req.params;
    const product = await Product.findByPk(productId)
    if (!product) {
      return res.status(404).json({
        message: "Product couldn't be found"
      });
    }
    const reviews = await Review.findAll({
      where: { productId },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });
    return res.status(200).json({ Reviews: reviews });
  } catch (error) {
    next(error);
  }
});


export = router;
