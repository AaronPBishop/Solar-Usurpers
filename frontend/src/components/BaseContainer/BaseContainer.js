import BoardContainer from '../BoardContainer/BoardContainer';

const BaseContainer = () => {
    return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <BoardContainer />
        </div>
    );
};

export default BaseContainer;