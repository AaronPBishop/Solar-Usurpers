import Assembly from '../Assembly/Assembly';

const BoardContainer = () => {
    return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            border: '2px solid white',
            borderRadius: '3vw',
            width: '90vw',
            height: '95vh'
        }}>
            <Assembly />
        </div>
    );
};

export default BoardContainer;