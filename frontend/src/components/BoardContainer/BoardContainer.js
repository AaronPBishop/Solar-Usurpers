import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { generateBoard } from '../../store/board';

import Row from '../Row/Row';

const BoardContainer = () => {
    const dispatch = useDispatch();

    const board = useSelector(state => state.board.board);

    useEffect(() => { dispatch(generateBoard()) }, []);

    return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: '2px solid transparent',
            width: '90vw',
            height: '95vh'
        }}>
            {
                board.length &&
                board.map((row, i) => <Row rowCoord={i} assemblies={row} key={i} />)
            }
        </div>
    );
};

export default BoardContainer;