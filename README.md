# Take Home Project

Challenge: A directory contains multiple files and directories of non-uniform file and directory names. Create a program that traverses a base directory and creates an index file that can be used to quickly lookup files by name, size, and content type.

# Usage

This solution contains both a back end a front end. The back end is a simple REST API built with ExpressJS that exposes the functionality of the indexer. The front end is a simple React app that allows the user to interact with the indexer.
Run first the back end and then the front end.

## Step by Step
1. Clone the repository
2. Open a terminal and navigate to the BackEnd-Express folder
3. Run the following commands:
```bash
npm install
tsc
node dist/index.js
```
4. Open another terminal and navigate to the FrontEnd-React folder
5. Run the following commands:
```bash
npm install
npm start
```
6. The React app will ask you if you want to run the application in another port. You can type "y" and then press enter to run the application in port 3001.
7. The React app will open in your browser. If it doesn't, you can open it manually by typing http://localhost:3001 in your browser.


## Back End
For the back end, you will need to have NodeJS installed. You can download it from [here](https://nodejs.org/en/download/). Once you have NodeJS installed, you can run the following commands to start the back end:

```bash
cd BackEnd-Express
npm install
tsc
node dist/index.js
```

## Front End
For the front end, considering that you have NodeJs installed, you can run the following commands to start the front end:

```bash
cd FrontEnd-React
npm install
npm start
```
React will attempt to run the application in port 3000, but as the back end is already running in that port, it will ask you if you want to run the application in another port. You can type "y" and then press enter to run the application in port 3001.



## Indexing and Filtering
### Indexing
The React application will show the indexing obtained from the test_data by default. Please make sure that the both back end and front end are running simultaneosly.
The hierarchy of files is set by tabs.

### Filtering
You can filter by name of files or directories. The search bar is not case sensitive.
You can filter by files that are less of the size than the input value.
You can filter by the type of files found in the index.

The filters can be combined but take into consideration that they will add results instead of substract them. For example, if you filter by name "a" and then by size "100", you will get all the files that contain "a" in their name and all the files that are less than 100 bytes.

### Extra 
The "Refresh Files Data" button lets you change the files of the test_data folder and then refresh the data in the indexer without having to run any commands again.
