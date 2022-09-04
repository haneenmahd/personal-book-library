/**
 *
 * @param {import("mongoose").Mongoose} mongoose
 * @returns
 */
module.exports = function (mongoose) {
  const schema = mongoose.Schema(
    {
      title: String,
      description: String,
      author: String,
      dueDate: Date,
      doneDate: Date,
      finishedReading: Boolean,
    },
    {
      timestamps: true,
    }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();

    object.id = _id;
    return object;
  });

  const Book = mongoose.model("book", schema);

  return Book;
};
