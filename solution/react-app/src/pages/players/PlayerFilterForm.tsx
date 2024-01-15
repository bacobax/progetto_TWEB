import {FC, FormEvent, useEffect, useState} from "react";
import {PlayerSearchFilters, positions, subPositions} from "../../constants/types";
import {useAsyncList} from "@react-stately/data";
import {
    competitionTypes, MilionFormat,
    URL_COMPETITIONS_NAME,
    URL_MIN_MAX_MARKET_VALUE,
    URL_NATIONALITIES
} from "../../constants/constants";
import useFetch from "../../hooks/useFetch";
import {Autocomplete, AutocompleteItem, Button, Input, Select, SelectItem, Slider} from "@nextui-org/react";
import {FaSearch} from "react-icons/fa";
import {useForm} from "../../hooks/useForm";
import NeuromorphismDiv from "../../components/UI/NeuromorphismDiv";
interface PlayerFilterFormProps {
    onApplyFilters: (filters: PlayerSearchFilters) => void;
}
export const PlayerFilterForm:FC<PlayerFilterFormProps> = ({onApplyFilters}) => {


    const list = useAsyncList<string>({
        async load(){
            const res = await fetch(URL_NATIONALITIES);
            const data = await res.json();
            return {
                items: data.data,
            }
        }
    })

    const {loading, setError, error:fetchError, fetchData} = useFetch();

    const [minMaxMarketValue, setMinMaxMarketValue] = useState<{
        min: number,
        max: number
    }|null>(null);



    const {formState, handleInputChange, reset, isValid} = useForm({
        nationality: {
            value: "",
            error: true,
            validate: (value)=>value.trim().length > 0,
            errorText: ""
        },
        marketValueRange: {
            value: [0,0],
            error: true,
            validate: (value)=>true,
            errorText: ""
        },
        position: {
            value: "",
            error: false,
            validate: (_)=>true,
            errorText: "Invalid year"
        },
        subPosition: {
            value: "",
            error: false,
            validate: (_)=>true,
            errorText: "Invalid year"
        },

    })
    useEffect(()=>{
        fetchData<{status:string, results: number, data: { min:number,max:number }, message?:string}>({
            url:URL_MIN_MAX_MARKET_VALUE,
        } , (data) =>{
            if(data.status!== "success"){
                return setError(data.message || "Error");
            }
            console.log({minmax:data.data})
            setMinMaxMarketValue(data.data);
            handleInputChange({
                inputName : "marketValueRange",
                value: [data.data.min, data.data.max]
            });

        })
    },[ setError, fetchData, handleInputChange]);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onApplyFilters({
            country_of_citizenship: formState.nationality.value.length>0 ? formState.nationality.value : undefined,
            max_market_value_in_eur: formState.marketValueRange.value[1],
            min_market_value_in_eur: formState.marketValueRange.value[0],
            position: formState.position.value.length>0 ? formState.position.value : undefined,
            sub_position: formState.subPosition.value.length>0 ? formState.subPosition.value : undefined,
        });
    }
    const {isLoading, error,items} = list;
    console.log({formState})

    const avarageMarketValue = minMaxMarketValue ? (minMaxMarketValue!.min + minMaxMarketValue!.max)/2 : null;

    return (
        <form onSubmit={handleSubmit} className={"dark flex flex-col gap-2 w-4/5 md:flex-row md:flex-wrap md:items-center"}>
            {!isLoading && !error &&  <Autocomplete
                label="Nationality"

                className="dark text-white"
                defaultItems={items.map((i,idx) => ({
                    id: idx,
                    value: i
                }))}
                value={formState.nationality.value}
                onInputChange={(val)=>{
                    handleInputChange({
                        inputName: "nationality",
                        value: val
                    })
                }}
                classNames={{
                    popoverContent: "dark",
                }}
            >
                {(item) => <AutocompleteItem className={"dark text-white"} key={item.id} textValue={item.value}>{item.value}</AutocompleteItem>}
            </Autocomplete>}

            {!loading && !fetchError && avarageMarketValue && minMaxMarketValue && <Slider
                label="Market value range"
                step={10000000}
                minValue={minMaxMarketValue.min-1000000}
                maxValue={minMaxMarketValue.max+1000000}
                defaultValue={[minMaxMarketValue!.min, minMaxMarketValue!.max]}
                formatOptions={{style: "currency", currency: "EUR"}}
                getValue={(value)=> {
                    const array = value as [number, number];
                    return `€${MilionFormat(""+array[0])} - €${MilionFormat(""+array[1])}`
                }}
                className="text-white"
                onChange={(values)=>{
                    if(typeof values === "number"){
                        return;
                    }
                    const [min, max] = values as [number, number];
                    handleInputChange({
                        inputName: "marketValueRange",
                        value: [min,max]
                    })
                }}
                color={"warning"}
                showSteps
            />}
            <Select
                label="Position"
                className="max-w-xs"
                items = {positions.map((p,idx)=>({
                    id: idx,
                    value: p,
                }))}

                onChange={e => {
                    handleInputChange({
                        inputName: "position",
                        value: e.target.value
                    })
                }}
            >
                {(position) => (
                    <SelectItem key={position.value} value={position.value}>
                        {position.value}
                    </SelectItem>
                )}
            </Select>

            <Select
                label="Sub position"
                className="max-w-xs"
                items = {subPositions.map((p,idx)=>({
                    id: idx,
                    value: p,
                }))}
                onChange={e => {
                    handleInputChange({
                        inputName: "subPosition",
                        value: e.target.value
                    })
                }}
            >
                {(position) => (
                    <SelectItem key={position.value} value={position.value}>
                        {position.value}
                    </SelectItem>
                )}
            </Select>

            <Button type={"submit"} className={"dark p-2 text-medium h-full self-end"} isLoading={isLoading} color={"primary"} isIconOnly><FaSearch className={"w-full h-full"}/> </Button>

        </form>
    );
};
