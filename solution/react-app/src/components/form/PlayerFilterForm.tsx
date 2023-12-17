    import React, {useCallback, useState} from "react";
import styles from "./PlayerFilterForm.module.css";
import InputGroup from "../UI/Input/InputGroup";
import Button from "../UI/button/Button";
import IconButton from "../UI/button/IconButton";
import { IoIosAddCircleOutline } from "react-icons/io";
import Filter from "../Filter";
import {animatedButtonProps} from "../../constants/constants";
import NeuromorphismDiv from "../UI/NeuromorphismDiv";
    import {Slider} from "@nextui-org/react";


interface FilterFormProps{
    onApplyFilters: (filters: { name:string, valueMin: number, valueMax: number })=>void;
    onClearFilters: ()=>void;
    onRemoveFilter: (filterName: string)=>void;
    filterNames: string[];
    onAddNameFilter: (name: string)=>void;
    onAddScorefilter: (scoreMin: number, scoreMax: number)=>void;
    minMarketValue: number;
    maxMarketValue: number;
}

const PlayerFilterForm: React.FC<FilterFormProps> = ({
  onApplyFilters,
  onClearFilters,
  filterNames,
  onRemoveFilter,
  onAddNameFilter,
  onAddScorefilter,
    minMarketValue,
    maxMarketValue

}) => {


  const [formState, setFormState] = useState(   {name: "", scoreMin: "0", scoreMax: "1000000"});
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


        <Slider
            label={"Market Value Range"}
            step={10000}
            minValue={minMarketValue}
            maxValue={maxMarketValue}
            defaultValue={[minMarketValue, maxMarketValue]}
            formatOptions={{style: "currency", currency: "EUR"}}
            className="max-w-md"
            value={[Number(scoreMin)-10000, Number(scoreMax)]}
            onChange={(array: number[]|number)=>{
                if(typeof array === "number"){
                    return;
                }
                setFormState(prev=> ({
                    ...prev,
                    scoreMin: array[0].toString(),
                    scoreMax: array[1].toString()
                }))
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
