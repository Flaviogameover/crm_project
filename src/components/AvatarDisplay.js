import blankAvatar from "../images/blank-avatar.png";


export const AvatarDisplay = ({ticket}) => {
    return (
        <td className="avatar-container">
            <div className="img-container">
                <img src={ticket?.avatar ? ticket.avatar : blankAvatar} alt={'photo of '+ticket.owner}/>
            </div>
        </td>
    );
}