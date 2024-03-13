# Tripbnb
A site to search for vacation cabins that include bed and breakfast around the world

> Built using: `React Js` + `Bootstrap`

> Modules used: `Rauter` + `axios` + `jwt` + `uuid (generator id)`

## Site Map
> - **Home Page** - On this page you can view all the cards that have been created and a search bar to filter cards by name.
Each card has a button, clicking on it adds the card to your watch list. Once added to your list the button turns red. Clicking it again deletes the card from your watch list and the button returns to its original color.
>
>   **Access: Everyone**

> - **Watch List** - On this page you can view all the cards that have been created and a search bar to filter cards by name.
Each card has a button , clicking on it adds the card to your watch list. Once added to your list the button turns red . Clicking it again deletes the card from your watch list and the button returns to its original color.
>
>   **Access: Registered users only (Role: Guest, Business, Admin)**

> - **Card View** - On this page you can view all the details of the card. You can reach this page by clicking on the "View" button, located at the bottom of the card. the right part of the page (on a large screen) or at the bottom of the page (on a small screen) there is a comment system.
Unregistered users can view comments only Registered users can comment on any card and of course also delete their comment only.
An admin user can delete all comments in all cards.
*The card creator cannot delete user comments, To increase the level of credibility of the responses.
>
>   **Access: Everyone (Role: Guest, Business, Admin)**

> - **My Cards** - On this page you can view all the cards you have created. on each card at the bottom. There are 2 action buttons "delete" and "edit". The "Edit" button will open a model for editing the card details. The "delete" button will open a model asking if you are sure you want to delete to avoid accidental deletion
>
>   **Access: Business users only (Role: Business, Admin)**

> - **Profile** - On this page you can view and edit your user information. There is an option to change the profile picture from the database on the website or via an external link.
>
>   **Access: Registered users only (Role: Guest, Business, Admin)**

> - **User Management** - On this page you can see the list of all users registered to the site. At the end of each row of user details there is a button with 2 actions "edit" and "delete".
>
>   **Access: Admin users only (Role: Admin)**

> - **About Us** - On this page you can get complete information about the site and how to interface with it.
>
>   **Access: Everyone**

> - **Register** - On this page you can register for the site.
>
>   **Access: Everyone**

> - **Login** - On this page you can Login for the site.
>
>   **Access: Everyone**


## Users to check the site

| Role      | Email                   | Password |
| --------- | ----------------------- | -------- |
| Guest     | user.guest@gmail.coml   |   1234   |
| Business  | user.business@gmail.com |   1234   |
| Admin     | user.admin@gmail.com    |   1234   |



