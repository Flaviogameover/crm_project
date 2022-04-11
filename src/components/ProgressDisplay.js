
export const ProgressDisplay = ({progress}) => {
    return (
        <div className="progress-display">
            <div className="progress-bar">
                <div className="progress-bar-fill" style={{width: `${progress}%`}}></div>
            </div>
        </div>
    );
}