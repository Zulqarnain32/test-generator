import { useState, useEffect } from 'react';
import ChapterButtonsMcqs from './ChapterButtonMcqs';
import axios from 'axios';
import McqsList from './McqsList';

const McqsGenerator = () => {
  const [chapter, setChapter] = useState(null);
  const [mcqs, setMcqs] = useState([]);
  const [chapterName, setChapterName] = useState("");


  useEffect(() => {
    if (chapter) {
      // axios.get(`http://localhost:5000/api/mcqs/chapter/${chapter}`)
      axios.get(`https://test-generator.vercel.app/api/mcqs/chapter/${chapter}`)
       
        .then((res) => {
          setMcqs(res.data);
          setChapterName(res.data[0].chapterName);
        })
        .catch((err) => {
          console.log("error",err);
        }) 
      
    }
  }, [chapter]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Computer Science Mcqs Test Generator</h1>
      <ChapterButtonsMcqs onSelectChapter={setChapter} />
      {chapter && (
        <div>
          <h2 className="text-xl font-semibold mt-6 mb-2">
            Chapter {chapter} {chapterName}:
          </h2>
          <McqsList questions={mcqs} />
        </div>
      )}
    </div>
  );
};

export default McqsGenerator;
