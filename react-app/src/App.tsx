
import styles from "./App.module.css";


import Navbar from "./components/navbar/Navbar";
function App() {
  return (
    <>

        <Navbar onSearch={(t)=>{alert(t)}}/>
      <main className={styles.app + " bg-color"}>

      </main>
    </>
  );
}

export default App;
