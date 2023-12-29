import React, {FC, useState} from "react";
import useFilter from "../../hooks/useFilter";
import {ShortClub} from "../../constants/types";
import styles from "./SmartGallery.module.css";
import IconButton from "../../components/UI/button/IconButton";
import {FaAngleDown, FaAngleUp} from "react-icons/fa";
import {Card, Skeleton, Button} from "@nextui-org/react";
import useLoadTeams from "../../hooks/useLoadTeams";
import TeamCard from "../../components/TeamCard";
import TeamFilterForm from "../../components/form/TeamFilterForm";
import {MyBreadcrumbs} from "../../components/MyBreadcrumbs";
import {FetchError} from "../../components/errors/FetchError";


export const TeamSmartGallery: FC = () => {
  const [showForm, setShowForm] = useState(false);

  const { clubs, loading, error,loadMore } = useLoadTeams(5);

  const { filteredData, removeFilter, resetFilters, addFilter, filterNames } = useFilter([...clubs]);

  const handleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  const addNameFilter = (name: string) => {
    addFilter({key:`${name}`, filter: (p: ShortClub) => p.name.toLowerCase().includes(name.toLowerCase())
  });
  };

  const addCompetitionFilter = (competitionName: string) => {
    addFilter({key:`competition-${competitionName}`,filter: (p) =>
        p.domesticCompetition.name.toLowerCase().includes(competitionName.toLowerCase())
    });
  };

  const handleApplyFilters = ({ name, competitionName }: { name: string; competitionName: string }) => {
    if (name.length !== 0) {
      addNameFilter(name);
    }
    if (competitionName.length !== 0) {
      addCompetitionFilter(competitionName);
    }
  };

  return (
    <div className={styles.container}>
        <MyBreadcrumbs breadcumbs={[{href:"/", label:"Home"}, {href:"/gallery/teams", label:"Team Gallery"}]}/>
      <header>
        <h1>Team Gallery</h1>
        <IconButton
          Icon={showForm ? FaAngleUp : FaAngleDown}
          className={styles.filterButton}
          onClick={handleShowForm}
          text={'FILTER'}
        />
      </header>
      {showForm && (
        <TeamFilterForm
          onRemoveFilter={removeFilter}
          onApplyFilters={handleApplyFilters}
          onClearFilters={resetFilters}
          filterNames={filterNames}
          addNameFilter={addNameFilter}
          addCompetitionFilter={addCompetitionFilter}
        />
      )}
      <main>
        {!loading ? (
          filteredData.map((club) => <TeamCard key={club.clubId} {...club} />)
        ) : (
          Array.from({ length: 10 }).map((_, idx) => (
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
        )}
        <Button onClick={loadMore} className={"bg-corvette"}>
          Load More</Button>
      </main>
      {error && (
          <FetchError opened={true} onClose={()=>{}} message={"An error occurred while fetching data, please try again"}></FetchError>
      )}
    </div>
  );
};
