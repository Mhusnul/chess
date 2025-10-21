import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useAnimation,
  useMotionValue,
} from "framer-motion";

const IMGS = [
  "https://ik.imagekit.io/dziths/Dziths%20Chess%20Class/1.jpeg",
  "https://ik.imagekit.io/dziths/Dziths%20Chess%20Class/2.jpeg",
  "https://ik.imagekit.io/dziths/Dziths%20Chess%20Class/3.jpeg",
  "https://ik.imagekit.io/dziths/Dziths%20Chess%20Class/4.jpeg",
  "https://ik.imagekit.io/dziths/Dziths%20Chess%20Class/5.jpeg",
  "https://ik.imagekit.io/dziths/Dziths%20Chess%20Class/6.jpeg",
  "https://ik.imagekit.io/dziths/Dziths%20Chess%20Class/7.jpeg",
];

const RollingGallery = ({
  autoplay = false,
  pauseOnHover = false,
  images = [],
}) => {
  images = images.length > 0 ? images : IMGS;

  const [isScreenSizeSm, setIsScreenSizeSm] = useState(
    window.innerWidth <= 640
  );
  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mengurangi jumlah gambar menjadi 4 saja
  const displayedImages = images.slice(0, 6);

  // Memperbesar ukuran silinder dan jarak
  const cylinderWidth = isScreenSizeSm ? 1200 : 1800;
  const faceCount = displayedImages.length;
  const faceWidth = (cylinderWidth / faceCount) * 2.2; // Memperbesar faktor pengali untuk jarak lebih jauh
  const radius = cylinderWidth / (2 * Math.PI);

  const dragFactor = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const transform = useTransform(
    rotation,
    (val) => `rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = (startAngle) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 25, // Memperlambat rotasi
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
  }, [autoplay]);

  const handleUpdate = (latest) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_, info) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);

    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };
  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  return (
    <div className="relative h-[300px] w-full overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full w-[48px] z-10"
        style={{
          background:
            "linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)",
        }}
      />
      <div
        className="absolute top-0 right-0 h-full w-[48px] z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      <div className="flex h-full items-center justify-center [perspective:2000px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {displayedImages.map((url, i) => (
            <div
              key={i}
              className="group absolute flex h-fit items-center justify-center [backface-visibility:hidden]"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  (360 / faceCount) * i
                }deg) translateZ(${radius}px)`,
              }}
            >
              <div className="relative w-[300px] mx-8">
                {" "}
                {/* Memperbesar width dan margin */}
                <div className="relative h-[200px] overflow-hidden rounded-xl bg-black/30 backdrop-blur-md">
                  <img
                    src={url}
                    alt="gallery"
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                  {/* Overlay untuk efek gelap */}
                  <div className="absolute inset-0 bg-black/40"></div>
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-bold">Chess Training</h3>
                    <p className="text-sm">Professional chess course</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;
