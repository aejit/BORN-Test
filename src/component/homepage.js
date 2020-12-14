import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from "react";
import { getGoals, addGoals, editGoals, deleteGoals } from "../api/api";
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import WifiTetheringRoundedIcon from '@material-ui/icons/WifiTetheringRounded';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        minWidth: 350,
        height: 'auto',
        marginTop: 20,
        flexBasis: "50%",
    },
    cardContent: {
        padding: '0.5rem 2rem',
        textAlign: 'center'
    },
    cardAction: {
        display: 'flex',
        justifyContent: 'center',
        padding: '0.5rem 2rem',
    }
});


export default function Homepage() {

    const classes = useStyles();

    const [open] = React.useState(true);

    const [inputList, setInputList] = useState([{ titleGoal: "", Discription: "" }]);

    useEffect(() => {
        getGoals().then(
            function (responseData) {
                console.log("success-GET", responseData)
            }
        );
    }, []);


    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
        // perform update action
        editGoals(inputList).then(function (data) {
            console.log("success-patch", data)
        });
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
        // perform delete action
        deleteGoals().then(function (data) {
            console.log("success-delete", data)
        });
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { titleGoal: "", Discription: "" }]);
    };

    // handle Save POST operation onclick of save button
    const handleSave = (inputList) => {
        // perform post action
        addGoals(inputList).then(function (data) {
            console.log("success-post", data)
        });
    }


    return (

        <div className={classes.root}>

            <Dialog className={classes.card} open={open}>

                {inputList.map((x, i) => {
                    return (
                        <div className="parent-card-div" key={i}>
                            <div
                                id="child-div-1st-row"
                                className={classes.cardContent}
                                style={{
                                    display: "flex",
                                }}>
                                <div className="btn-box" style={{ margin: "0.25rem" }}>
                                    {inputList.length !== 0 && <button
                                        style={{
                                            border: "none",
                                            backgroundColor: "white",
                                            cursor: "pointer"
                                        }}
                                        className="mr10"
                                        onClick={() => handleRemoveClick(i)}><CloseIcon fontSize="small" /></button>}

                                </div>
                                <div className="box" style={{ margin: "0.25rem" }}>
                                    <input
                                        name="titleGoal"
                                        placeholder="Type a title goal here"
                                        value={x.titleGoal}
                                        onChange={e => handleInputChange(e, i)}
                                        style={{ marginLeft: "0.25em" }}
                                    />
                                </div>
                            </div>
                            <div id="child-div-2nd-row"
                                className={classes.cardContent}>
                                <input
                                    className="ml10"
                                    name="Discription"
                                    placeholder="Type a goal discription here"
                                    value={x.Discription}
                                    onChange={e => handleInputChange(e, i)}
                                    style={{ height: "3em" }}
                                />
                            </div>

                        </div>
                    );
                })}

                <div id="button-actions" className={classes.cardAction}>
                    <button onClick={handleAddClick}
                        style={{
                            width: "13em",
                            display: "flex",
                            backgroundColor: "chocolate",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}>
                        <WifiTetheringRoundedIcon fontSize="small" />
                        <Typography style={{ marginLeft: "0.25em" }}>
                            Add a New Goal
                    </Typography>
                    </button>
                    <button
                        style={{
                            width: "3em",
                            textAlign: "center",
                            justifyContent: "center",
                            display: "flex",
                            backgroundColor: "lightseagreen",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "20px",
                            marginLeft: "2em",
                        }}
                        onClick={handleSave}
                    >
                        Save
                        </button>
                </div>
            </Dialog>
        </div>
    );
}

