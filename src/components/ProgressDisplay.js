
export const ProgressDisplay = ({progress}) => {
    return (
        <td className="progress-display">
            <div className="progress-bar">
                <div className="progress-bar-fill" style={{width: `${progress}%`}}></div>
            </div>
        </td>
    );
}