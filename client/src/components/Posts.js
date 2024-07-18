import React, { useState } from "react";

const Posts = ({images}) => {

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const chunks = chunkArray(images, 5);

  return (
    <div className="p-4 grid gap-4 lg:mx-20">
      {chunks.map((chunk, chunkIndex) => (
        <React.Fragment key={chunkIndex}>
          {chunkIndex % 2 === 0 ? (
            <div className="lg:grid lg:grid-cols-2 lg:gap-4 flex flex-col space-y-2">
              {chunk[0] && <ImageCard image={chunk[0]} />}
              <div className="lg:grid lg:grid-cols-2 lg:gap-4 flex flex-col space-y-2">
                {chunk.slice(1).map((image, index) => (
                  <ImageCard key={index} image={image} />
                ))}
              </div>
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-2 lg:gap-4 flex flex-col space-y-2">
              <div className="lg:grid lg:grid-cols-2 lg:gap-4 flex flex-col space-y-2">
                {chunk.slice(0, 4).map((image, index) => (
                  <ImageCard key={index} image={image} />
                ))}
              </div>
              {chunk[4] && <ImageCard image={chunk[4]} />}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const ImageCard = ({ image, large }) => {
  const [imagesrc,setimagesrc] = useState(image.pict);
  if (!image) return null; 

  const handleErr = () =>{
    setimagesrc('https://designerapp.officeapps.live.com/designerapp/document.ashx?path=/a60df146-40cc-4376-aecc-b09e6cdf5845/DallEGeneratedImages/dalle-cf29c5cf-c311-4646-b441-4ddb843be5240251681044713984605900.jpg&dcHint=IndiaCentral&fileToken=cdccd361-fc2a-4075-8c04-e897629d06b9')
  }
  return (
    <div
      className={`relative overflow-hidden ${
        large ? "col-span-2 row-span-2" : ""
      }`}
    >
      <img
        src={imagesrc}
        alt={""}
        className="w-full h-full object-cover transform rounded-3xl transition duration-500 hover:scale-110 hover:blur-sm"
        onError={handleErr}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition duration-500">
        {image.avatar ? (
          <img
            src={image.avatar}
            alt={""}
            className="w-16 h-16 rounded-full mb-2"
          />
        ) : (
          ""
        )}
        <h2 className="text-white text-xl">{image.author}</h2>
        <p className="text-white text-center">{image.prompt}</p>
      </div>
    </div>
  );
};

export default Posts;
