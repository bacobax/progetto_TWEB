import React, {useCallback, useState} from "react";
import styles from "./TeamFilterForm.module.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import Filter from "./Filter";
import NeuromorphismDiv from "../UI/NeuromorphismDiv";
import {Autocomplete, AutocompleteItem, Button, Input} from "@nextui-org/react";
import {Competition} from "../Game/types";

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
/**
 * ClubInfo is a functional component in React.
 * It accepts props of type ClubInfoProps which includes:
 * - id: A string representing the ID of the club.
 *
 * The component maintains a state variable club, which is the club object retrieved from the server.
 * The useFetch custom hook is used to manage the fetching of the club data.
 *
 * The useEffect hook is used to fetch the club data when the component mounts. The fetchData function from the useFetch hook is called with the URL of the club data.
 * If the fetch is successful, the club state is updated with the retrieved data. If the fetch fails, the error state is updated with the error message.
 *
 * If the club data is still loading, a Loading component is returned.
 * If there is an error fetching the club data, a FetchError component is returned.
 *
 * The component calculates the total value and average age of the club's players using the reduce method.
 *
 * The component returns a div element with the club information. The div includes:
 * - A MyBreadcrumbs component displaying the navigation path.
 * - A header with the club name and total market value.
 * - A section with various club details.
 * - A ClubInfoTable component displaying the club's players.
 */
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
        <NeuromorphismDiv clickable={false} className={"w-2/3"}>
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
                <div className={"w-full flex justify-around"}>
                    <Button className={styles.btnApply} onClick={handleFormSubmit} size={"lg"} color={"success"} variant={"bordered"}>
                        Apply Filters
                    </Button>
                    <Button className={styles.btnClear} onClick={handleClearFilters} size={"lg"} color={"danger"} variant={"bordered"}>
                        Clear Filters
                    </Button>
                </div>
            </form>
        </NeuromorphismDiv>
    );
};

export default  TeamFilterForm;
