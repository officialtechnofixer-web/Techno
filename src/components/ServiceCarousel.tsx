import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './carousel.css';

interface ServiceItem {
    title: string;
    description: string;
    image: string;
    targetId: string;
}

interface ServiceCarouselProps {
    services: ServiceItem[];
    onGetService: (targetId: string) => void;
}

const ServiceCarousel: React.FC<ServiceCarouselProps> = ({ services, onGetService }) => {
    const [items, setItems] = useState<ServiceItem[]>(services);
    const [isPaused, setIsPaused] = useState(false);

    const handleNext = React.useCallback(() => {
        setItems((prevItems) => {
            const newItems = [...prevItems];
            const firstItem = newItems.shift()!;
            newItems.push(firstItem);
            return newItems;
        });
    }, []);

    const handlePrev = React.useCallback(() => {
        setItems((prevItems) => {
            const newItems = [...prevItems];
            const lastItem = newItems.pop()!;
            newItems.unshift(lastItem);
            return newItems;
        });
    }, []);

    React.useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            handleNext();
        }, 2000);
        return () => clearInterval(interval);
    }, [isPaused, handleNext]);

    return (
        <div
            className="slider"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
        >
            {items.map((item) => (
                <div
                    key={item.targetId}
                    className="item"
                    style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url(${item.image})` }}
                >
                    <div className="content">
                        <div className="title">{item.title}</div>
                        <div className="description">{item.description}</div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onGetService(item.targetId);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95"
                        >
                            Get This Service
                        </button>
                    </div>
                </div>
            ))}

            <div className="buttons">
                <button className="prev" onClick={(e) => { e.stopPropagation(); handlePrev(); }}>
                    <ChevronLeft size={24} />
                </button>
                <button className="next" onClick={(e) => { e.stopPropagation(); handleNext(); }}>
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default ServiceCarousel;
