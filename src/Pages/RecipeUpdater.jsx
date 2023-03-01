import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecipeForm from "../Components/RecipeForm";
import Loading from "../Components/Loading";

const updateRecipe = (recipe) => {
  return fetch(`/api/recipes/${recipe._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  }).then((res) => res.json());
};

const fetchRecipe = (id) => {
  return fetch(`/api/recipes/${id}`).then((res) => res.json());
};

const RecipeUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [recipeLoading, setRecipeLoading] = useState(true);

  useEffect(() => {
    setRecipeLoading(true);
    fetchRecipe(id)
      .then((recipe) => {
        setRecipe(recipe);
        setRecipeLoading(false);
      })
      .catch((error) => {
        throw error;
      });
  }, [id]);

  const handleUpdateRecipe = (recipe) => {
    setUpdateLoading(true);
    updateRecipe(recipe)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  };

  if (recipeLoading) {
    return <Loading />;
  }

  return (
    <RecipeForm
      recipe={recipe}
      onSave={handleUpdateRecipe}
      disabled={updateLoading}
      onCancel={() => navigate("/")}
    />
  );
};

export default RecipeUpdater;
