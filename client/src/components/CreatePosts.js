import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePosts = () => {
  const [formData, setFormData] = useState({
    author: "",
    avatar: "",
    prompt: "",
  });

  const nav = useNavigate();

  const [generatedImage, setGeneratedImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateImage = async () => {
    setImageError(false);
    setLoading(true);
    const response = await fetch("https://arti-mages.vercel.app/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: formData.prompt,
      }),
    });
    console.log(response);
    const data = await response.json();
    setGeneratedImage(data.output[0]);
    setLoading(false);
  };

  const handlePublish = async () => {
    setLoading(true); // Set loading state
    const response = await fetch("https://arti-mages.vercel.app/api/posts/CreatePost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: formData.author,
        avatar: formData.avatar,
        prompt: formData.prompt,
        pict: generatedImage,
      }),
    });
    const data = await response.json();
    setLoading(false);
    if (data.success === true) {
      nav("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex-col space-y-10">
      <div>
        <h1 className="pt-10 text-4xl font-extrabold text-center">
          Generate/Publish the Image
        </h1>
        <h1 className="pb-10 pt-5 text-xl text-center text-violet-400 font-semibold">
          - Write your prompt according to the image you want to generate -
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-3/4 lg:grid lg:grid-cols-2 lg:gap-8 flex flex-col my-2 space-y-4">
          <div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Author Avatar URL
                </label>
                <input
                  type="text"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Prompt</label>
                <textarea
                  name="prompt"
                  value={formData.prompt}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded h-64 text-center"
                  placeholder="Write prompt to generate an image"
                />
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={handleGenerateImage}
                  className="bg-blue-500 p-2 rounded hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? "Generating..." : "Generate Image"}
                </button>
                <button
                  type="button"
                  onClick={handlePublish}
                  className="bg-green-500 p-2 rounded hover:bg-green-600"
                  disabled={loading}
                >
                  {loading ? "Publishing..." : "Publish"}
                </button>
              </div>
            </form>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full h-[30rem] border-4 border-dotted border-white flex items-center justify-center">
              {loading ? (
                <div className="text-center">
                  <div className="loader"></div> <p>Loading...</p>
                </div>
              ) : generatedImage ? (
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="max-h-full"
                  onError={() => setImageError(true)}
                />
              ) : (
                <span>No image to show</span>
              )}
              {imageError && <span>Failed to load image</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePosts;
