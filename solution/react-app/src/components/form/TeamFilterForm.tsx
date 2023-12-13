import React, {useCallback} from "react";
import styles from "./TeamFilterForm.module.css";
import Button from "../UI/button/Button";
import {useForm} from "../../hooks/useForm";
import IconButton from "../UI/button/IconButton";
import { IoIosAddCircleOutline } from "react-icons/io";
import Filter from "../Filter";
import {animatedButtonProps, teamfilterFormState} from "../../constants/constants";
import NeuromorphismDiv from "../UI/NeuromorphismDiv";
import {ShortClub} from "../../constants/types";
import InputGroup from "../UI/Input/InputGroup";

interface FilterFormProps{
    onApplyFilters: (filters: { name:string,competitionName:string })=>void;
    onClearFilters: ()=>void;
    onRemoveFilter: (filterName: string)=>void;
    filterNames: string[];
    addNameFilter: (name: string)=>void;
    addCompetitionFilter: (competitionName: string)=>void;

}



const PlayerFilterForm: React.FC<FilterFormProps> = ({onApplyFilters, onClearFilters, filterNames, onRemoveFilter, addCompetitionFilter, addNameFilter}) => {
    const { formState, reset, handleInputChange } = useForm(teamfilterFormState);
    const { name, competitionName } = formState;



    const handleClearFilters = useCallback(() => {
        onClearFilters();
        reset();
    }, [onClearFilters, reset]);


    const renderFilters = () => {
        return filterNames.map((filterName) => (
            <Filter name={filterName} onClose={() => onRemoveFilter(filterName)} />
        ));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onApplyFilters({
            name: name.value,
            competitionName: competitionName.value
        })
    };

    const addNameFilterHandler = useCallback(() => {
        if(name.value.length===0){
            return;
        }
        addNameFilter(name.value);
    },[addNameFilter, name.value]);

    const addCompetitionFilterHandler = useCallback(() => {
        if(competitionName.value.length===0){
            return;
        }
        addCompetitionFilter(competitionName.value);
    },[addCompetitionFilter, competitionName.value]);

    return (
        <NeuromorphismDiv clickable={false}>
            <form className={styles.filterForm} onSubmit={handleFormSubmit}>

                <InputGroup name="Name" inputProps={{
                    type: "text",
                    value:name.value,
                    onChange: (e)=>{
                        handleInputChange({
                            value: e.target.value,
                            inputName: "name"
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
                    value:competitionName.value,
                    onChange: (e)=>{
                        handleInputChange({
                            value: e.target.value,
                            inputName: "competitionName"
                        })
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

export default  PlayerFilterForm;
