import mongoose from "mongoose";
export const currencies_get = (req, res) => {
    mongoose.connection.db.collection("currencies", function (err, collection) {
      collection
        .find({})
        .toArray()
        .then((currencies) => {
          res.json(currencies);
        })
        .catch(() => res.json({ error: "Cannot get currencies" }));
    });
};
