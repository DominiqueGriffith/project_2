module.exports = function (sequelize, DataTypes) {
    var Books = sequelize.define("Books", {
        bookId: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        BookName: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        Comment: {
            type: DataTypes.TEXT,
            allowNull: true,
            len: [1]
        },
        vote: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }

    });
    Books.associate = function (models) {
        // We're saying that a Post should belong to a user
        // A Post can't be created without an user due to the foreign key constraint
        Books.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Books;
};