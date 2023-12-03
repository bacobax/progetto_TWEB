import React, {useCallback} from "react";
import styles from "./FilterForm.module.css";
import InputGroup from "../UI/Input/InputGroup";
import Button from "../UI/button/Button";
import {useForm} from "../../hooks/useForm";
import IconButton from "../UI/button/IconButton";
import { IoIosAddCircleOutline } from "react-icons/io";
import Filter from "../Filter";
import {animatedButtonProps, filterFormState} from "../../constants/constants";
import NeuromorphismDiv from "../UI/NeuromorphismDiv";


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
        if(name.length===0){
            return;
        }
        onAddNameFilter(name)
    }, [formState.name.value, onAddNameFilter])

    const applyScoreFilter = useCallback (() => {
        if(formState.scoreMin.value.length===0 || formState.scoreMax.value.length===0){
            return;
        }
        const scoreMin = +formState.scoreMin.value;
        const scoreMax = +formState.scoreMax.value;

        onAddScorefilter(scoreMin, scoreMax)
    },[formState.scoreMin.value, formState.scoreMax.value, onAddScorefilter])

    return (
        <NeuromorphismDiv clickable={false}>
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
                <IconButton {...animatedButtonProps} className={styles.addFilter} Icon={IoIosAddCircleOutline} onClick={applyNameFilter}/>

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
                    min: 0
                }}/>

                <InputGroup  name={"To"} error={[formState.scoreMax.error, formState.scoreMax.errorText]} inputProps={{
                    type: "number",
                    placeholder: "Score",
                    value: formState.scoreMax.value,
                    onChange: (event) => {
                        handleInputChange({
                            value: event.target.value,
                            inputName: "scoreMax",
                        })
                    },
                    min:0
                }}/>
                <IconButton {...animatedButtonProps} className={styles.addFilter} Icon={IoIosAddCircleOutline} onClick={applyScoreFilter}/>
                <div className={styles.filters}>
                    {
                        filterNames.map((filterName)=>(
                            <Filter name={filterName} onClose={()=>{onRemoveFilter(filterName)}}/>
                        ))
                    }
                </div>

                <hr />
                <div className={styles.filterControl}>
                    <Button className={styles.btnApply} onClick={handleApplyFilters}>Apply Filters</Button>
                    <Button className={styles.btnClear} onClick={handleClearFilters}>Clear Filters</Button>
                </div>

            </form>
        </NeuromorphismDiv>

    )
}

export default  FilterForm;
