import React, {useCallback, useState} from "react";
import styles from "./SmartGallery.module.css";
import useFilter from "../../hooks/useFilter";
import {Player} from "../../constants/types";
import PlayerCard from "../../components/PlayerCard";

import FilterForm from "../../components/form/FilterForm";
import IconButton from "../../components/UI/button/IconButton";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import {animatedButtonProps} from "../../constants/constants";

interface SmartGalleryProps {

    elements: Player[];

}




const SmartGallery:React.FC<SmartGalleryProps> = ({elements }) => {

    const [showForm, setShowForm] = useState(false)

    const {filteredData, removeFilter, clearFilters, addFilter , filterNames} = useFilter(elements);

    const handleShowForm = useCallback (() => {
        setShowForm((prevState) => !prevState)
    }, [])

    const handleApplyFilters = useCallback(({name, scoreMin, scoreMax}: {name: string, scoreMin: number, scoreMax:number})=>{
        if(name.length!==0){
            addFilter(`${name}` , (p: Player) => {
                return p.name.toLowerCase()===(name.toLowerCase())
            })
        }

        addFilter(`from ${scoreMin} to ${scoreMax}` , (p)=>(p.generalScore>=scoreMin && p.generalScore<=scoreMax))
    }, [addFilter]);

    const handleAddNameFilter = useCallback ((name: string) => {
        addFilter(`${name}` , (p: Player) => {
            return p.name.toLowerCase().includes(name.toLowerCase())
        })
    }, [addFilter])

    const handleAddScoreFilter = useCallback ((scoreMin: number, scoreMax: number) => {
        addFilter(`from ${scoreMin} to ${scoreMax}` , (p)=>(p.generalScore>=scoreMin && p.generalScore<=scoreMax))
    } , [addFilter]);



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