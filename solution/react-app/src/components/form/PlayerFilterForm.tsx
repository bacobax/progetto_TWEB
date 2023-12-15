    import React, {useCallback, useState} from "react";
import styles from "./PlayerFilterForm.module.css";
import InputGroup from "../UI/Input/InputGroup";
import Button from "../UI/button/Button";
import IconButton from "../UI/button/IconButton";
import { IoIosAddCircleOutline } from "react-icons/io";
import Filter from "../Filter";
import {animatedButtonProps} from "../../constants/constants";
import NeuromorphismDiv from "../UI/NeuromorphismDiv";


interface FilterFormProps{
    onApplyFilters: (filters: { name:string, valueMin: number, valueMax: number })=>void;
    onClearFilters: ()=>void;
    onRemoveFilter: (filterName: string)=>void;
    filterNames: string[];
    onAddNameFilter: (name: string)=>void;
    onAddScorefilter: (scoreMin: number, scoreMax: number)=>void;
}

const PlayerFilterForm: React.FC<FilterFormProps> = ({
  onApplyFilters,
  onClearFilters,
  filterNames,
  onRemoveFilter,
  onAddNameFilter,
  onAddScorefilter
}) => {


  const [formState, setFormState] = useState(   {name: "", scoreMin: "", scoreMax: ""});
  const { name, scoreMin, scoreMax } = formState;



  const handleClearFilters = useCallback(() => {
    onClearFilters();
    setFormState({
        name: "",
        scoreMin: "",
        scoreMax: ""
        });

  }, [onClearFilters]);

  const applyNameFilter =() => {
      console.log("applyNameFilter")
   if (name.trim().length === 0) {
        console.log("applyNameFilter -> return")
      return;
    }
    console.log("applyNameFilter -> onAddNameFilter")
    onAddNameFilter(name);
  }


  const applyScoreFilter =()=>{
      console.log("applyScoreFilter")
    if (!scoreMin || !scoreMax || scoreMin.trim().length === 0 || scoreMax.trim().length === 0) {
      return;
    }
    const numberScoreMin = Number(scoreMin);
    const numberScoreMax = Number(scoreMax);

    onAddScorefilter(numberScoreMin, numberScoreMax);
  }

  const renderFilters = () => {
    return filterNames.map((filterName) => (
      <Filter name={filterName} onClose={() => onRemoveFilter(filterName)} />
    ));
  };

  const handleApplyFilters = () => {
      console.log({name, scoreMin:Number(scoreMin), scoreMax: Number(scoreMax)})
        onApplyFilters({
            name: name,
            valueMin: Number(scoreMin),
            valueMax: Number(scoreMax)
        });
  };



  return (
    <NeuromorphismDiv clickable={false}>
      <form className={styles.filterForm}>
        <InputGroup
          name={"name"}
          error={[false, ""]}
          inputProps={{
            type: "text",
            placeholder: "Name",
            value: name,
            onChange: (event) => {
              setFormState(prev=> ({
                    ...prev,
                    name: event.target.value
              }))
            }
          }}
        />
          <IconButton
              {...animatedButtonProps}
              className={styles.addFilter}
              Icon={IoIosAddCircleOutline}
              onClick={applyNameFilter}
              type={"button"}
          />

        <hr />
        <InputGroup
          name={"From"}
          error={[false, ""]}
          inputProps={{
            type: "number",
            placeholder: "Score",
            value: scoreMin,
            onChange: (event) => {
              setFormState(prev => ({
                    ...prev,
                    scoreMin: event.target.value
              }))
            },
            min: 0
          }}
        />

        <InputGroup
          name={"To"}
          error={[false, ""]}
          inputProps={{
            type: "number",
            placeholder: "Score",
            value: scoreMax,
            onChange: (event) => {
              setFormState(prev=>({
                    ...prev,
                    scoreMax: event.target.value
              }))
            },
            min: 0
          }}
        />
        <IconButton
          {...animatedButtonProps}
          className={styles.addFilter}
          Icon={IoIosAddCircleOutline}
          onClick={applyScoreFilter}
          type="button"
        />
        <div className={styles.filters}>{renderFilters()}</div>

        <hr />
        <div className={styles.filterControl}>
          <Button className={styles.btnApply} onClick={handleApplyFilters} type={"button"}>
            Apply Filters
          </Button>
          <Button className={styles.btnClear} onClick={handleClearFilters} type={"button"}>
            Clear Filters
          </Button>
        </div>
      </form>
    </NeuromorphismDiv>
  );
};

export default  PlayerFilterForm;
