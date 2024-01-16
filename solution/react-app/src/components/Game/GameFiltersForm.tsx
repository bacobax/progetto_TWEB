import {FC, FormEvent} from "react";
import {QueryFilters} from "./Games";
import {useAsyncList} from "@react-stately/data";
import {competitionTypes, URL_COMPETITIONS_NAME, xor} from "../../constants/constants";
import {
    Autocomplete,
    AutocompleteItem, Button,
    Input, Select, SelectItem
} from "@nextui-org/react";
import {useForm} from "../../hooks/useForm";
import {FaSearch} from "react-icons/fa";

interface GameFiltersFormProps {
    onApplyFilters: (filters: QueryFilters) => void;
    idLoading: boolean;
}

interface CompetitionItem {
    competition_id:string, name: string
}

//verify if is a year and if is in the past
const yearValidation = (value: string) => value.trim().length===0 || (value.length === 4 && parseInt(value) <= new Date().getFullYear());


export const GameFiltersForm:FC<GameFiltersFormProps> = ({onApplyFilters, idLoading}) => {

    const list = useAsyncList<CompetitionItem>({
        async load(){
            const res = await fetch(URL_COMPETITIONS_NAME);
            const data = await res.json();
            return {
                items: data,
            }
        }
    })

    const {formState, handleInputChange, reset, isValid} = useForm({
        competition_id: {
            value: "",
            error: true,
            validate: (value)=>value.trim().length > 0,
            errorText: ""
        },
        type: {
            value: "",
            error: true,
            validate: (value)=>value.trim().length > 0 ,
            errorText: ""
        },
        season: {
            value: "",
            error: false,
            validate: yearValidation,
            errorText: "Invalid year"
        }
    })

    const {items: competitions, isLoading, error} = list;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onApplyFilters({
            competition_id: formState.competition_id.value.trim().length === 0  ? undefined : formState.competition_id.value,
            season: formState.season.value.trim().length === 0  ? undefined : formState.season.value,
            competition_type: formState.type.value.trim().length === 0 ? undefined : formState.type.value
        });
    }

    const isCompetitionValid = !formState.competition_id.error;
    const isTypeValid = !formState.type.error;

    const formIsValid = xor(isCompetitionValid, isTypeValid);

    console.log({competitions})
    return (
        <form onSubmit={handleSubmit} className={"dark flex flex-col gap-2 w-4/5 md:flex-row md:items-center"}>
            {!isLoading && !error &&  <Autocomplete
                label="Competition"

                className="dark text-white"
                defaultItems={competitions}
                value={formState.competition_id.value}

                onInputChange={(val)=>{
                    handleInputChange({
                        inputName: "competition_id",
                        value: list.items.find(i => i.name === val)?.competition_id || ""
                    })
                }}
                isInvalid={(formState.competition_id.error && formState.type.value.trim().length === 0) || (formState.type.value.trim().length > 0 && formState.competition_id.value.trim().length > 0)}
                classNames={{
                    popoverContent: "dark",
                }}
                isRequired={formState.type.value.trim().length === 0}
            >
                {(item) => <AutocompleteItem className={"dark text-white"} key={item.competition_id}>{item.name}</AutocompleteItem>}
            </Autocomplete>}

                <Select
                    items={competitionTypes}
                    label="Competition type"
                    isInvalid={(formState.type.error && formState.competition_id.value.trim().length === 0) || (formState.type.value.trim().length > 0 && formState.competition_id.value.trim().length > 0)}
                    classNames={{
                        listboxWrapper: "dark text-white",
                        base: "dark",
                        listbox: "dark text-white",
                        innerWrapper: "dark text-white",
                        mainWrapper: "dark text-white",
                        popoverContent: "dark text-white",
                    }}
                    onChange={e => {
                        handleInputChange({
                            inputName: "type",
                            value: e.target.value
                        })
                    }}
                    isRequired={formState.competition_id.value.trim().length === 0}
                >
                    {(compType) => <SelectItem key={compType.value}>{compType.value}</SelectItem>}
                </Select>

            <Input type={"number"} className={"text-white"} errorMessage={""} isInvalid={formState.season.error} value={formState.season.value} onChange={(e)=>{
                handleInputChange({
                    inputName: "season",
                    value: e.target.value
                })
            }} label={"Season (year - yyyy)"}/>
            <Button type={"submit"} className={"dark p-2 text-medium h-full "} isLoading={isLoading} isDisabled={!formIsValid} color={"primary"} isIconOnly><FaSearch className={"w-full h-full"}/> </Button>

        </form>
    );
};
