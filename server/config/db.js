const mongoose = require("mongoose")
const questions = require("../data/questionData")
const QuestionModel =  require("../models/Question")

const dbConnect = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/papersgen")
        .then(async () => {
            console.log("Connected successfully to MongoDB");

            const existingQuestions = await QuestionModel.countDocuments();
            if (existingQuestions === 0) {
                await QuestionModel.insertMany(questions);
                console.log("Questions added to database!");
            } else {
                console.log("Questions already exist, skipping insertion.");
            }
            
        })

        .catch((err) => {
            console.error("MongoDB Connection Error:", err);
        });
};

module.exports = dbConnect;