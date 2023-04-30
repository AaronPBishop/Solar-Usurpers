import Assembly from "../Assembly/Assembly";

const Row = ({ assemblies }) => {
    return (
        <div style={{display: 'flex', flexWrap: 'wrap', width: '100%', height: 'fit-content', justifyContent: 'center'}}>
            {
                assemblies.map((assembly, i) => {
                    if (!assembly) return (<div></div>)
                    return <Assembly usurper={assembly.usurper} troops={assembly.troops} key={i} />
                })
            }
        </div>
    );
};

export default Row;