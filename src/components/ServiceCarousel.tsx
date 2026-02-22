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

    const handleNext = () => {
        setItems((prevItems) => {
            const newItems = [...prevItems];
            const firstItem = newItems.shift()!;
            newItems.push(firstItem);
            return newItems;
        });
    };

    const handlePrev = () => {
        setItems((prevItems) => {
            const newItems = [...prevItems];
            const lastItem = newItems.pop()!;
            newItems.unshift(lastItem);
            return newItems;
        });
    };

    return (
        <div className="slider">
            {items.map((item, index) => (
                <div
                    key={`${item.targetId}-${index}`}
                    className="item"
                    style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${item.image})` }}
                >
                    <div className="content">
                        <div className="title">{item.title}</div>
                        <div className="description">{item.description}</div>
                        <button
                            onClick={() => onGetService(item.targetId)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                            Get This Service
                        </button>
                    </div>
                </div>
            ))}

            <div className="buttons">
                <button className="prev" onClick={handlePrev}>
                    <ChevronLeft size={24} />
                </button>
                <button className="next" onClick={handleNext}>
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default ServiceCarousel;
