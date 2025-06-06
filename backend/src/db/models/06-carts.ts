import { Association, CreationOptional, DataTypes, Model, Optional } from 'sequelize';

const { Validator } = require('sequelize');

type CartAttributes = {
    id: number,
    productId: number
    userId: number
};

type CartCreationAttributes = Optional<
    CartAttributes, 'id'>;

module.exports = (sequelize: any, DataTypes: any) => {

    class Cart extends Model<CartAttributes, CartCreationAttributes> {
        declare id: CreationOptional<number>;
        declare productId: number;
        declare userId: number;


        static associate(models: any) {
                Cart.belongsTo(models.Product, { foreignKey: 'productId' });
                Cart.belongsTo(models.User, { foreignKey: 'userId' });
        }
        // declare public static associations: { [key: string]: Association<Model<any, any>, Model<any, any>>; };

    }
        Cart.init(
        {
              id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
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
            modelName: "Cart",
            defaultScope: {
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            },
        }
    )
    return Cart;
}
