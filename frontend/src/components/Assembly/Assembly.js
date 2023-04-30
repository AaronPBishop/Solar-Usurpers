import { GalacticRepublic } from '@styled-icons/fa-brands/GalacticRepublic';

const Assembly = ({ usurper, troops }) => {
    return (
        <div
        style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            height: 'fit-content',
            width: '5vw',
            margin: '2vw'
        }}>
            <GalacticRepublic
            style={{
                color: !usurper ? 'rgb(40, 40, 40)' : usurper === 'player' ? 'yellow' : usurper,
                width: '4vw'
            }} />
            <span>{troops}</span>
        </div>
    );
};

export default Assembly;