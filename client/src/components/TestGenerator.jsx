import { useState, useEffect } from 'react';
import ChapterButtons from './ChapterButton';
import QuestionList from './QuestionList';
import axios from 'axios';
import { BarLoader } from "react-spinners";

const TestGenerator = () => {
  const [chapter, setChapter] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [chapterName, setChapterName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    if (chapter) {
      // axios.get(`http://localhost:5000/api/questions/chapter/${chapter}`)
      axios.get(`https://test-generator.vercel.app/api/questions/chapter/${chapter}`)
        .then((res) => {
          setQuestions(res.data);
          setChapterName(res.data[0].chapterName);
        })
        .catch(() => {
          console.log("error");
        }) 
        .finally(() => {
          setLoading(false)
        })
    }
  }, [chapter]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Computer Science Test Generator</h1>
      <ChapterButtons onSelectChapter={setChapter} />
      {chapter && (
        <div>
          <h2 className="text-xl font-semibold mt-6 mb-2">
            Chapter {chapter} {chapterName}:
          </h2>
          <QuestionList questions={questions} />
        </div>
      )}
    </div>
  );
};

export default TestGenerator;
