import React, {useCallback} from "react";
import styles from "./TeamFilterForm.module.css";
import Button from "../UI/button/Button";
import {useForm} from "../../hooks/useForm";
import IconButton from "../UI/button/IconButton";
import { IoIosAddCircleOutline } from "react-icons/io";
import Filter from "../Filter";
import {animatedButtonProps, teamfilterFormState} from "../../constants/constants";
import NeuromorphismDiv from "../UI/NeuromorphismDiv";
import InputGroup from "../UI/Input/InputGroup";
import { useSignal} from "@preact/signals-react";

interface FilterFormProps{
    onApplyFilters: (filters: { name:string,competitionName:string })=>void;
    onClearFilters: ()=>void;
    onRemoveFilter: (filterName: string)=>void;
    filterNames: string[];
    addNameFilter: (name: string)=>void;
    addCompetitionFilter: (competitionName: string)=>void;

}



const TeamFilterForm: React.FC<FilterFormProps> = ({onApplyFilters, onClearFilters, filterNames, onRemoveFilter, addCompetitionFilter, addNameFilter}) => {


    const formState =  useSignal({name: "", competitionName: ""});
    const handleClearFilters = () => {
        onClearFilters();
        formState.value.name = "";
        formState.value.competitionName = "";
    }


    const renderFilters = () => {
        return filterNames.map((filterName) => (
            <Filter name={filterName} onClose={() => onRemoveFilter(filterName)} />
        ));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onApplyFilters({
            name: formState.value.name,
            competitionName: formState.value.competitionName
        })
    };

    const addNameFilterHandler = useCallback(() => {
        if(formState.value.name.length===0){
            return;
        }
        addNameFilter(formState.value.name);
    },[formState,addNameFilter]);

    const addCompetitionFilterHandler = useCallback(() => {
        if(formState.value.competitionName.length===0){
            return;
        }
        addCompetitionFilter(formState.value.competitionName);
    },[formState,addCompetitionFilter ]);

    return (
        <NeuromorphismDiv clickable={false}>
            <form className={styles.filterForm} onSubmit={handleFormSubmit}>

                <InputGroup name="Name" inputProps={{
                    type: "text",
                    value:formState.value.name,
                    onChange: (e)=>{
                        formState.value= {
                            ...formState.value,
                            name: e.target.value
                        }
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
                    value:formState.value.competitionName,
                    onChange: (e)=>{
                        formState.value = {
                            ...formState.value,
                            competitionName: e.target.value
                        }
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
