import { useSpring, animated } from 'react-spring';

const TroopsAnimation = ({ prevTroops, currTroops }) => {
  const { troops } = useSpring({
    troops: currTroops,
    from: { troops: prevTroops },
    config: { tension: 400, friction: 150 }
  });

  return (
    <animated.span style={{fontFamily: 'Orbitron', textAlign: 'center', width: '5vw', height: '0vh'}}>{troops.interpolate(Math.round)}</animated.span>
  );
}

export default TroopsAnimation;