import React from "react";
import {Player} from "../../constants/types";
import SmartGallery from "./SmartGallery";
import PlayerCard from "../../components/PlayerCard";
import MessiImage from "../../assets/messi.jpg"
const DUMMY_PLAYERS: Player[] = [
    {
        name: "Ronaldo",
        age: 36,
        image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
        country: "Portugal",
        description: "Ronaldo is a Portuguese professional footballer who plays as a forward for Serie A club Juventus and captains the Portugal national team. Often considered the best player in the world and widely regarded as one of the greatest players of all time, Ronaldo has won five Ballon d'Or awards and four European Golden Shoes, both of which are records for a European player. He has won 32 major trophies in his career, including seven league titles, five UEFA Champions Leagues, one UEFA European Championship, and one UEFA Nations League title. Ronaldo holds the records for the most goals (134) and assists (42) in the history of the UEFA Champions League. He is one of the few recorded players to have made over 1,100 professional career appearances and has scored over 780 senior career goals for club and country.",
        id: "1"
    },
    {
        name: "Messi",
        age: 34,
        image: MessiImage,
        country: "Argentina",
        description: "Lionel Andrés Messi is an Argentine professional footballer who plays as a forward and captains both Spanish club Barcelona and the Argentina national team. Often considered as the best player in the world and widely regarded as one of the greatest players of all time, Messi has won a record six Ballon d'Or awards, and a record six European Golden Shoes. He has spent his entire professional career with Barcelona, where he has won a club-record 35 trophies, including ten La Liga titles, four UEFA Champions League titles and six Copas del Rey. A prolific goalscorer and creative playmaker, Messi holds the records for most goals in La Liga (474), a La Liga and European league season (50), most hat-tricks in the UEFA Champions League (8), and most assists in La Liga (192) and the Copa América (12). He has scored over 750 senior career goals for club and country.",
        id: "2"
    },
    {
        name: "Neymar",
        age: 29,
        image: MessiImage,
        country: "Brazil",
        description: "Neymar da Silva Santos Júnior, known as Neymar, is a Brazilian professional footballer who plays as a forward for Ligue 1 club Paris Saint-Germain and the Brazil national team. He is widely considered as one of the best players in the world. Neymar came into prominence at Santos, where he made his professional debut aged 17. He helped the club win two successive Campeonato Paulista championships, a Copa do Brasil, and the 2011 Copa Libertadores, Santos' first continental title since 1963. Neymar was twice named the South American Footballer of the Year, in 2011 and 2012, and soon relocated to Europe to join Barcelona. As part of Barça's attacking trio with Lionel Messi and Luis Suárez, he won the continental treble of La Liga, the Copa del Rey, and the UEFA Champions League, and finished third for the FIFA Ballon d'Or in 2015",
        id: "3",
    }
]


const Gallery: React.FC = ()=>{
    return <div style={{
        minHeight: "100vh",
        minWidth : "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    }}>

        <SmartGallery elements={DUMMY_PLAYERS}>
        {
                (player) => (
                <PlayerCard description={player.description} id={player.id} name={player.name} image={player.image}/>
                )
        }
        </SmartGallery>
    </div>
}

export default Gallery;