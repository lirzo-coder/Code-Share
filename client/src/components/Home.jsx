import { useState } from "react";
import { useEffect } from "react";
import style from "./Home.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import BlockCard from "./BlockCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [blocks, setBlocks] = useState();
    const navigate = useNavigate();

    const clickHandler = (id) => {
        navigate("/codeblock/" + id);
    };

    const loadBlocks = async () => {
        try {
            const res = await fetch("/blocks");
            setBlocks(await res.json());
        } catch (e) {
            console.error("Failed to get code blocks: ", e);
        }
    };

    useEffect(() => {
        loadBlocks();
    }, []);

    return (
        <>
            {blocks && (
                <div className={style.homeContainer}>
                    <div>
                        <div className={style.title}>
                            Welcome To Code Share!
                        </div>
                        <div className={style.subtitle}>Choose code block:</div>
                        <div className={style.blocksContainer}>
                            {blocks?.map((block) => (
                                <BlockCard
                                    key={block.id}
                                    title={block.title}
                                    id={block.id}
                                    desc={block.desc}
                                    onClick={(id) => clickHandler(id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <div className={style.loaderContainer}>
                <ClipLoader color='#cccccc' loading={!blocks} size={100} />
            </div>
        </>
    );
};

export default Home;
