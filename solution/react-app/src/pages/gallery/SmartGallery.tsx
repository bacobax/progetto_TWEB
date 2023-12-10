import React, {useCallback, useState} from "react";
import styles from "./SmartGallery.module.css";
import useFilter from "../../hooks/useFilter";
import {ShortPlayer} from "../../constants/types";
import PlayerCard from "../../components/PlayerCard";

import FilterForm from "../../components/form/FilterForm";
import IconButton from "../../components/UI/button/IconButton";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import {animatedButtonProps} from "../../constants/constants";

interface SmartGalleryProps {

    elements: ShortPlayer[];

}




const SmartGallery:React.FC<SmartGalleryProps> = ({elements }) => {

    const [showForm, setShowForm] = useState(false)

    const {filteredData, removeFilter, clearFilters, addFilter , filterNames} = useFilter(elements);

    const handleShowForm = useCallback (() => {
        setShowForm((prevState) => !prevState)
    }, [])

    const addNameFilter = useCallback((name: string) => {
        addFilter(`${name}`, (p: ShortPlayer) => {
            if (p.first_name && p.last_name === undefined) {
                return p.first_name.toLowerCase().includes(name.toLowerCase())
            }
            if (p.first_name === undefined && p.last_name) {
                return p.last_name.toLowerCase().includes(name.toLowerCase())
            }
            if (p.first_name && p.last_name) {
                return p.first_name.toLowerCase().includes(name.toLowerCase()) || p.last_name.toLowerCase().includes(name.toLowerCase())
            }
            return false;
        })
    }, [addFilter]);


    const addMarketValueFilter =useCallback ((valueMin: number, valueMax: number) => {
        addFilter(`from ${valueMin} to ${valueMax}`, (p) => {
            if (!p.market_value_in_eur) return false;
            return p.market_value_in_eur >= valueMin && p.market_value_in_eur <= valueMax;
        })
    }, [addFilter])

    const handleApplyFilters = useCallback(({name, valueMin, valueMax}: {name: string, valueMin: number, valueMax:number})=>{
        if(name.length!==0){
            addNameFilter(name);
        }

        addMarketValueFilter(valueMin, valueMax);
    }, [addNameFilter, addMarketValueFilter ]);



    const handleAddNameFilter = useCallback ((name: string) => {
        addNameFilter(name);
    }, [addNameFilter,])

    const handleAddScoreFilter = useCallback ((valueMin: number, valueMax: number) => {
        addMarketValueFilter(valueMin, valueMax);
    } , [addMarketValueFilter]);



    return (
        <div className={styles.container}>
            <header>
                <h1>Gallery</h1>
                <IconButton {...animatedButtonProps} Icon={showForm ? FaAngleUp : FaAngleDown} className={styles.filterButton} onClick={handleShowForm} text={"FILTER"}/>

            </header>
            {showForm &&
                <FilterForm
                onRemoveFilter={removeFilter}
                onApplyFilters={handleApplyFilters}
                onClearFilters={clearFilters}
                filterNames={filterNames}
                onAddNameFilter={handleAddNameFilter}
                onAddScorefilter={handleAddScoreFilter}
                />}
            <main>
                {filteredData.map( (player) => (
                    <PlayerCard {...player}/>
                ))}
            </main>

        </div>
    )
};
export default SmartGallery;