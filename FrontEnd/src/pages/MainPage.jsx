import { useContext, useState } from "react";
import { useRecipeContext } from "../contexts/recipeContext";
import "@fortawesome/fontawesome-free/css/all.min.css"
import { Link } from "react-router-dom";
const MainPage = () => {
  const {
    recipes,
    favoriteRecipes,
    loading,
    getOpenAIRecipes,
    addToFavoriteRecipes,
    deleteFromFavoriteRecipies,
  } = useRecipeContext();
  const [prompt, setPrompt] = useState("");

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSearch = () => {
    
    if (prompt.trim()) {
      getOpenAIRecipes(prompt);
    }
  };

  const handleAddingFavorite = (newFavorite) => {
    addToFavoriteRecipes(newFavorite);
  };

  const handleDeletingFavorite = (id) => {
    deleteFromFavoriteRecipies(id);
  };
  const goToDetails = (id) =>{

  }
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Search for Recipes or Ideas
      </h1>

      <div className="w-full flex mb-6">
        <input
          type="text"
          value={prompt}
          onChange={handleInputChange}
          placeholder="What do you feel like eating?"
          className="flex-grow p-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mr-2"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className={`px-6 py-2 bg-green-500 text-white text-lg rounded-lg ${
            loading ? "bg-green-300 cursor-not-allowed" : "hover:bg-green-600"
          }`}
        >
        <i className="fas fa-search"></i> 
        </button>
      </div>


      {/* Display search results */}
      <div className="w-full">
        {recipes.length > 0 ? (
          <ul className="list-disc pl-5">
            {recipes.map((item, index) => (
              <li key={index} className="text-lg text-gray-700">
                <div>{item.name}</div>
                <div>{item.id}</div>
                <Link to={`/recipes/${item.id}`}>clickme</Link>
              </li>
            ))}
          </ul>
        ) : (
          !loading && (
            <ul className="list-disc pl-5">
                {favoriteRecipes.map((item,index) =>(
                    <li key={index} className="text-lg text-gray-700">
                        {item.name}
                        
                    </li>
                ))}
            </ul>
          )
        )}
      </div>
    </div>
  );
};

export default MainPage;
