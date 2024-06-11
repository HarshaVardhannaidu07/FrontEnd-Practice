const get_meal_btn = document.getElementById('get_meal');
const meal_container =document.getElementById('meal');

// get_meal_btn.addEventListner('click', () => {
//     fetch('https://www.themealdb.com/api/json/v1/1/random.php')
//     .then(res => res.json())
//     .then(res => {
//         console.log(res);
//         createMeal(res.meals[0]);
//     });
// });
get_meal_btn.addEventListener('click', () => {
	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then(res => res.json())
		.then(res => {
        console.log(res);

		createMeal(res.meals[0]);
	});
});

const createMeal = (meal) => {
    const ingredients = [];
    //get all the ingridents from the object. up to 20
    for(let i=0;i<20;i++){
        if(meal[`setIngridents$[i]`]){
            ingredients.push(`${meal[`strIngridents${i}`]} - ${meal[`strMeasure${i}`]}`)
        }else{
            //stop if no more 
            break;
        }
    }
    const newInnerHTML = 
    `<div class ='row'>
    <div class="columns five">
    <img src="${meal.strMealThumb}" alt ="Meal Image">
    ${meal.strCatrgory ? `<p><strong>Area:</strong>${meal.strArea}<p>` : ''}
    ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
    ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
    <h5>Ingridents:</h5>
    <ul>${ingredients.map(ingrident => `<li>${ingrident}</li>}`).join('')}
    </ul>
     </div>
			<div class="columns seven">
				<h4>${meal.strMeal}</h4>
				<p>${meal.strInstructions}</p>
	        </div>
      </div>
    ${meal.strYoutube ? `<div class="row">
			<h5>Video Recipe</h5>
			<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>` : ''}
	`;
	
	meal_container.innerHTML = newInnerHTML;
}
// Suppress specific network errors
window.addEventListener('error', function(event) {
    if (event.message.includes('net::ERR_BLOCKED_BY_CLIENT')) {
        // Suppress this error
        event.preventDefault();
    }
}, true);

// Suppress unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
    if (event.reason && event.reason.message && event.reason.message.includes('net::ERR_BLOCKED_BY_CLIENT')) {
        // Suppress this error
        event.preventDefault();
    }
});
