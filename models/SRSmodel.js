const mongoose = require("mongoose");
const connectToMongo = require('../db');
connectToMongo();

const srsSchema = new mongoose.Schema({
  name: String,
  description: String,
  created: { type: Date, default: Date.now },
  is_completed: { type: Boolean, default: false },
  file_url: String,
});

srsSchema.methods.saveToDb = async function (body) {
    try {
        const srs = new SrsModel(data);
        await srs.save();
        return SrsModel.getById(srs._id);
      } catch (error) {
        throw new Error('Error while saving to database');
      }
};

srsSchema.methods.getById = async function (id) {
    try {
        const srs = await SrsModel.findById(id);
        if (!srs) {
          throw new Error('SRS not found');
        }
        return {
          id: srs._id,
          name: srs.name,
          description: srs.description,
          created: srs.created,
          is_completed: srs.is_completed,
          file_url: srs.file_url
        };
      } catch (error) {
        throw new Error('Error while fetching from database');
      }
};

const SrsModel = mongoose.model("Srs", srsSchema);

module.exports = SrsModel;
