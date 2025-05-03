const ChapterButtons = ({ onSelectChapter }) => {
    return (
      <div className="flex justify-center gap-4 flex-wrap">
        {[1, 2, 3, 4, 5].map((ch) => (
          <button
            key={ch}
            onClick={() => onSelectChapter(ch)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Chapter {ch} 
          </button>
        ))}
      </div>
    );
  };
  
  export default ChapterButtons;
  