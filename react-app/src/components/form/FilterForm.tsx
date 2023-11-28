import React, {useCallback} from "react";
import styles from "./FilterForm.module.css";
import InputGroup from "../UI/Input/InputGroup";
import Button from "../UI/button/Button";
import {useForm} from "../../hooks/useForm";
import IconButton from "../UI/button/IconButton";
import { IoIosAddCircleOutline } from "react-icons/io";
import Filter from "../Filter";
import {filterFormState} from "../../constants/constants";


interface FilterFormProps{
    onApplyFilters: (filters: { name:string, scoreMin: number, scoreMax: number })=>void;
    onClearFilters: ()=>void;
    onRemoveFilter: (filterName: string)=>void;
    filterNames: string[];
    onAddNameFilter: (name: string)=>void;
    onAddScorefilter: (scoreMin: number, scoreMax: number)=>void;
}

const FilterForm: React.FC<FilterFormProps> = ({onApplyFilters, onClearFilters, filterNames, onRemoveFilter, onAddNameFilter, onAddScorefilter})=>{

    const {formState, reset, handleInputChange} = useForm(filterFormState)


    const handleApplyFilters = useCallback (() => {
        const name = formState.name.value;
        const scoreMin = +formState.scoreMin.value;
        const scoreMax = +formState.scoreMax.value;
        onApplyFilters({name, scoreMin, scoreMax})
    },[formState.name.value, formState.scoreMin.value, formState.scoreMax.value, onApplyFilters]);

    const handleClearFilters = useCallback (() => {
        onClearFilters();
        reset();
    },[onClearFilters, reset]);


    const applyNameFilter = useCallback (() => {
        const name = formState.name.value;
        onAddNameFilter(name)
    }, [formState.name.value, onAddNameFilter])

    const applyScoreFilter = useCallback (() => {
        const scoreMin = +formState.scoreMin.value;
        const scoreMax = +formState.scoreMax.value;
        onAddScorefilter(scoreMin, scoreMax)
    },[formState.scoreMin.value, formState.scoreMax.value, onAddScorefilter])

    return (
        <form className={styles.filterForm} onSubmit={e=>e.preventDefault()}>
            <InputGroup name={"name"} error={[formState.name.error, formState.name.errorText]} inputProps={{
                type: "text",
                placeholder: "Name",
                value: formState.name.value,
                onChange: (event) => {
                    handleInputChange({
                        value: event.target.value,
                        inputName: "name",
                    })
                },

            }}/>
            <IconButton Icon={IoIosAddCircleOutline} onClick={applyNameFilter}/>

            <hr />
            <InputGroup name={"From"} error={[formState.scoreMin.error, formState.scoreMin.errorText]} inputProps={{
                type: "number",
                placeholder: "Score",
                value: formState.scoreMin.value,
                onChange: (event) => {
                    handleInputChange({
                        value: event.target.value,
                        inputName: "scoreMin",
                    })
                },
            }}/>

            <InputGroup name={"To"} error={[formState.scoreMax.error, formState.scoreMax.errorText]} inputProps={{
                type: "number",
                placeholder: "Score",
                value: formState.scoreMax.value,
                onChange: (event) => {
                    handleInputChange({
                        value: event.target.value,
                        inputName: "scoreMax",
                    })
                },
            }}/>
            <IconButton Icon={IoIosAddCircleOutline} onClick={applyScoreFilter}/>
            {
                    filterNames.map((filterName)=>(
                <Filter name={filterName} onClose={()=>{onRemoveFilter(filterName)}}/>
            ))
            }
            <hr />
            <div className={styles.filterControl}>
                <Button className={styles.btnApply} onClick={handleApplyFilters}>Apply Filters</Button>
                <Button className={styles.btnClear} onClick={handleClearFilters}>Clear Filters</Button>
            </div>

        </form>
    )
}

export default  FilterForm;
