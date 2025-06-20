import express, { Request, Response, NextFunction } from 'express';
import db from '../../db/models';
import { requireAuth, restoreUser } from '../../utils/auth';
import { check } from 'express-validator';
import { handleValidationErrors } from '../../utils/validation';
const { Review, User } = db;

const router = require('express').Router();

const validateReview = [
  check('body')
    .exists({ checkFalsy: true })
    .withMessage("body text is required"),
  check('stars')
    .isFloat({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors
]

//Delete a review
router.delete('/:reviewId', requireAuth,async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
  try {
    const { reviewId } = req.params;
    const { user } = req;


    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({
        message: "Review couldn't be found"
      });
    }

    if (review.userId !== user.id) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }


    await review.destroy();

    return res.status(200).json({
      message: "Successfully deleted"
    });

  } catch (error) {
    next(error)
  }
});

// Edit A Review 
router.put('/:reviewId', requireAuth, validateReview, async (req: Request & { user?: any }, res: Response, next: NextFunction) =>{
  try {
    const { reviewId } = req.params;
    const { user } = req;
    const { body, stars } = req.body;


    const reviews = await Review.findByPk(reviewId);

    if (!reviews) {
      return res.status(404).json({
        message: "Review couldn't be found"
      });
    }

    if (reviews.userId !== user.id) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }

    await reviews.update({
      body, stars
    });

      const updatedReview = await Review.findByPk(reviewId, {
      include:   [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });

    return res.status(200).json(updatedReview);

  } catch (error) {
    next(error)
  }
});

export = router;
