import React, {useCallback, useState} from "react";
import styles from "./TeamFilterForm.module.css";
import IconButton from "../UI/button/IconButton";
import { IoIosAddCircleOutline } from "react-icons/io";
import Filter from "../Filter";
import {animatedButtonProps, teamfilterFormState} from "../../constants/constants";
import NeuromorphismDiv from "../UI/NeuromorphismDiv";
import {Competition} from "../../constants/types";
import {Autocomplete, AutocompleteItem, Button, Input} from "@nextui-org/react";

interface FilterFormProps{
    onApplyFilters: (filters: { name: string, competitionName: string }) => void,
    onClearFilters: () => void,
    onRemoveFilter: (filterName: string) => void,
    filterNames: string[],
    addNameFilter: (name: string) => void,
    addCompetitionFilter: (competitionName: string) => void,
    domesticCometitions: Competition[]
}

function removeDuplicates<T>(array: T[], equalFn: (a: T, b: T) => boolean) {
    return array.filter((item, index) => {
        const firstIndex = array.findIndex((i) => equalFn(i, item));
        return firstIndex === index;
    });
}

const TeamFilterForm: React.FC<FilterFormProps> = ({ onApplyFilters, onClearFilters, filterNames, onRemoveFilter, addCompetitionFilter, addNameFilter, domesticCometitions }) => {


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


                <Input type={"text"} value={formState.name} onChange={ (e)=>{
                    setFormState(prev => {
                        return {
                            ...prev,
                            name: e.target.value
                        }
                    })
                }} className={"dark"} label={"Name"}/>

                <Button
                    className={"dark rounded-full"}
                    isIconOnly={true}
                    endContent={<IoIosAddCircleOutline className={"w-4/5 h-4/5"} />}
                    onClick={addNameFilterHandler}

                />
                <hr />
                <Autocomplete name="Competition"
                    type="text" label={"Domestic Competition"}
                    value={formState.competitionName}
                    onInputChange={(val)=>{
                        setFormState(prev => ({
                            ...prev,
                            competitionName: val
                        }))
                    }}
                    className={"dark text-white"}
                      classNames={{
                          popoverContent: "dark"
                      }}
                    items={removeDuplicates(domesticCometitions, (a, b) => a.competitionId === b.competitionId)}
                >
                    {(item: Competition) => <AutocompleteItem className={"dark text-white"} key={item.competitionId}>{item.name}</AutocompleteItem>}
                </Autocomplete>

                <Button
                    className={"dark rounded-full"}
                    isIconOnly={true}
                    endContent={<IoIosAddCircleOutline className={"w-4/5 h-4/5"} />}
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
