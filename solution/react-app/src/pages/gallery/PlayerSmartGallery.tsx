import React, {useCallback, useEffect, useState} from "react";
import useFilter from "../../hooks/useFilter";
import {ShortPlayer} from "../../constants/types";
import PlayerCard from "../../components/PlayerCard";

import PlayerFilterForm from "../../components/form/PlayerFilterForm";
import IconButton from "../../components/UI/button/IconButton";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import {Button, Card, Skeleton} from "@nextui-org/react";
import useLoadPlayers from "../../hooks/useLoadPlayers";
import {MyBreadcrumbs} from "../../components/MyBreadcrumbs";
import {FetchError} from "../../components/errors/FetchError";
import {inspect} from "util";
import ScrollableComponent from "../../components/UI/ScrollableComponent";

interface SmartGalleryProps {



}

const marketValues = (players: ShortPlayer[]) => {
    const playersWithMarketValue  =  players.filter(player => !!player.market_value_in_eur);
    const res = playersWithMarketValue.map((player) => !!player.market_value_in_eur ? player.market_value_in_eur : 0 );
    return res;
}

const getMinMarketValue = (players: ShortPlayer[]) => {
    const marketValuesArray = marketValues(players);

    return marketValuesArray.length === 0 ? 0 : Math.min(...marketValues(players));

}

const getMaxMarketValue = (players: ShortPlayer[]) => {
    const marketValuesArray = marketValues(players);
    return marketValuesArray.length === 0 ? 0 : Math.max(...marketValues(players));
}


const PlayerSmartGallery:React.FC<SmartGalleryProps> = () => {

    const [showForm,setShowForm] = useState<boolean>(false)
    const {players, addMorePlayers, loading, error} = useLoadPlayers(5);
    const {filteredData, removeFilter, resetFilters: clearFilters, addFilter , filterNames} = useFilter(players);





    const handleShowForm =  useCallback(() => {
        setShowForm(prev => !prev)
    },[])

    const addNameFilter = useCallback((name: string) => {
        addFilter({key: `${name}`, filter: (p: ShortPlayer) => {
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
        }
    })
    }, [addFilter]);


    const addMarketValueFilter =useCallback ((valueMin: number, valueMax: number) => {
        addFilter({key:`from ${valueMin} to ${valueMax}`, filter: (p) => {
            if (!p.market_value_in_eur) return false;
                return p.market_value_in_eur >= valueMin && p.market_value_in_eur <= valueMax;
            }
        })
    }, [addFilter])

    const handleApplyFilters = ({name, valueMin, valueMax}: {name: string, valueMin: number, valueMax:number})=>{
        if(name.length!==0){
            addNameFilter(name);
        }

        addMarketValueFilter(valueMin, valueMax);
    }



    const handleAddNameFilter = (name: string) => {

        addNameFilter(name);

    }

    const handleAddScoreFilter = useCallback ((valueMin: number, valueMax: number) => {
        addMarketValueFilter(valueMin, valueMax);
    } , [addMarketValueFilter]);





    return (
        <div className={"w-full flex flex-col items-center justify-center text-white gap-[10vh] pb-[10vh]"}>
            <MyBreadcrumbs breadcumbs={[{href:"/", label:"Home"}, {href:"/gallery/players", label:"PlayerGallery"}]}/>
            <header className={"w-full h-[30vh] flex items-center justify-center font-[2rem] gap-[5rem]"}>
                <h1 className={"m-0 text-corvette text-5xl font-extrabold"}> PLayer Gallery </h1>
                <Button  endContent={showForm ? <FaAngleUp /> : <FaAngleDown/>} onClick={handleShowForm} className={"dark"} variant={"ghost"}>FILTER</Button>
            </header>

            {showForm &&
                <PlayerFilterForm
                    onRemoveFilter={removeFilter}
                    onApplyFilters={handleApplyFilters}
                    onClearFilters={clearFilters}
                    filterNames={filterNames}
                    onAddNameFilter={handleAddNameFilter}
                    onAddScorefilter={handleAddScoreFilter}
                    maxMarketValue={getMaxMarketValue(players)}
                    minMarketValue={getMinMarketValue(players)}
                />
            }
            {loading && Array.from({length: 10}).map((_, idx) => (
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
            ))}
            {!loading && !error && filteredData.length === 0 && <p>No players found</p>}
            {!loading && <main className={"w-4/5 h-full flex flex-wrap justify-center gap-[3rem]"}>
                {filteredData.map((player) => {
                    return <PlayerCard key={player._id} {...player}/>
                })}
            </main>}
            <Button onClick={addMorePlayers}  className={"dark"}>Load More</Button>
            <FetchError opened={!!error} onClose={()=>{}} message={error} />
        </div>
    )
};
export default PlayerSmartGallery;