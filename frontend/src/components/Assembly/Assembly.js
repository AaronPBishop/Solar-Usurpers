import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';

import { setPosition, incrementTroops, setAssemblies, setTarget } from '../../store/game';

import TroopSpan from './TroopSpan';
import Troop from '../Troop/Troop';

import { GalacticRepublic } from '@styled-icons/fa-brands/GalacticRepublic';

const Assembly = ({ rowCoord, colCoord, usurper, troops, attackData, randKey }) => {
    const ref = useRef(null);
    const dispatch = useDispatch();

    const gameState = useSelector(state => state.game);

    const [positionState, setPositionState] = useState({ x: null, y: null });
    
    const [clicked, setClicked] = useState(false);

    const [switched, setSwitched] = useState(false);
    const [prevTroops, setPrevTroops] = useState(false);
    const [currTroops, setCurrTroops] = useState(troops);

    useEffect(() => {
        if (ref.current) {
            const { x, y } = ref.current.getBoundingClientRect();
            
            dispatch(setPosition({ row: rowCoord, col: colCoord }, {x, y}));
            setPositionState({ x, y });
        };
    }, []);

    useEffect(() => {
        const troopTimer = setInterval(() => {
            if (usurper && currTroops < 50) dispatch(incrementTroops({ row: rowCoord, col: colCoord }));

            setSwitched(switched => !switched);
        }, [1000]);

        return () => clearInterval(troopTimer);
    }, [switched]);

    useEffect(() => {
        for (let i = 0; i < gameState.board.length; i++) {
            for (let j = 0; j < gameState.board[i].length; j++) {
                if (i === rowCoord && j === colCoord) {
                    setPrevTroops(currTroops);

                    setCurrTroops(gameState.board[i][j].troops);
                };
            };
        };
    }, [gameState.board]);

    useEffect(() => {
        if (usurper === 'player') {
            const isSelected = gameState.selectedAssemblies.some(coord => coord[0] === rowCoord && coord[1] === colCoord);
            
            if (isSelected) {
                setClicked(true);
                return;
            };

            setClicked(false);
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
        key={randKey}
        ref={ref}
        onClick={() => {
            if (usurper === 'player') {
                dispatch(setAssemblies({ row: rowCoord, col: colCoord }));
                return;
            };

            dispatch(setTarget({ row: rowCoord, col: colCoord }));
        }}
        style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            backgroundColor: 'black',
            borderRadius: '100vw',
            height: 'fit-content',
            width: '4.5vw',
            margin: '3vw',
            cursor: 'pointer',
            zIndex: '1000'
        }}>
            <GalacticRepublic
            className='spin-assembly'
            style={{
                color: !usurper ? 'rgb(100, 100, 100)' : usurper === 'player' ? 'yellow' : usurper,
                width: '4.5vw',
                boxShadow: clicked && '0px 0px 10px 2px yellow',
                borderRadius: '100vw',
                backgroundColor: 'black',
                zIndex: '900'
            }} />

            <TroopSpan prevTroops={prevTroops} currTroops={currTroops} />

            <div style={{position: 'absolute', marginTop: '2.73vh', marginRight: '1.98vw', zIndex: '10'}}>
                {
                    attackData.isAttacking &&
                    Array.from({ length: attackData.numTroops }).map((troop, i) => {
                        return <Troop totalTroops={attackData.numTroops} color={usurper === 'player' ? 'yellow' : 'usurper'} xStart={positionState.x} yStart={positionState.y} xDestination={attackData.targetPos[0]} yDestination={attackData.targetPos[1]} index={i} key={troop} />
                    })
                }
            </div>
        </div>
    );
};

export default Assembly;