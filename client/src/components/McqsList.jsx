import { useState, useEffect, useContext } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { AuthContext } from "../global/AuthContext";
import { FadeLoader } from "react-spinners";
import { toast } from "react-toastify";
const McqsList = ({ questions }) => {
  console.log("mcqs list ", questions);
  const [selected, setSelected] = useState({});
  const [showTest, setShowTest] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (questions && questions.length > 0) {
      setLoading(false);
    }
  }, [questions]);

  const handleSelect = (question) => {
    setSelected((prev) => {
      const updated = { ...prev };
      if (updated[question._id]) {
        delete updated[question._id];
      } else {
        updated[question._id] = question;
      }
      return updated;
    });
  };

  const downloadAsPDF = async () => {
    toast.success("PDF has been downloaded");
    const input = document.getElementById("pdf-content");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("test.pdf");
  };

  const selectedQuestions = Object.values(selected);

  // Show loader while questions are loading
  if (loading) {
    return (
      <div className="flex justify-center items-start h-screen">
        <FadeLoader color="#3B82F6" />
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Question List */}
      <div className="space-y-3 mt-6">
        <h3 className="font-bold text-xl mb-2"> Questions</h3>
        {questions.map((q) => (
          <div
            key={q._id}
            onClick={() => handleSelect(q)}
            className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
              selected[q._id] ? "bg-blue-100 border-blue-500" : "bg-white"
            }`}
          >
            <input
              type="checkbox"
              checked={!!selected[q._id]}
              onChange={() => handleSelect(q)}
              onClick={(e) => e.stopPropagation()}
              className="mt-1 accent-blue-500"
            />
            <p className="text-gray-800">{q.question}</p>
          </div>
        ))}
      </div>

      {/* Generate Test Button */}
      {selectedQuestions.length > 0 && !showTest && (
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setShowTest(true), toast.success("Test has been generated");
            }}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Generate Test
          </button>
        </div>
      )}

      {/* Generated Test View */}
      {showTest && (
        <>
          <div
            id="pdf-content"
            className="mt-8 p-6 max-w-3xl mx-auto border rounded-xl bg-white shadow-md"
          >
            <h3 className="font-bold text-xl mb-4 text-center capitalize"> {user?.school}</h3>

            {selectedQuestions && (
              <>
                <ol className="list-decimal pl-6 space-y-4">
                  {selectedQuestions.map((q, index) => (
                    <li key={q._id}>
                      <p className="font-medium">{q.question}</p>
                      {q.options && (
                        <ul className="list-[upper-alpha] pl-6 mt-1 space-y-1 flex flex-wrap gap-x-4">
                          {q.options.map((opt, i) => (
                            <li key={i} className="w-[48%]">
                              {opt}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>
        </>
      )}

      {/* Download PDF Button */}
      {showTest && (
        <div className="flex justify-center mt-4">
          <button
            onClick={downloadAsPDF}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default McqsList;
