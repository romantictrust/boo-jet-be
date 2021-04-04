export const user_get = (req, res) => {
  const {
    payload: { id },
  } = req;

  return Users.findById(id).then((user) => {
    if (!user) {
      return res.sendStatus(400).json({
        error: "User not found",
      });
    }

    return res.json({ user: user.toAuthJSON() });
  });
};

export const user_post = (req, res) => {
  const { id, materials, balance, orders } = req.body;
  return Users.findByIdAndUpdate(id, {
    $set: { materials, balance, orders },
  }).exec((err, user) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      res.status(200).send(user);
    }
  });
};
