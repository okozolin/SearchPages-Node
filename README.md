# Web pages scraping and search utility

![SearchPages preview](love-data.jpg)

The purpose of this utility is to search for information inside a specified list of links that are stored on the 'bookmarks.html' file. This is a standard bookmarks file that is saved from the Chrome browser.

To perform this textual search, the websites denoted by these links are scraped first.

This is a lengthy process because of the number of the links (lots of https calls), also which results in a huge amount of data that cannot be stored or manipulated in memory since it causes Node to reach its limitations.

## The requirenments

1. Read links to scrape from a bookmarks file.
2. Create a new file with the scraped data.
3. Search the data file for the desired info
4. Display search results in a new simple ui page. The searched string on the first line, and then the result links .

## The problems that needed to be solved

1. Reading/Writing asynchroneously files (non blocking operation)
2. Dealing with large JSON data that caused Node to reach its memory limitations.
3. Create reasonable UX, so that the scraping operation is performed only once for performance reasons and better UX.

## Techniques used to overcome these issues

1. Middleware
2. Streams
3. Transform stream for JSON.Stringify operation
4. Pipe the streams
5. Caching
6. Readline async await for loop

<hr>

## Installation

`$ npm install`

## Run

`$ npm start`

## Note

The result data of the scraping operation is stored in the 'pagesstream.json' file.
This is about a 20MB file.
If the file does not exist, the operation of creating it may take a while (depending on your machine), even up to 1 minute, so be patient. You can see the log of it working on the termnal.
