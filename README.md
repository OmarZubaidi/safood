# safood

## Frontend

### Tech stack
I used React with bootstrap for the UI (still very incomplete)
### Components
So far i have multiple components, some don't link together yet, but they will soon.

-The App routes you to either the Login/Signup page or to the MainPage depending on if you're logged in
-The MainPage renders a Navbar and the Dashboard OR the RecipeContainer (Search result) depending on if you searched something on the input field

-The Navbar allows you to go to the Mainpage, to search for recipes, to go to the Profile page or see Notifications (not-MVP)
-The Profile page shows a recap of the currently logged in user, allows new allergens to be added and a link to the creation of a new Event
-The Event Page is still work in progress, for now it just fills in a form, will store it in the DB later

-The Dashboard contains (or should) 3 random Recipes based on the current user allergens, the list of users (will become a list of "Friends" only) and the current user Events (currently missing)

### UI barebone design
https://excalidraw.com/#room=a30b9599b3e8f37c858b,_xT7nL_5DfXZX1vfSZgr4Q

## Backend

### Tech stack
Express server with Mongoose DB: 

###

Very simple backend, routes for users, recipes and events.

The recipe database is a JSON file, because of lack of better resources :(

