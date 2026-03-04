import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type ImageCarouselProps = {
    images: string[]
    altText: string
}

export default function ImageCarousel({ images, altText }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    // Avoid rendering controls if there's only 1 image or none
    if (!images || images.length === 0) {
        return <div className="h-full w-full bg-forest-100 flex items-center justify-center text-forest-500">No Image Available</div>
    }

    if (images.length === 1) {
        return (
            <img
                src={images[0]}
                alt={altText}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
        )
    }

    const slideVariants = {
        enter: (direction: number) => {
            return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0
            };
        },
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => {
            return {
                zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 0
            };
        }
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        // Wrap around logic
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = images.length - 1;
            if (nextIndex >= images.length) nextIndex = 0;
            return nextIndex;
        });
    };

    return (
        <div className="relative h-full w-full overflow-hidden bg-forest-100 group/carousel">
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`${altText} - image ${currentIndex + 1}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(_e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1);
                        }
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </AnimatePresence>

            {/* Navigation Controls - Only show on hover of the carousel constraints */}
            <div
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 z-10"
                onClick={(e) => e.stopPropagation()} // Prevent card accordion from opening
            >
                <button
                    className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm text-forest-800 flex items-center justify-center shadow-sm hover:bg-white hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-forest-400"
                    onClick={() => paginate(-1)}
                    aria-label="Previous image"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>

                <button
                    className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm text-forest-800 flex items-center justify-center shadow-sm hover:bg-white hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-forest-400"
                    onClick={() => paginate(1)}
                    aria-label="Next image"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>

            {/* Pagination Dots */}
            <div
                className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10"
                onClick={(e) => e.stopPropagation()}
            >
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setDirection(index > currentIndex ? 1 : -1)
                            setCurrentIndex(index)
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
                            ? 'w-4 bg-white'
                            : 'w-1.5 bg-white/50 hover:bg-white/75'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
