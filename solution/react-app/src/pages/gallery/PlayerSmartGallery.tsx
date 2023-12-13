import React, {useCallback, useState} from "react";
import styles from "./SmartGallery.module.css";
import useFilter from "../../hooks/useFilter";
import {ShortPlayer} from "../../constants/types";
import PlayerCard from "../../components/PlayerCard";

import PlayerFilterForm from "../../components/form/PlayerFilterForm";
import IconButton from "../../components/UI/button/IconButton";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import {animatedButtonProps} from "../../constants/constants";
import useLoadPlayers from "../../hooks/useLoadPlayers";
import {BreadcrumbItem, Breadcrumbs, Card, Skeleton} from "@nextui-org/react";
import Modal from "../../components/UI/modal/Modal";
import {useSignal} from "@preact/signals-react";

interface SmartGalleryProps {



}




const PlayerSmartGallery:React.FC<SmartGalleryProps> = () => {

    const showForm = useSignal(false)

    const {players, loading, error} = useLoadPlayers();

    const {filteredData, removeFilter, clearFilters, addFilter , filterNames} = useFilter(players.value);

    const handleShowForm =  () => {
        showForm.value = !showForm.value;
    }

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
            <Breadcrumbs classNames={{
                list:`z-20 dark fixed top-10 left-10 ${styles.navigation} `,
            }} itemClasses={{
                item: "font-bold text-lg"
            }}
                color="secondary" variant="solid">
                <BreadcrumbItem href="/">Home</BreadcrumbItem>
                <BreadcrumbItem href="/gallery/players">PlayerGallery</BreadcrumbItem>
            </Breadcrumbs>
            <header>
                <h1> PLayer Gallery </h1>
                <IconButton {...animatedButtonProps} Icon={showForm ? FaAngleUp : FaAngleDown} className={styles.filterButton} onClick={handleShowForm} text={"FILTER"}/>

            </header>

            {showForm.value &&
                <PlayerFilterForm
                onRemoveFilter={removeFilter}
                onApplyFilters={handleApplyFilters}
                onClearFilters={clearFilters}
                filterNames={filterNames}
                onAddNameFilter={handleAddNameFilter}
                onAddScorefilter={handleAddScoreFilter}
                />}
            <main>
                {!loading.value ? filteredData.map( (player) => (
                    <PlayerCard key={player._id} {...player}/>
                )) : Array.from({length: 10}).map((_, idx) => (
                    <Card className="w-[200px] space-y-5 p-4" radius="lg" key={idx}>
                        <Skeleton className="rounded-lg">
                            <div className="h-24 rounded-lg bg-default-300"></div>
                        </Skeleton>
                        <div className="space-y-3">
                            <Skeleton className="w-3/5 rounded-lg">
                                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-4/5 rounded-lg">
                                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-2/5 rounded-lg">
                                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                            </Skeleton>
                        </div>
                    </Card>
                ))
                }
            </main>
            <Modal onClose={()=>{

            }} title={"Error pop-up"} opened={!!error.value}>
                {error}
            </Modal>
        </div>
    )
};
export default PlayerSmartGallery;