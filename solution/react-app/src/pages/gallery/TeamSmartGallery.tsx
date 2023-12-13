import React, {FC, useCallback} from "react";
import {useSignal} from "@preact/signals-react";
import useFilter from "../../hooks/useFilter";
import {ShortClub} from "../../constants/types";
import styles from "./SmartGallery.module.css";
import IconButton from "../../components/UI/button/IconButton";
import {animatedButtonProps} from "../../constants/constants";
import {FaAngleDown, FaAngleUp} from "react-icons/fa";
import {BreadcrumbItem, Breadcrumbs, Card, Skeleton} from "@nextui-org/react";
import Modal from "../../components/UI/modal/Modal";
import useLoadTeams from "../../hooks/useLoadTeams";
import TeamCard from "../../components/TeamCard";
import TeamFilterForm from "../../components/form/TeamFilterForm";

export const TeamSmartGallery:FC = () => {
    const showForm = useSignal(false)

    const { clubs, loading, error} = useLoadTeams();

    const {filteredData, removeFilter, clearFilters, addFilter , filterNames} = useFilter(clubs);

    const handleShowForm =  () => {
        showForm.value = !showForm.value;
    }

    const addNameFilter = useCallback((name: string) => {
        addFilter(`${name}`, (p: ShortClub) => p.name.toLowerCase().includes(name.toLowerCase()))
    }, [addFilter]);


    const addCompetitionFilter =useCallback ((competitionName:string) => {
        addFilter(`competition-${competitionName}`, (p) => p.domesticCompetition.name.toLowerCase().includes(competitionName.toLowerCase()))
    }, [addFilter])



    const handleApplyFilters = useCallback(({name, competitionName}:{name:string, competitionName:string})=>{
        if(name.length!==0){
            addNameFilter(name);
        }
        addCompetitionFilter(competitionName);
    }, [addNameFilter, addCompetitionFilter ]);



    const handleAddNameFilter = useCallback ((name: string) => {
        addNameFilter(name);
    }, [addNameFilter,])

    const handleAddCompetitionFilter = useCallback ((competitionName:string) => {
        addCompetitionFilter(competitionName);
    } , [addCompetitionFilter]);




    return (
        <div className={styles.container}>
            <Breadcrumbs classNames={{
                list:`z-20 dark fixed top-10 left-10 ${styles.navigation} `,
            }} itemClasses={{
                item: "font-bold text-lg"
            }}
                         color="secondary" variant="solid">
                <BreadcrumbItem href="/">Home</BreadcrumbItem>
                <BreadcrumbItem href="/gallery/players">Team Gallery</BreadcrumbItem>
            </Breadcrumbs>
            <header>
                <h1>Team Gallery</h1>
                <IconButton {...animatedButtonProps} Icon={showForm ? FaAngleUp : FaAngleDown} className={styles.filterButton} onClick={handleShowForm} text={"FILTER"}/>

            </header>
            {showForm.value &&
                <TeamFilterForm
                    onRemoveFilter={removeFilter}
                    onApplyFilters={handleApplyFilters}
                    onClearFilters={clearFilters}
                    filterNames={filterNames}
                    addNameFilter={handleAddNameFilter}
                    addCompetitionFilter={handleAddCompetitionFilter}
                />}
            <main>
                {!loading ? filteredData.map( (club) => (
                    <TeamCard key={club.clubId} {...club}/>
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

            }} title={"Error pop-up"} opened={!!error}>
                {error}
            </Modal>
        </div>
    )
};
