import axios from "axios";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./App.css";
import { Box, Button, Grid, Paper, Skeleton } from "@mui/material";

function App() {
  const [word, setWord] = useState("");
  const [wordDefinition, setWordDefinition] = useState("");

  const DICTIONARY_BASE_API_URL =
    "https://api.dictionaryapi.dev/api/v2/entries/en/";
  return (
    <div>
      <div className="search-field">
        <h1>Dictionary Search</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="word-search-bar"
            className="text"
            value={word}
            onChange={(prop) => {
              setWord(prop.target.value);
            }}
            label="Enter a word to get a definition"
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

      {wordDefinition === undefined ? (
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
              spacing={5}
              sx={{
                justifyContent: "center",
              }}
            >
              <Grid item>
                <Box>
                  {wordDefinition === undefined || wordDefinition === null ? (
                    <h1>Word not found</h1>
                  ) : (
                    <div>
                      <p>{wordDefinition}</p>
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
    if (word === undefined || word === "") {
      return;
    }

    axios
      .get(DICTIONARY_BASE_API_URL + word?.toLowerCase())
      .then((res) => {
        var meanings = [String];
        var definitions = [String];
        var temp = [String];
        var temp2 = [String];
        var temp3 = [String];
        for (let index = 0; index < res.data.length; index++) {
          meanings.push(res.data[index]['meanings']);
        }
        for (let meaningsIndex = 1; meaningsIndex < meanings.length; meaningsIndex++){
          temp.splice(0,1,meanings[meaningsIndex]);
          console.log(meanings[meaningsIndex]);
        }
        
        //console.log(meanings);
        //console.log(definitions);

        setWordDefinition(definitions.toString());
      })
      .catch(() => {
        //setWordDefinition(null);
      });
  }
}

export default App;
