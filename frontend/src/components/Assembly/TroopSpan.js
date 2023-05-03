import { useSpring, animated } from 'react-spring';

const TroopsAnimation = ({ prevTroops, currTroops }) => {
  const { troops } = useSpring({
    troops: currTroops,
    from: { troops: prevTroops },
    config: { tension: (currTroops + 1 * 30), friction: (currTroops + 1 * 7) }
  });

  return (
    <animated.span style={{fontFamily: 'Orbitron', textAlign: 'center', width: '5vw', height: '0vh'}}>
      {troops.interpolate((value) => Math.max(Math.round(value), 0))}
    </animated.span>
  );
}

export default TroopsAnimation;