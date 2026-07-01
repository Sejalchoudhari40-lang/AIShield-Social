import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaCloudUploadAlt } from "react-icons/fa";
import { analyzeComplete } from "../services/api";

function Upload() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
  if (!selectedFile) {
    alert("Please select an image.");
    return;
  }

  if (!caption.trim()) {
    alert("Please enter a caption.");
    return;
  }

  setLoading(true);
  setMessage("");

  try {
    const result = await analyzeComplete(
      selectedFile,
      caption
    );

    setMessage(result.message);

    setTimeout(() => {
      navigate("/analysis");
    }, 1500);

  } catch (error) {
    console.error(error);
    setMessage("Analysis Failed ❌");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-slate-950">

      <Navbar />

      <div className="mx-auto max-w-3xl p-10">

        <h1 className="text-4xl font-bold text-white">
          Upload Content
        </h1>

        <p className="mt-2 text-gray-400">
          Upload an image and write a caption for AI analysis.
        </p>

        <div className="mt-10 rounded-3xl border border-white/10 bg-slate-900 p-8">

          {/* Upload Box */}

          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-cyan-500 p-10">

            <FaCloudUploadAlt className="text-6xl text-cyan-400" />

            <p className="mt-5 text-lg text-gray-300">
              Select Image
            </p>

            <input
              type="file"
              className="mt-5 text-white"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedFile(e.target.files[0]);
                }
              }}
            />

            {selectedFile && (
              <p className="mt-3 text-green-400">
                📷 {selectedFile.name}
              </p>
            )}

          </div>

          {/* Caption */}

          <div className="mt-8">

            <label className="text-white">
              Caption
            </label>

            <textarea
              rows={5}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write something..."
              className="mt-3 w-full rounded-2xl border border-gray-600 bg-slate-800 p-4 text-white outline-none focus:border-cyan-400"
            />

          </div>

          {/* Upload Button */}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-8 w-full rounded-2xl bg-cyan-500 py-4 text-lg font-semibold text-white transition hover:bg-cyan-400 disabled:bg-gray-500"
          >
            {loading ? "Uploading..." : "Analyze with AI 🚀"}
          </button>

          {/* Status Message */}

          {message && (
            <p className="mt-5 text-center text-lg font-semibold text-green-400">
              {message}
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default Upload;