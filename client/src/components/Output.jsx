function Output ( {outputDetails }) {
    let content;
    if (outputDetails?.status == 'wrong' || outputDetails?.status == 'error'){
    content = (
        <div className="bg-gray-200 text-rose-700">
            <h3>{outputDetails?.output}</h3>
        </div>
    )
    } else {
        content = (
            <div>
                <h3>{outputDetails?.output}</h3>
            </div>
        )
    }
    return (
        <div>
            <h2>Output details</h2>
            <div className="bg-gray-300">
                {content}
            </div>
           
        </div>
    )
}

export default Output;
