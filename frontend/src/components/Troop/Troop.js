import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { restorePeace } from '../../store/game';

import { SpaceShip } from '@styled-icons/remix-fill/SpaceShip';

const Troop = ({ xStart, yStart, xDestination, yDestination, index }) => {
    const dispatch = useDispatch();

    const isAttacking = useSelector(state => state.game.isAttacking);

    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (isAttacking) setTimeout(() => { setShouldRender(true) }, [index * 50]);
    }, [isAttacking]);

    useEffect(() => {
        if (shouldRender) {
            const attackTimer = setTimeout(() => {
                dispatch(restorePeace());
                setShouldRender(false);
            }, 1000);

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
            position: 'absolute'
        }}>
            <SpaceShip 
            style={{
                width: '1vw',
                color: 'white',
                rotate: `${xStart + yStart / xDestination + yDestination}deg`,
                zIndex: '1'
            }}/>
        </div>
    );
};

export default Troop;