import React, { useEffect, useState } from "react";
import style from "./Block.module.css";
import { ClipLoader } from "react-spinners";
import Highlight from "react-highlight";
import "../../node_modules/highlight.js/styles/dark.css";
import { io } from "socket.io-client";
const socket = io("/");

const Block = () => {
    const [code, setCode] = useState();
    const [showSolution, setShowSolution] = useState();
    const [editedCode, setEditedCode] = useState();
    const [readOnly, setReadOnly] = useState();
    const [isConnected, setIsConnected] = useState(socket.connected);

    const pathParts = window.location.pathname.split("/");
    const id = pathParts[pathParts.length - 1];

    const updateChange = (val) => {
        socket.emit("code-change", JSON.stringify({ id, content: val }));
    };

    const resetTask = (val) => {
        socket.emit("code-change", JSON.stringify({ id, content: "" }));
        setEditedCode(code.content);
    };

    const onConnect = () => {
        setIsConnected(true);
    };

    const onDisconnect = () => {
        setIsConnected(false);
    };

    const onChange = (msg) => {
        const msgJson = JSON.parse(msg);
        if (msgJson.id === id && readOnly) {
            if (msgJson.content) setEditedCode(msgJson.content);
            else setEditedCode(code.content);
        }
    };

    const loadCode = async () => {
        try {
            const res = await fetch("/blocks/" + id);
            const codeData = await res.json();
            setCode(codeData);
            setEditedCode(codeData.editedContent || codeData.content);
            setReadOnly(codeData.readOnlyId === socket.id);
        } catch (e) {
            console.error("Failed to get code blocks: ", e);
        }
    };

    useEffect(() => {
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("code-change", onChange);

        loadCode();

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("code-change", onChange);
        };
    }, [readOnly]);

    return (
        <div className={style.center}>
            {code && (
                <div className={style.blockContainer}>
                    <div className={style.title}>{code.title}</div>
                    <div className={style.desc}>{code.desc}</div>
                    {!readOnly && (
                        <div className={style.reset}>
                            <button onClick={() => resetTask()}>Reset</button>
                        </div>
                    )}
                    {readOnly && (
                        <div className={style.mentor}>Mentor view</div>
                    )}
                    {code.solution === editedCode && (
                        <div className={style.smile}>{":-)  Correct! "}</div>
                    )}
                    <div className={style.input + " " + style.center}>
                        <textarea
                            readOnly={readOnly}
                            id='input-area'
                            autoFocus
                            className={style.content}
                            onChange={(e) => {
                                const inputarea =
                                    document.getElementById("input-area");
                                setEditedCode(e.target.value);
                                updateChange(e.target.value);
                                inputarea.style.zIndex = 0;
                            }}
                            value={editedCode}
                        ></textarea>
                        <div
                            onClick={() => {
                                if (readOnly) return;
                                const inputarea =
                                    document.getElementById("input-area");
                                inputarea.style.zIndex = 4;
                                inputarea.style.color = "#ddd";
                                inputarea.style.background = "#303030";
                                inputarea.focus();
                            }}
                        >
                            <Highlight
                                className={style.highlightBlock + " javascript"}
                            >
                                {editedCode}
                            </Highlight>
                        </div>
                        <div className={style.solutionContainer}>
                            {showSolution ? (
                                <Highlight className={"javascript"}>
                                    {code.solution}
                                </Highlight>
                            ) : (
                                <button onClick={() => setShowSolution(true)}>
                                    Show Solution
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <div className={style.loaderContainer}>
                <ClipLoader color='#cccccc' loading={!code} size={100} />
            </div>
        </div>
    );
};
export default Block;
