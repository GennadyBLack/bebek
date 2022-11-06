module.exports = (sequelize, Sequelize) => {
  const usersFriends = sequelize.define("usersFriends", {
    user_id: Sequelize.BIGINT,
    friend_id: Sequelize.BIGINT,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  });
  return usersFriends;
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
