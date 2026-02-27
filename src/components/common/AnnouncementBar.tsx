import React from 'react';

const AnnouncementBar: React.FC = () => {
    return (
        <div className="bg-black text-white py-2 text-center text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] relative z-[60]">
            <div className="container overflow-hidden whitespace-nowrap">
                <div className="inline-block animate-scroll-text">
                    Free shipping on orders over ₹1999 • Get 10% off your first order with code: HELLOIKAY • Worldwide shipping available
                </div>
            </div>
        </div>
    );
};

export default AnnouncementBar;
