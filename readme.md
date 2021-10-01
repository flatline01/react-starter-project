# React

Actual project root. We have a node/express backend here, and run the front end off the sakila app folder.

We will use the default movie store demo database provided by mysql.

This is NOT a production ready repo. This is more trying to glue together react and express into a singular project, so we dont have to run two services or deployments.

There is currently no auth or security implemented. The express backend will only echo requests and/or success messages without committing changes to the database. This will be phase two, as we set up tokens, users, and auth.

Adding   
`"proxy":"http://localhost:3001/",`
to the react package.json will proxy requests to the back end while running the development server. Adding a setupProxy.js will be even better.

# Resources and links
* https://reactjs.org/docs/faq-ajax.html
* https://stackoverflow.com/questions/41495658/use-custom-build-output-folder-when-using-create-react-app
* https://academind.com/tutorials/reactjs-pagination/
* https://bapunawarsaddam.medium.com/add-and-remove-form-fields-dynamically-using-react-and-react-hooks-3b033c3c0bf5
* https://create-react-app.dev/docs/proxying-api-requests-in-development/
* https://reactjs.org/docs/hooks-effect.html


Success! Created sakila at C:\inetpub\wwwroot\react-starter-project\sakila
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:
  nodemon //in the root
  cd sakila
  npm start
