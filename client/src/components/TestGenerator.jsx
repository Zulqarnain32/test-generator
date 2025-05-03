import { useState, useEffect } from 'react';
import ChapterButtons from './ChapterButton';
import QuestionList from './QuestionList';
import axios from 'axios';

const TestGenerator = () => {
  const [chapter, setChapter] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [chapterName, setChapterName] = useState("");

  useEffect(() => {
    if (chapter) {
      axios.get(`http://localhost:5000/api/questions/chapter/${chapter}`)
        .then((res) => {
          setQuestions(res.data);
          setChapterName(res.data[0].chapterName);
        })
        .catch(() => {
          console.log("error");
        });
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
