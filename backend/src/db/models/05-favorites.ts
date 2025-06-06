import { Association, CreationOptional, DataTypes, Model, Optional } from 'sequelize';

const { Validator } = require('sequelize');

type FavoritesAttributes = {
    id: number,
    productId: number,
    userId: number
};

type FavoritesCreationAttributes = Optional<
    FavoritesAttributes, 'id'>;

module.exports = (sequelize: any, DataTypes: any) => {

    class Favorite extends Model<FavoritesAttributes, FavoritesCreationAttributes> {
        declare id: CreationOptional<number>;
        declare url: string;
        declare productId: number;
        declare userId: number;


        static associate(models: any) {
                Favorite.belongsTo(models.Product, { foreignKey: 'productId' });
                Favorite.belongsTo(models.User, { foreignKey: 'userId' });
        }
        // declare public static associations: { [key: string]: Association<Model<any, any>, Model<any, any>>; };

    }
    Favorite.init(
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
            modelName: "Favorite",
            defaultScope: {
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            },
        }
    )
    return Favorite;
}
