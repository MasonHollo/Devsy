import { Association, CreationOptional, DataTypes, Model, Optional } from 'sequelize';

const { Validator } = require('sequelize');

type ProductImageAttributes = {
    id: number,
    url: string,
    productId: number
    userId: number
};

type ProductImageCreationAttributes = Optional<
    ProductImageAttributes, 'id'>;

module.exports = (sequelize: any, DataTypes: any) => {

    class ProductImage extends Model<ProductImageAttributes, ProductImageCreationAttributes> {
        declare id: CreationOptional<number>;
        declare url: string;
        declare productId: number;
        declare userId: number;


        static associate(models: any) {
                ProductImage.belongsTo(models.Product, { foreignKey: 'productId' });
                ProductImage.belongsTo(models.User, { foreignKey: 'userId' });
        }
        // declare public static associations: { [key: string]: Association<Model<any, any>, Model<any, any>>; };

    }
    ProductImage.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isGoodLength(value: string) {
                        if (value.length < 1 || value.length > 300) {
                            throw new Error('First name must be between 1 - 300 characters');
                        }
                    },
                }
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
               userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
        },
        {
            sequelize,
            modelName: "ProductImage",
            defaultScope: {
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            },
        }
    )
    return ProductImage;
}
