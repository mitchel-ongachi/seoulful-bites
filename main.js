document.addEventListener('DOMContentLoaded', () => {
    // Fetch data from API
    function fetchAndDisplayFood(category) {
      console.log("Fetching data for category:", category);
  
      fetch("http://localhost:3001/api/koreanFoods")
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched data:", data);
  
          const filteredFoods = data.filter((food) => food.type === category);
          console.log("Filtered foods for category:", category, filteredFoods);
  
          const imageContainer = document.querySelector(".image-container");
          console.log("Image container element:", imageContainer);
  
          imageContainer.innerHTML = "";
  
          // DOM Manipulation
          filteredFoods.forEach((food) => {
            const foodItem = document.createElement("div");
            foodItem.classList.add("food-item");
  
            const imageElement = document.createElement("img");
            imageElement.src = food.image;
            imageElement.alt = food.name;
  
            imageElement.addEventListener("click", () => {
              displayIngredients(food);
            });
  
            foodItem.appendChild(imageElement);
  
            const nameElement = document.createElement("p");
            nameElement.textContent = food.name;
            foodItem.appendChild(nameElement);
  
            imageContainer.appendChild(foodItem);
          });
        })
        .catch((error) => {
          console.error("Error getting the food you want. Please enter another one:", error);
        });
    }
  
    // Menu clicks
    function handleMenuClick() {
      const menuToggle = document.getElementById("menu-toggle");
      const categoriesList = document.getElementById("categories");
  
      menuToggle.addEventListener("change", () => {
        if (menuToggle.checked) {
          categoriesList.style.display = "block";
        } else {
          categoriesList.style.display = "none";
        }
      });
  
      // Clicking the drinks, snacks, and meal buttons
      categoriesList.addEventListener("click", (event) => {
        const selectedCategory = event.target.textContent;
        if (selectedCategory === "Drinks") {
          fetchAndDisplayFood("drink");
        } else if (selectedCategory === "Snacks") {
          fetchAndDisplayFood("snack");
        } else if (selectedCategory === "Meals") {
          fetchAndDisplayFood("meal");
        }
      });
    }
  
    // Show ingredients when image is clicked
    function displayIngredients(food) {
      const ingredientsContainer = document.querySelector(".ingredients-list");
      ingredientsContainer.innerHTML = "";
  
      const ingredientList = document.createElement("ul");
      food.ingredients.forEach((ingredient) => {
        const listItem = document.createElement("li");
        listItem.textContent = ingredient;
        ingredientList.appendChild(listItem);
      });
  
      ingredientsContainer.appendChild(ingredientList);
  
      const foodDetails = document.querySelector(".food-details");
      foodDetails.style.display = "block";
  
      const foodImage = document.querySelector(".food-image");
      foodImage.innerHTML = ""; // Clear previous content
      const imageElement = document.createElement("img");
      imageElement.src = food.image;
      imageElement.alt = food.name;
      foodImage.appendChild(imageElement);
      foodDetails.querySelector("h3").textContent = food.name;
    }
  
    // Function calls
    handleMenuClick();
    fetchAndDisplayFood("meal"); // Initial category
  
    // Delete a review animation
    function deleteReview() {
        const reviewContainer = document.querySelector('.review');
        if (reviewContainer) {
            reviewContainer.remove();
        }
    }

    const deleteButton = document.getElementById('delete-review-button');
    deleteButton.addEventListener('click', deleteReview);
     // Prevent form submission and handle review submission
     const reviewForm = document.querySelector('.review-form');
     reviewForm.addEventListener('submit', function(event) {
         event.preventDefault(); // Prevent form submission
         const reviewInput = reviewForm.querySelector('input[type="text"]');
         const reviewText = reviewInput.value.trim();
 
         if (reviewText !== "") {
             const reviewContainer = document.createElement('div');
             reviewContainer.classList.add('review');
             reviewContainer.textContent = reviewText;
 
             const existingReviewContainer = document.querySelector('.review-container');
             existingReviewContainer.appendChild(reviewContainer);
         }
     });

  });
  