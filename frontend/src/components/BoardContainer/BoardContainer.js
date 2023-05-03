import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { generateBoard, launchAttack } from '../../store/game';

import Row from '../Row/Row';

const BoardContainer = () => {
    const dispatch = useDispatch();

    const board = useSelector(state => state.game.board);

    useEffect(() => { dispatch(generateBoard()) }, []);

    useEffect(() => {
        const keyDownHandler = e => {
            e.preventDefault();

            if (e.code === 'Space') dispatch(launchAttack());
        };
    
        document.addEventListener('keydown', keyDownHandler);
    
        return () => document.removeEventListener('keydown', keyDownHandler);
    }, []);

    if (board.length) return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            border: '2px solid transparent',
            width: '90vw',
            height: '95vh'
        }}>
            {
                board.map((row, i) => <Row rowCoord={i} assemblies={row} key={i} />)
            }
        </div>
    );
};

export default BoardContainer;