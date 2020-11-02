# From 43-79 — team 16
Please visit the website at: https://from43-79.herokuapp.com/

## Login Credentials 
There are three accounts that you can login with, 
where the first 2 accounts are user accounts, and the last one is an admin account:
- username: _user@user.com_, password: _user_
- username: _user2@user.com_, password: _user2_
- username: _admin@admin.com_, password: _admin_

## What Can You Do as a User

### Sign Up
If you don't have an account already, click the sign up button to sign up for an account. 
Please note that your email will be your username. 
After successful sign up, you will be automatically signed in, and directed to the Find Buddy page.

### Find Buddy
After logging in the first page that comes up is the Find Buddy page, 
where users make posts to look for travel/hang-out buddies. 

You can view all of your own posts by clicking on "View My Posts".

Or look for specific posts that interest you by applying a filter using the selection bar.
Any filter is applied once you select. You can also choose a start/end date, which means that 
you would like to view the posts with a date range within your selected range.
The default range starts from today and ends a year after today.
Click on reset filters to reset everything.

And of course, you can make a new post and look for buddies by clicking on "Post My Trip Plan".

If you are interested in a specific post, click on "View Details" on the bottom right of the post, 
where you will be directed to the details page. You can reply directly to the post, or to a 
previous reply.
Write your reply in the "Add New Reply" box at the very bottom, 
and once you're done editing, click on "Reply".

If you are interested in this user, click on the nickname beside "Posted By:" 
in the post's details page to view this user's profile page. 

If the post that you are viewing is your own post, you will find a "Delete this Post" button at the bottom right
of the page. You can choose to delete this post if you canceled your plan.

Click on the "Find Buddy" button at the very top to come back to this page at any time.

### Share Journal
Interested in the fun journeys others have had? 
Click on the "Share Journal" button at the very top to see what other users would like to share.

The rules are the same as Find Buddy. 
You can view your own journals, apply a filter to see the ones that interest you, 
or write a new journal if you have a journey to share.

Click on "View Details" if a journal really interests you. 
You can go to this user's profile page, or delete this journal if it is your own - and if you choose to.

### Ask For Help / Seek Travel Advice
Users can also post questions to ask fellow buddies about trip recommendations. 
Click on the "Ask For Help" button at the very top to view this page.

The same rules apply. View your own questions, apply filters, or post a question if you would like to.

### User Account
The very last button at the top of the website goes to your account. 

If you would like to logout, just click the red logout button at the very bottom.

If you would like to update some information, click on "Edit My Account". 
You can change any information that you would like except for your username, which is your email. 
You can choose to leave some fields blank if you don't feel like posting it, 
but please don't give a blank nickname - it is not allowed. 
Click "Save" to confirm your changes, or "Cancel" to go back.

You can also click on "Change Password" to change your password. 
If you did make a change, you would have to login again. 

#### Viewing Someone Else's Account
If you are viewing someone else's profile, it should look about the same as your own page.

However, you can choose to view this user's posts/ questions/ journals by clicking on the 
corresponding buttons at the bottom of the page.

### Admin
If you are an admin, you can do everything that a regular user can do - but more.

From the header, you can go to the View Users page to manage all the users. Click on the pencil button in actions
to view the account page for this specific user. When you are looking at a user's account, you can choose
to delete this user.

On each main page (Find Buddy, Post Journal, Ask Question), there is another button - Edit Filters.
Here you can manage all the filters for this page. You can add a new tag to the filter by clicking on 
the "+" button beside the search bar.
For a specific tag, you can choose to change the name, 
or modify the status to unavailable. An unavailable tag will not be shown in the filters selection bar.

If you're on the details page of a post/ question/ journal, you can choose to delete it no matter who posted it.


## To Run the Website Locally
After cloning the repository, open a terminal and `cd` to the subdirectory `from43-79`. 
This is where all the client source code is.

Once in, run `npm install` to install all the necessary dependencies. 
After successful installation, run `npm run build` to build the client.

In your terminal, do `cd ..` to go back to the parent directory.
Run `node server.js` to run the website on localhost. 
Open [http://localhost:5000](http://localhost:5000) (if not opened automatically) in Google Chrome to view the website.

You should be able to see the login page.

## Other Information (please read)
**We are submitting one and only one day late.** 

After the deadline, before the presentation, there are some really minor changes to the code.
It might look like a lot from the git log, but they are only some display or date difference changes, 
so that the presentation can go smoothly. **We assure that there are NO major changes in features etc.**

There is another README.md file in the subdirectory `from43-79`. 
It is irrelevant to the project and is automatically created when the React App is created.
It is kept for our own future use. 

We were interested in the Google Maps API for selecting regions, however the specific API that we were looking
for (geocoding), is said to be paid (sigh). Therefore we eventually chose not to use it.

It is our decision to not let users add tags themselves - only admins can add them. 
This is to ensure that there are no repeating/similar tags so that it is easier (on the user side and our side)
to apply filters and manage different tags.