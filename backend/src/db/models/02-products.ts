import { Association, CreationOptional, DataTypes, Model, Optional } from 'sequelize';

const { Validator } = require('sequelize');

type ProductAttributes = {
    id: number,
    name: string,
    description: string,
    userId: number,
    price: number
};

type ProductCreationAttributes = Optional<
    ProductAttributes, 'id'>;

module.exports = (sequelize: any, DataTypes: any) => {

    class Product extends Model<ProductAttributes, ProductCreationAttributes> {
        declare id: CreationOptional<number>;
        declare name: string;
        declare description: string;
        declare userId: number;
        declare price: number;



        async getSafeUser() {
            const safeUser = {
                id: this.id,
                name: this.name,
                description: this.description,
                userId: this.userId,
                price: this.price,
            };
            return safeUser
        }

        static associate(models: any) {
                Product.belongsTo(models.User, { foreignKey: 'userId' });
               Product.hasMany(models.ProductImage, { foreignKey: 'productId', as: 'ProductImages'});
        }
        // declare public static associations: { [key: string]: Association<Model<any, any>, Model<any, any>>; };

    }
    Product.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isGoodLength(value: string) {
                        if (value.length < 1 || value.length > 30) {
                            throw new Error('First name must be between 1 - 30 characters');
                        }
                    },
                }
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isGoodLength(value: string) {
                        if (value.length < 1 || value.length > 30) {
                            throw new Error('Last name must be between 1 - 30 characters');
                        }
                    },
                }
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {},
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                }
            },
        },
        {
            sequelize,
            modelName: "Product",
            defaultScope: {
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            },
        }
    )
    return Product;
}
