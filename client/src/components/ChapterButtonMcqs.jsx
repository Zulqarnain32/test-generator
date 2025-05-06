const ChapterButtonsMcqs = ({ onSelectChapter }) => {
    return (
      <div className="flex justify-center gap-4 flex-wrap">
        {[1, 2, 3].map((ch) => (
          <button
            key={ch}
            onClick={() => onSelectChapter(ch)}
            className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Chapter {ch} 
          </button>
        ))}
      </div>
    );
  };
  
  export default ChapterButtonsMcqs;
  

