import React, {useCallback, useState} from "react";
import styles from "./TeamFilterForm.module.css";
import Button from "../UI/button/Button";
import {useForm} from "../../hooks/useForm";
import IconButton from "../UI/button/IconButton";
import { IoIosAddCircleOutline } from "react-icons/io";
import Filter from "../Filter";
import {animatedButtonProps, teamfilterFormState} from "../../constants/constants";
import NeuromorphismDiv from "../UI/NeuromorphismDiv";
import InputGroup from "../UI/Input/InputGroup";

interface FilterFormProps{
    onApplyFilters: (filters: { name:string,competitionName:string })=>void;
    onClearFilters: ()=>void;
    onRemoveFilter: (filterName: string)=>void;
    filterNames: string[];
    addNameFilter: (name: string)=>void;
    addCompetitionFilter: (competitionName: string)=>void;

}



const TeamFilterForm: React.FC<FilterFormProps> = ({onApplyFilters, onClearFilters, filterNames, onRemoveFilter, addCompetitionFilter, addNameFilter}) => {


    const [formState,setFormState] =  useState({name: "", competitionName: ""});
    const handleClearFilters = () => {
        onClearFilters();
        setFormState({name: "", competitionName: ""});
    }


    const renderFilters = () => {
        return filterNames.map((filterName) => (
            <Filter name={filterName} onClose={() => onRemoveFilter(filterName)} />
        ));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onApplyFilters({
            name: formState.name,
            competitionName: formState.competitionName
        })
    };

    const addNameFilterHandler = useCallback(() => {
        if(formState.name.length===0){
            return;
        }
        addNameFilter(formState.name);
    },[formState,addNameFilter]);

    const addCompetitionFilterHandler = useCallback(() => {
        if(formState.competitionName.length===0){
            return;
        }
        addCompetitionFilter(formState.competitionName);
    },[formState,addCompetitionFilter ]);

    return (
        <NeuromorphismDiv clickable={false}>
            <form className={styles.filterForm} onSubmit={handleFormSubmit}>

                <InputGroup name="Name" inputProps={{
                    type: "text",
                    value:formState.name,
                    onChange: (e)=>{
                        setFormState(prev => {
                            return {
                                ...prev,
                                name: e.target.value
                            }
                        })
                    },
                    className:styles.input
                    }}
                />

                <IconButton
                    {...animatedButtonProps}
                    className={styles.addFilter}
                    Icon={IoIosAddCircleOutline}
                    onClick={addNameFilterHandler}

                />
                <hr />
                <InputGroup name="Competition" inputProps={{
                    type: "text",
                    value:formState.competitionName,
                    onChange: (e)=>{
                        setFormState(prev => ({
                            ...prev,
                            competitionName: e.target.value
                        }))
                    },
                    className:styles.input

                }}
                />

                <IconButton
                    {...animatedButtonProps}
                    className={styles.addFilter}
                    Icon={IoIosAddCircleOutline}
                    onClick={addCompetitionFilterHandler}
                />

                <div className={styles.filters}>{renderFilters()}</div>

                <hr />
                <div className={styles.filterControl}>
                    <Button className={styles.btnApply} onClick={handleFormSubmit}>
                        Apply Filters
                    </Button>
                    <Button className={styles.btnClear} onClick={handleClearFilters}>
                        Clear Filters
                    </Button>
                </div>
            </form>
        </NeuromorphismDiv>
    );
};

export default  TeamFilterForm;
