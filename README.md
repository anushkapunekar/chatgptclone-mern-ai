We are making a chatgpt clone ai using mern.
for this we need to hve 5 pages 


Now inside src folder named routes and inside this route make folders for those five pages , which are :

1.chatpage
2.dashboardpage
3.homepage
4.sign in oage
5.sign out page

//To navigate between the pages we need the routing library and for this project i used react router dom.
install it .
do some required changes in main.jsx
create a router in main.jsx


//import homepage and all the pages.
now dashboard consists of two pages , so we made children , provided it a path of chatpage.
//we had an error as our element was out out our children 
so after including element of dashboard in our children we got it right.

//now we neeed some common componenets in every page right . for example , the logo so for that we would make a file and then pass it on as children in each file.
here we made layout as one of the file for common component.
//after making rootlayout we can use it as element in router (main.jsx) so that no need of extra work for appyling common component.
//what happens is atfer we write rootlayout as an element in our router and when we write any path in children then it will direct to the root layout and simultaenously we will get that common componennt in our every page.

//about making dashboardlayout we added two paths in dashboard layout element (main.jsx) so as we know it has chats also so two paths and element will be passed .

(chechk rootlayout.css)
//in css for height to be fullpage we need to write height of that particular page as : 100 vh
//similarly for showing the particulr thing horizontally we use display as flex .   
//for items to get vertical use flex-direction as :column when needed,mostly happens when in bg color items get disturbed
//if you need items to be horifzonatl use display: flex , also alignitems..

//now for authentication purpose here for protecting our user information and protecting our dashboard we are using CLERK.
why we are using clerk ?
becz its the easiest way to authentictae. we dont have to worrry about complex impelementations neither the tokens or email verifications and all.
it does it all by himself.

//with help help of clerk make sign in and sign out page add the routesd in main.jsx

//now to protect our ai , for the security , inside dashboardlayout we make const auth hook which is gonna give us userid ,also its gonna tell us if its loaded or not . if its loaded its gonna be true and after loading we are gonna the userid.

//now we move ahead for making our home page , we made 2 divs , left and write and added a button and provide css
//(for refrence how od i gave the background image please check homepage and also its css .orbital)
it aslo have animation so , for that animation , it should be linear , infinte so it keeps going on 
for creating animation we need to use @keyframes and ---whatever you wanna do with that

//for text to appear one after another we used a library named reacttype animation , install it and import the required material from the site to our homepage
//for changing human pic in the chat we used usestate hook in homepage
//until now it wont be responsive so we used media query and gave the instruction just go through the css 
//for starting the button ofget strated in home page we used z-index=-1

//for making chats we made a component chtalist , created the chatlist column and provided css
//moving towards the dashboard page we provide 3 options to user along with the links. 
//basically we created 3 options here along with a form to search
