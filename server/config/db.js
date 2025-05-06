const mongoose = require("mongoose")
const questions = require("../data/questionData")
const mcqs = require("../data/mcqsData")
const QuestionModel =  require("../models/Question")
const McqsModel = require("../models/Mcqs")

const dbConnect = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/papersgen")
        .then(async () => {
            console.log("Connected successfully to MongoDB");

            // Remove old questions
            await QuestionModel.deleteMany({});
            console.log("Old questions removed.");

             // Remove old mcqs
             await McqsModel.deleteMany({});
             console.log("Old mcqs removed.");

            // Insert new quwstions
            await QuestionModel.insertMany(mcqs);
            console.log("New questions added to database!");

            // Insert new mcqs
            await McqsModel.insertMany(mcqs);
            console.log("New mcqs added to database!");
        })
        .catch((err) => {
            console.error("MongoDB Connection Error:", err);
        });
};


module.exports = dbConnect;