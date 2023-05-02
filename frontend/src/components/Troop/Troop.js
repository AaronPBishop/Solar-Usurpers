import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { restorePeace } from '../../store/game';

import { GalacticRepublic } from '@styled-icons/fa-brands/GalacticRepublic';

const Troop = ({ color, xStart, yStart, xDestination, yDestination, index }) => {
    const dispatch = useDispatch();

    const isAttacking = useSelector(state => state.game.isAttacking);

    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (isAttacking) setTimeout(() => { setShouldRender(true) }, [index * 150]);
    }, [isAttacking]);

    useEffect(() => {
        if (shouldRender) {
            const attackTimer = setTimeout(() => {
                dispatch(restorePeace());
                setShouldRender(false);
            }, 20000);

            return () => clearTimeout(attackTimer);
        };
    }, [shouldRender]);

    if (!shouldRender) return null;
    if (shouldRender) return (
        <div
        className={`troop${shouldRender ? ' animate' : null}`}
        style={{
            display: shouldRender ? 'block' : 'none',
            transform: `translate(${xDestination - xStart}px, ${yDestination - yStart}px)`,
            '--destination-x': `${xDestination - xStart}px`,
            '--destination-y': `${yDestination - yStart}px`,
            transition: 'transform 0.5s',
            position: 'absolute',
            zIndex: '10'
        }}>
            <GalacticRepublic 
            style={{
                width: '2vw',
                color: `${color}`,
                rotate: `${xStart + yStart / xDestination + yDestination}deg`
            }}/>
        </div>
    );
};

export default Troop;