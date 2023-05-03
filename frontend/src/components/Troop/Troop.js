import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { GalacticRepublic } from '@styled-icons/fa-brands/GalacticRepublic';

const Troop = ({ color, xStart, yStart, xDestination, yDestination, index }) => {
    const isAttacking = useSelector(state => state.game.isAttacking);

    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => { if (isAttacking) setTimeout(() => { setShouldRender(true) }, [index * 150]) }, [isAttacking]);

    if (!shouldRender) return null;
    if (shouldRender) return (
        <div
        className={`troop${shouldRender ? ' animate' : null}`}
        onAnimationEnd={() => {if (shouldRender) setShouldRender(false)}}
        style={{
            display: shouldRender ? 'block' : 'none',
            transform: `translate(${xDestination - xStart}px, ${yDestination - yStart}px)`,
            '--destination-x': `${xDestination - xStart}px`,
            '--destination-y': `${yDestination - yStart}px`,
            transition: 'transform 0.2s',
            position: 'absolute',
            zIndex: '10'
        }}>
            <GalacticRepublic 
            className='spin-troop'
            style={{
                width: '2vw',
                color: `${color}`,
                rotate: `${xStart + yStart / xDestination + yDestination}deg`
            }}/>
        </div>
    );
};

export default Troop;