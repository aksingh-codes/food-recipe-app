import { useState } from "react";
import "./App.css";
import Axios from "axios";
import RecipeCard from "./RecipeCard";
import loader from "./assets/donut-load.gif";
import tasty from "./assets/tasty.gif";

function App() {
  const APP_KEY = process.env.REACT_APP_KEY;
  const APP_ID = process.env.REACT_APP_ID;
  const [healthLabel, setHealthLabel] = useState("");
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  var url =
    healthLabel.length === 0
      ? `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      : `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&health=${healthLabel}`;

  async function getRecipes() {
    setLoading(true);
    const result = await Axios.get(url);
    setRecipes(result.data.hits);
    console.log(result);
    setLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getRecipes();
  }

  return (
    <div className="App">
      <h1 style={{ cursor: "pointer" }} onClick={() => setRecipes([])}>
        Food Recipe 🍛
      </h1>
      <form className="App-Search-Form" onSubmit={handleSubmit}>
        <input
          className="App-Search-Query"
          type="text"
          placeholder="Ingredients"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />

        <select
          className="App-Dropdown"
          name="healthLabel"
          onChange={(e) => {
            setHealthLabel(e.target.value);
          }}
        >
          <option value=""></option>
          <option value="alcohol-free"> alcohol-free </option>
          <option value="celery-free"> celery-free </option>
          <option value="crustacean-free"> crustacean-free </option>
          <option value="dairy-free"> dairy-free </option>
          <option value="egg-free"> egg-free </option>
          <option value="fish-free"> fish-free </option>
          <option value="fodmap-free"> fodmap-free </option>
          <option value="gluten-free"> gluten-free </option>
          <option value="immuno-supportive"> immuno-supportive </option>
          <option value="keto-friendly"> keto-friendly </option>
          <option value="kidney-friendly"> kidney-friendly </option>
          <option value="kosher"> kosher </option>
          <option value="low-fat-abs"> low-fat-abs </option>
          <option value="low-potassium"> low-potassium </option>
          <option value="low-sugar"> low-sugar </option>
          <option value="lupine-free"> lupine-free </option>
          <option value="mustard-free"> mustard-free </option>
          <option value="no-oil-added"> no-oil-added </option>
          <option value="paleo"> paleo </option>
          <option value="peanut-free"> peanut-free </option>
          <option value="pescatarian"> pescatarian </option>
          <option value="pork-free"> pork-free </option>
          <option value="red-meat-free"> red-meat-free </option>
          <option value="sesame-free"> sesame-free </option>
          <option value="shellfish-free"> shellfish-free </option>
          <option value="soy-free"> soy-free </option>
          <option value="sugar-conscious"> sugar-conscious </option>
          <option value="tree-nut-free"> tree-nut-free </option>
          <option value="vegan"> vegan </option>
          <option value="vegetarian"> vegetarian </option>
          <option value="wheat-free"> wheat-free </option>
        </select>

        <input className="App-Submit" type="submit" value="Search" />
      </form>

      {loading && (
        <div
          style={{
            height: "calc(100vh - 150px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            rowGap: "24px",
          }}
        >
          <img
            style={{ maxWidth: "200px", width: "40%" }}
            src={loader}
            alt="loader"
          ></img>

          <p>Finding Your Recipes ...</p>
        </div>
      )}

      {recipes.length === 0 && !loading && (
        <div
          style={{
            height: "calc(100vh - 150px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Search Recipes For Your Favourite Ingredients...😋</p>
          <img style={{ maxWidth: "300px" }} src={tasty} alt="tasty"></img>
        </div>
      )}
      <div className="recipe-grid">
        {recipes.map((recipe, index) => {
          return <RecipeCard key={index} recipe={recipe} />;
        })}
      </div>
    </div>
  );
}

export default App;
