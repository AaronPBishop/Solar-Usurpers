import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { setAssemblies, setTarget } from '../../store/game';

import { GalacticRepublic } from '@styled-icons/fa-brands/GalacticRepublic';

const Assembly = ({ rowCoord, colCoord, usurper, troops }) => {
    const dispatch = useDispatch();

    const gameState = useSelector(state => state.game);
    
    const [clicked, setClicked] = useState(false);

    const [switched, setSwitched] = useState(false);
    const [currTroops, setCurrTroops] = useState(troops);

    useEffect(() => {
        const incrementTroops = setInterval(() => {
            if (usurper) setCurrTroops(currTroops + 1);
            setSwitched(switched => !switched);
        }, [1000]);

        return () => clearInterval(incrementTroops);
    }, [switched]);

    useEffect(() => {
        if (usurper === 'player') {
            if (!gameState.selectedAssemblies.length) {
                setClicked(false);
                return;
            };
            
            for (let coord of gameState.selectedAssemblies) {
                const [row, col] = coord;

                if (row === rowCoord && col === colCoord) setClicked(true);
                if (row !== rowCoord || col !== colCoord) setClicked(false);
            };
        };
    }, [gameState.selectedAssemblies]);

    useEffect(() => {
        if (usurper !== 'player') {
            if (gameState.selectedTarget[0] === rowCoord && gameState.selectedTarget[1] === colCoord) setClicked(true);
            if (gameState.selectedTarget[0] !== rowCoord || gameState.selectedTarget[1] !== colCoord) setClicked(false);
        };
    }, [gameState.selectedTarget]);

    return (
        <div
        onClick={() => {
            if (usurper === 'player') {
                dispatch(setAssemblies({ row: rowCoord, col: colCoord }));
                return;
            };

            dispatch(setTarget({ row: rowCoord, col: colCoord }))
        }}
        style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            height: 'fit-content',
            width: '5vw',
            margin: '2vw',
            cursor: 'pointer'
        }}>
            <GalacticRepublic
            className='spin-assembly'
            style={{
                color: !usurper ? 'rgb(60, 60, 60)' : usurper === 'player' ? 'yellow' : usurper,
                width: '4vw',
                boxShadow: clicked && '0px 0px 10px 2px yellow',
                borderRadius: '100vw'
            }} />

            <span style={{fontFamily: 'Orbitron', textAlign: 'center', marginTop: '0.1vh', width: '5vw'}}>
                {currTroops}
            </span>
        </div>
    );
};

export default Assembly;