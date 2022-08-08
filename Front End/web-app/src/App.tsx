import axios from "axios";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./App.css";
import { Box, Button, Grid, Paper, Skeleton } from "@mui/material";

import SpeakerIcon from "./images/Speaker_Icon.png";

function App() {
  const [word, setWord] = useState("");
  const [wordData, setWordData] = useState("");

  const DICTIONARY_BASE_API_URL =
    "https://api.dictionaryapi.dev/api/v2/entries/en/";

  return (
    <div className="App">
      <div className="search-field">
        <h1>Dictionary</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="word-search-bar"
            className="text"
            value={word}
            onChange={(prop) => {
              setWord(prop.target.value);
            }}
            label="Enter a word"
            variant="outlined"
            placeholder="Search..."
            size="medium"
          />
          <Button
            onClick={() => {
              search();
            }}
          >
            <SearchIcon style={{ fill: "blue" }} />
            Search
          </Button>
        </div>
      </div>

      {wordData === undefined ? (
        <div></div>
      ) : (
        <div
          id="definition-result"
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "100px 10px 0px 10px",
          }}
        >
          <Paper>
            <Grid
              container
              direction="row"
              padding={2}
              sx={{
                justifyContent: "center",
              }}
            >
              <Grid item>
                <Box>
                  {wordData === undefined ||
                  wordData === null ||
                  wordData === "" ? (
                    <h1>Word not found</h1>
                  ) : (
                    <div>
                      {wordData && (
                        <div className="showResults">
                          <h2>
                            {(wordData as any).word}{" "}
                            <button
                              style={{
                                width: "30px",
                                height: "30px",
                                backgroundImage: `url(${SpeakerIcon})`,
                              }}
                              onClick={() => {
                                playAudio();
                              }}
                            ></button>
                          </h2>
                          <Box sx={{ m: 2, p: 1, boxShadow: 3 }}>
                            <h4>Parts of speech:</h4>
                            <p>{(wordData as any).meanings[0].partOfSpeech}</p>
                          </Box>
                          <Box sx={{ m: 2, p: 1, boxShadow: 3 }}>
                            <h4>Definition:</h4>
                            <p>
                              {
                                (wordData as any).meanings[0].definitions[0]
                                  .definition
                              }
                            </p>
                          </Box>
                          <Box sx={{ m: 2, p: 1, boxShadow: 3 }}>
                            <h4>Example:</h4>
                            <p>
                              {
                                (wordData as any).meanings[0].definitions[0]
                                  .example
                              }
                            </p>
                          </Box>
                        </div>
                      )}
                    </div>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </div>
      )}
    </div>
  );

  function search() {
    console.log(word);

    axios
      .get(DICTIONARY_BASE_API_URL + word?.toLowerCase())
      .then((res) => {
        setWordData(res.data[0]);
      })
      .catch(() => {
        setWordData("");
      });
  }

  function playAudio() {
    let audio = new Audio((wordData as any).phonetics[0].audio);
    audio.play();
  }
}

export default App;
