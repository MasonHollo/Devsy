import { Association, CreationOptional, DataTypes, Model, Optional } from 'sequelize';

const { Validator } = require('sequelize');

type ReviewAttributes = {
    id: number,
    body: string,
    stars: number,
    userId: number,
    productId: number
    createdAt: Date;
  updatedAt: Date;
};

type ReviewCreationAttributes = Optional<
    ReviewAttributes, 'id'>;

module.exports = (sequelize: any, DataTypes: any) => {

    class Review extends Model<ReviewAttributes, ReviewCreationAttributes> {
        declare id: CreationOptional<number>;
        declare body: string;
        declare stars: number;
        declare userId: number;
        declare productId: number;


        static associate(models: any) {
            Review.belongsTo(models.Product, { foreignKey: 'productId' });
            Review.belongsTo(models.User, { foreignKey: 'userId' });
        }
        // declare public static associations: { [key: string]: Association<Model<any, any>, Model<any, any>>; };

    }
    Review.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            body: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isGoodLength(value: string) {
                        if (value.length < 1 || value.length > 120) {
                            throw new Error('First name must be between 1 - 120 characters');
                        }
                    },
                }
            },
            stars: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                }
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Products',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
        
        },
        {
            sequelize,
            modelName: "Review",
            defaultScope: {
                attributes: {
                    exclude: []
                }
            },
        }
    )
    return Review;
}
