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
            border: '2px solid transparent',
            borderRadius: '3vw',
            boxShadow: '0px 0px 8px 2px rgb(40, 0, 80)',
            width: '90vw',
            height: '95vh'
        }}>
            {
                board.length &&
                board.map((row, i) => <Row assemblies={row} key={i} />)
            }
        </div>
    );
};

export default BoardContainer;