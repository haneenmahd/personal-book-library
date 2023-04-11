const { books: Book } = require("../models");
const { writeDebugLogs } = require("../../utils/writeDebugLogs");

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.create = (req, res) => {
  const { title, description, author, dueDate } = req.body;

  const book = new Book({
    title: title,
    description: description,
    author: author,
    dueDate: dueDate,
    doneDate: undefined,
    finishedReading: false,
  });

  book
    .save()
    .then((data) => {
      res.status(200).send({
        id: data.id,
        message: `Created book "${data.title}" successfully`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some internal error occured while creating the book.",
      });

      writeDebugLogs(err);
    });
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.delete = (req, res) => {
  const { id } = req.body;

  Book.findByIdAndDelete(id)
    .then((data) => {
      if (!data)
        res.status(403).send({
          message: `No data found related with id: ${id}`,
        });
      else
        res.status(200).send({
          message: `Successfully deleted data with id ${id}`,
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "An internal error occured",
      });

      writeDebugLogs(err);
    });
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.edit = (req, res) => {
  const { id, editData } = req.body;
  const { title, description, author, dueDate } = editData;

  Book.findByIdAndUpdate(id, {
    title,
    description,
    author,
    dueDate,
  })
    .then((err, data) => {
      if (err)
        res.status(403).send({
          message: `No data found related with id: ${data.id}`,
        });
      else
        res.status(200).send({
          message: `Successfully edit data with id ${data.id}`,
          updatedData: editData,
        });
    })
    .catch(() => {
      res.status(500).send({
        message: "An internal error occured",
      });

      writeDebugLogs(err);
    });
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.getAllBooks = (_, res) => {
  Book.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: "An internal error occured while fetching books.",
      });
    });
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.deleteAll = (req, res) => {
  Book.deleteMany({})
    .then((data) => {
      if (!data) {
        res.status(403).send({
          message: "Failed to delete all contents from the books",
        });
      }
    })
    .catch((err) => {});
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.searchForBook = (req, res) => {
  const { title } = req.query;

  Book.find({
    title: {
      $regex: new RegExp(title, "i"),
    },
  })
    .then((data) => {
      if (!data) {
        res.status(403).send({
          message: `Cannot find book with title: ${title}`,
        });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "An internal error occured while searching for the book.",
      });

      writeDebugLogs(err);
    });
};
