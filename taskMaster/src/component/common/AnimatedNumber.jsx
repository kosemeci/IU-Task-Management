import React, { useState, useEffect } from 'react';

const AnimatedNumber = ({ target }) => {
    const [currentNumber, setCurrentNumber] = useState(0);

    useEffect(() => {
        let startTime;
        const duration = 1000; // 1 saniye
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const increment = (progress / duration) * target;

            if (progress < duration) {
                setCurrentNumber(Math.min(increment, target));
                requestAnimationFrame(animate);
            } else {
                setCurrentNumber(target);
            }
        };

        requestAnimationFrame(animate);

        return () => {
            // Temizleme işlemi gerekmez, çünkü animation frame doğal olarak durur
        };
    }, [target]);

    return <div>{Math.round(currentNumber)}</div>;
};

export default AnimatedNumber;
