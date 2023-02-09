const Room = require("../Models/Rooms");
const User = require("../Models/User");

exports.add = (req, res) => {
  const newRoom = new Room(req.body);
  console.log(req.body);
  User.findOneAndUpdate(
    {
      username: req.params.username,
    },
    { $push: { message: "room saved in user" } },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
    }
  );
};

exports.list = (req, res) => {
  Room.find().then((list) => {
    if (!list) {
      res.status(500).json({ message: "no list" });
    } else {
      console.log(list);
      res.status(200).json({ message: "list found", list: list });
    }
  });
};

exports.edit = (req, res) => {
  console.log(req.body);
  Room.findByIdAndUpdate(req.body._id, req.body)
    .then((room) => {
      if (!room) {
        res.status(500).json({ message: "no room" });
      } else {
        res.status(200).json({ message: "room updated", room });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

exports.delete = (req, res) => {
  Room.findByIdAndDelete(req.body._id)
    .then((room) => {
      if (!room) {
        res.status(500).json({ message: "room doesn't exist" });
      } else {
        res.status(200).json({ message: "room deleted" });
      }
    })
    .catch((err) => console.log(err));
};
