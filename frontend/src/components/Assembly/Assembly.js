import { useEffect, useState } from 'react';

import { GalacticRepublic } from '@styled-icons/fa-brands/GalacticRepublic';

const Assembly = ({ rowCoord, colCoord, usurper, troops }) => {
    const [switched, setSwitched] = useState(false);
    const [currTroops, setCurrTroops] = useState(troops);

    useEffect(() => {
        const incrementTroops = setInterval(() => {
            if (usurper) setCurrTroops(currTroops + 1);
            setSwitched(switched => !switched);
        }, [1000]);

        return () => clearInterval(incrementTroops);
    }, [switched]);

    return (
        <div
        style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            height: 'fit-content',
            width: '5vw',
            margin: '2vw',
            cursor: !usurper ? 'pointer' : usurper === 'player' && 'pointer'
        }}>
            <GalacticRepublic
            className='spin-assembly'
            style={{
                color: !usurper ? 'rgb(60, 60, 60)' : usurper === 'player' ? 'yellow' : usurper,
                width: '4vw'
            }} />

            <span style={{fontFamily: 'Orbitron', textAlign: 'center', marginTop: '0.1vh', width: '5vw'}}>
                {currTroops}
            </span>
        </div>
    );
};

export default Assembly;