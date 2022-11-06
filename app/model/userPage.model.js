module.exports = (sequelize, Sequelize) => {
  const userPage = sequelize.define("userPage", {
    user_id: Sequelize.BIGINT,
    post_id: Sequelize.BIGINT,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  });
  return userPage;
};

// To get friends
// module.exports.getFriends = async (req, res) => {
//   try {
//      const user = await db.User.findOne({
//         where: {
//         id: req.user.id,
//         },
//         include: 'friends'
//     })
//     if (!user) throw new Error('User not found!');
//     res.send(user.friends);
//   } catch (error) {
//     res.send(error.message)
//   }
// }
