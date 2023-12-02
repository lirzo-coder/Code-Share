import style from "./BlockCard.module.css";

const BlockCard = ({ title, id, desc, onClick }) => {
    return (
        <div className={style.card} onClick={() => onClick(id)}>
            <div className={style.title}>{title}</div>
            <div className={style.desc}>{desc}</div>
        </div>
    );
};
export default BlockCard;
