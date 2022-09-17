import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { Flims } from "./components/Flims";

import "antd/dist/antd.css";
import { Characters } from "./components/Characters";

function App() {
  const [activePage, setActivepage] = useState(0);
  const [flimsData, setflimsData] = useState([]);
  const [flimsLoading, setflimsLoading] = useState(false);
  const [characterData, setCharacterData] = useState([]);
  const [characterLoading, setCharacterLoading] = useState(false);
  const [characterURL, setCharacterURL] = useState(
    "https://swapi.dev/api/people/"
  );

  const getFlimsData = () => {
    setflimsLoading(true);
    axios
      .get("https://swapi.dev/api/films/")
      .then((res) => {
        console.log(res.data);
        setflimsData(res.data.results);
      })
      .catch(() => {})
      .finally(() => {
        setflimsLoading(false);
      });
  };

  const getCharactersData = () => {
    setCharacterLoading(true);

    axios
      .get(characterURL)
      .then((res) => {
        setCharacterURL(res.data?.next);
        setCharacterData((p) => [...p, ...res.data?.results]);
      })
      .catch(() => {})
      .finally(() => {
        setCharacterLoading(false);
      });
  };
  useEffect(() => {
    getFlimsData();
    getCharactersData();
  }, []);

  const handlePage = (val) => {
    setActivepage(val);
  };

  return (
    <>
      <div className="header">
        <h2 className="title">Flim City</h2>
      </div>
      <div className="container">
        {activePage === 0 && (
          <Flims
            flimsData={flimsData}
            flimsLoading={flimsLoading}
            handlePage={handlePage}
          />
        )}
        {activePage === 1 && (
          <Characters
            handlePage={handlePage}
            characterData={characterData}
            characterLoading={characterLoading}
            getCharactersData={getCharactersData}
            characterURL={characterURL}
            flimsData={flimsData}
          />
        )}
      </div>
      <div className="footer">
        <span>© FLim city 2022</span>
      </div>
    </>
  );
}

export default App;
