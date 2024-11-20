RunCon Frontend Mobile App
==========================

The RunCon Frontend Mobile App is a sleek, cross-platform mobile application built with React Native, providing an engaging interface for users to interact with the RunCon ecosystem. From discovering group runs to connecting with other runners via posts and messaging, the app empowers users with an intuitive and dynamic platform.
Backend Repository: https://github.com/milbot1992/RunConBE


Features
--------

-   **Navigation System:** Seamless navigation with stack and tab-based components.
-   **API Integration:** Fetch and manage data from the backend API, including groups, runs, chats, and more.
-   **Map Integration:** View groups and runs on an interactive map.
-   **Dynamic UI:** Components designed for ease of use and responsiveness.

Technologies Used
-----------------

-   **React Native:** For building cross-platform mobile applications.
-   **React Navigation:** For managing in-app navigation.
-   **Axios:** For handling HTTP requests.
-   **React Native Gesture Handler:** For smooth gesture handling.
-   **Safe Area Context:** To handle safe areas on devices.

Backend API
-----------

The app connects to the RunCon backend API hosted at:\
**Base URL:** `https://be-runcon-2l3z744zu-millie-ellis-projects.vercel.app/api`\
Refer to the [RunCon Backend Repository](https://github.com/milbot1992/RunConBE) for more details.

Installation
------------

Follow the steps below to set up and run the app locally:

### Prerequisites

-   Node.js and npm installed.
-   React Native environment set up for iOS/Android development.
-   A simulator or physical device connected for testing.

### Steps

1.  Clone the repository:

    `git clone https://github.com/milbot1992/RunConFE.git
    cd RunConFE`

2.  Install dependencies:

    `npm install`

3.  Start the development server:

    `npm start`

4.  Run the app on a connected emulator or device:

    -   For Android:

        `npm run android`

    -   For iOS:

        `npm run ios`

Project Structure
-----------------

-   **`App.js`:** Entry point of the app, setting up navigation and screens.
-   **`api.js`:** Contains all API call functions for interacting with the backend.
-   **Components:** Includes UI components for navigation, maps, groups, runs, and messages.

Key Screens and Components
--------------------------

-   **NavigationBar:** Main navigation bar for accessing app sections.
-   **MapTab:** Displays groups and runs on an interactive map.
-   **SingleGroup & SingleRun:** Detailed views for groups and runs.
-   **MessagesList:** Chat interface for users.
-   **EditProfile:** Allows users to update their profiles.
-   **AddPost:** Form for creating new posts.

API Integration
---------------

This app uses Axios to interact with the backend API. Below are some of the core API functions:

-   **Groups:**

    -   `getGroupsByUser(user_id)`
    -   `getGroupsNotInUserGroups(user_id)`
    -   `getAllGroups()`
-   **Runs:**

    -   `getRunsByGroup(group_id, futureRuns, user_id)`
    -   `getUpcomingRunForGroup(group_id)`
-   **Posts:**

    -   `getGroupPosts(user_id)`
    -   `postPost(newPost)`
-   **Chats:**

    -   `getChatsByUser(user_id)`
    -   `getMessagesByChat(chat_id)`
-   **User:**

    -   `getUserById(user_id)`
    -   `patchUserById(user_id, patchedUser)`

Contributing
------------

Contributions are welcome! To contribute:

1.  Fork the repository.
2.  Create a new branch (`feature/your-feature-name`).
3.  Commit your changes.
4.  Push to the branch.
5.  Create a pull request.

License
-------

This project is licensed under the MIT License.

* * * * *

For backend functionality, visit the [RunCon Backend Repository](https://github.com/milbot1992/RunConBE).\
Feel free to explore and contribute! 🚀
