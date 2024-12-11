import { useState, useEffect } from 'react';

export default function Carousel() {
  // Dynamically import all images from the 'images' folder using Vite's import.meta.glob
  const images = import.meta.glob('../assets/images/*.{png,jpg,jpeg,webp}', { eager: true });
  const imagePaths = Object.values(images).map((mod) => mod.default); // Extract the paths

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % imagePaths.length);
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [imagePaths.length]);

  // Handle manual navigation
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % imagePaths.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + imagePaths.length) % imagePaths.length);

  if (imagePaths.length === 0) {
    return <div>No images found in the folder.</div>;
  }

  return (
    <div className="carousel w-full h-[500px] relative overflow-hidden">
      {imagePaths.map((img, index) => (
        <div
          key={index}
          className={`carousel-item relative w-full h-full ${index === currentSlide ? 'block' : 'hidden'}`}
        >
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover" // Cover the container and resize the image
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <button onClick={prevSlide} className="btn btn-circle">❮</button>
            <button onClick={nextSlide} className="btn btn-circle">❯</button>
          </div>
        </div>
      ))}
    </div>
  );
}
