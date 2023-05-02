import Assembly from "../Assembly/Assembly";

const Row = ({ rowCoord, assemblies }) => {
    return (
        <div style={{display: 'flex', flexWrap: 'wrap', width: '100%', height: 'fit-content', justifyContent: 'center'}}>
            {
                assemblies.map((assembly, i) => {
                    if (!assembly) return (
                        <div 
                        style={{width: '5vw', marginTop: '4vh', marginBottom: '2vh', marginLeft: '4vw', marginRight: '2vw'}}
                        key={i}></div>
                    );

                    return <Assembly rowCoord={rowCoord} colCoord={i} usurper={assembly.usurper} troops={assembly.troops} attackData={assembly.attackData} randKey={assembly.randKey} key={i} />
                })
            }
        </div>
    );
};

export default Row;