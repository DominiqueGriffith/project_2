module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("books", {
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

    });
    Post.associate = function (models) {
        // We're saying that a Post should belong to a user
        // A Post can't be created without an user due to the foreign key constraint
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Post;
};