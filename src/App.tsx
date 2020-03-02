import React from 'react';
import './App.css';
import axios from "axios";

export interface Recipes {
  id: number;
  recipe: {
    label: string;
    image: string;
    url: string;
    calories: number;
    totalWeight: number;
    dietLabels: string[];
    healthLabels: string[]
  };
  
}

export async function fetchRecipes() {
  let url = "https://api.edamam.com/search?app_id=0a286924&app_key=f56337cc81b8291849ef709ca6ed54f7&q=chicken";
  try {
    let response = await axios.get(url);
    console.log(response.data)
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

const RecipeList = (props: { recipes: Recipes[] }) => {
  return(
  <div>{props.recipes.map((rec, index) => (
    <React.Fragment key={index}>
      <p>{rec.recipe.label}</p>
    </React.Fragment>

   )
  )}</div>
  )
}

const App = () => {
  const [recipes, setRecipes] = React.useState<Recipes[]>([]);

  React.useEffect(() => {
    fetchRecipes()
      .then(res => {
        console.log(res.hits);
        setRecipes(res.hits)
      })
      .catch(error => {
        console.log("BLEH", error);
      });
  }, []);

  return (
    <div className="App">
      <RecipeList recipes={recipes}></RecipeList>
    </div>
  );
}

export default App;
