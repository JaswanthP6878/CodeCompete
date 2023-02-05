export default function GameEndModal( { data }) {
    if(data?.status === 'winner'){
        return (
            <div>
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Congratulations you are the winner</h3>
                        <div className="modal-action">
                            <label htmlFor="my-modal" className="btn">Yay!</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
    return (
        <div>
            <div className="modal modal-open">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Better Luck next time</h3>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn">Yay!</label>
                    </div>
                </div>
            </div>
        </div>
    )
}
}
