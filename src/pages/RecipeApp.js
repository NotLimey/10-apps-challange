import React from 'react'
import { Switch, Route } from 'react-router'
import { Link } from 'react-router-dom'
import '../scss/recipeApp.scss'

const Recipes = [
    {
        title: 'Creamy Mushroom Pasta',
        img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-creamy-mushroom-pasta-093021-05-jg-1634050473.jpg?crop=1xw:0.9168905168905169xh;center,top&resize=980:*',
        ingredients: [
            {
                name: ' 1 pound whole-wheat elbow pasta, or your favorite shape',
            },
            {
                name: ' 1/2 cup creamy peanut butter (I used natural unsweetened, which is more gritty, but use what you like)',
            },
            {
                name: ' 1 heaping tablespoon white miso',
            },
            {
                name: ' 2 tablespoons apple cider vinegar, or rice wine vinegar',
            },
            {
                name: ' 2 teaspoons chili garlic sauce, plus more to taste (get a jar of the Huy Fong and stash it in the fridge -- it`s ridiculously good)',
            },
            {
                name: ' 2 teaspoons chopped ginger',
            },
            {
                name: ' 1 garlic clove, minced',
            },
            {
                name: ' 2 tablespoons honey (or less, if using sweetened peanut butter)',
            },
            {
                name: ' 4 dashes sesame oil, plus more to taste',
            },
            {
                name: ' 1 bunch scallions, trimmed and sliced',
            },
            {
                name: ' 1/2 large watermelon radish, cut into 2-inch sticks',
            },
            {
                name: ' 1 medium carrot, peeled and cut into 2-inch sticks',
            },
            {
                name: ' 1 cup broccoli florets, blanched or lightly steamed, chopped',
            },
            {
                name: ' 8 sprigs fresh cilantro, chopped, legs and all, plus extra for garnish',
            },
            {
                name: ' 1/2 cup roasted peanuts, for garnish',
            }
        ],
        instructions: [
            'Combine peanut butter with miso until creamy, then add some spice with vinegar and chili garlic sauce, and finish with honey and sesame oil to take the edge off the sauce. Toss with elbow pasta, scallions, watermelon radish, carrots, broccoli florets, and chopped cilantro. Serve with chopped peanuts. '
        ]
    },
    {
        title: 'Miso Peanut Pasta Salad ',
        img: 'https://images.food52.com/YGPU3LbEZoHUJRUwDASM9jrRAhM=/1008x672/filters:format(webp)/52b12918-f4a2-40e4-a17d-6cb124971e0a--2015-0120_miso-peanut-pasta-salad-011.jpg',
        ingredients: [
            {
                name: ' 3 tbsp. extra-virgin olive oil ',
            },
            {
                name: '3/4 c.chopped pecans',
            },
            {
                name: ' 2 sprigs fresh rosemary (optional) ',
            },
            {
                name: '1 tsp.lemon zest',
            },
            {
                name: ' 3 tbsp.butter ',
            },
            {
                name: ' 1 lb.mixed mushrooms, such as maitake, shiitake, cremini, or oyster, torn or sliced into bite-sized pieces',
            },
            {
                name: 'Kosher salt',
            },
            {
                name: 'Freshly ground black pepper',
            },
            {
                name: '1 lb.pasta, such as rigatoni',
            },
            {
                name: ' 1 large shallot, finely chopped ',
            },
            {
                name: '1/2 c.chopped fresh parsley, divided',
            },
            {
                name: '1/2 c.dry white wine',
            },
            {
                name: '3/4 c.heavy cream',
            },
            {
                name: '1/2 c. freshly grated Parmesan, plus more for serving',
            },
            {
                name: ' 2 tbsp.lemon juice (from 1 lemon) ',
            }
        ],
        instructions: [
            'In a large, high-sided skillet, heat oil over medium heat until shimmering. Add pecans and rosemary if using and cook, stirring frequently, until nuts are golden, about 3 minutes. Transfer to a medium heat-proof bowl; toss with lemon zest and a pinch of salt.',
            'Wipe out skillet, return to heat, and add butter. Once melted, add mushrooms, a large pinch of salt, and a few cranks of black pepper; stir to combine. Cover and let liquid release from mushrooms, about 5 minutes. Uncover and cook, stirring occasionally, until mushrooms are golden all over and no liquid remains, 3-5 minutes more.',
            'Meanwhile, boil pasta in a large pot of boiling salted water until al dente. Reserve 1 cup pasta water and drain.',
            'To the skillet with the mushrooms, add shallot and ¼ cup parsley. Cook, stirring until fragrant, 1 to 2 minutes.',
            'Add white wine and cook until evaporated, 3 to 4 minutes, then add pasta, cream, and ½ cup of the pasta water. Cook, tossing frequently, until sauce has thickened slightly, about 3 minutes. Remove from heat and fold in parmesan, lemon juice and remaining parsley. Season to taste with salt and pepper.',
            'Serve topped with fried pecans and more parmesan.'
        ]
    }
]

const RecipeApp = () => {
    return (
        <Switch>
            <Route exact path="/RecipeApp">
                <section class="recipe-app">
                    <div class="recipes">
                        {Recipes.map((item, index) => {
                            return (
                                <div className="recipe" style={{backgroundImage: `url(${item.img})`}}>
                                    <Link to={"/RecipeApp/" + index}>
                                        <div>
                                            <h2>{item.title}</h2>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </Route>
            {Recipes.map((item, i) => {
                return(
                    <Route exact path={"/RecipeApp/" + i}>
                        <RecepieHome recipe={item} />
                    </Route>
                )
            })}
        </Switch>
    )
}

const RecepieHome = ({recipe}) => {
    return (
        <div class="recipe-app p-t-5">
            <div className="recipe-container">
                <div className="recipe-intro-image">
                    <img src={recipe.img} alt={recipe.title} />
                </div>
                <div className="recipe-content">
                    <h1>{recipe.title}</h1>
                    <div class="ingredients__instructions">
                        <div class="ingredients">
                            <h3>Ingredients</h3>
                            {recipe.ingredients.map(item => {
                                return <p>{item.name}</p>
                            })}
                        </div>
                        <div class="instructions">
                            <h3>This is how you do it</h3>
                            {recipe.instructions.map((item, i) => {
                                return <p data-numbered={i + 1 + '. '} >{item}</p>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeApp;