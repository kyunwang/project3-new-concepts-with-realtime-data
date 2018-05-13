<h1 align="center">Arquaponics</h1>

<div align="center">
  <img src="assets/arquaponies-logo.png">
  <p> Arquaponies </p>
</div>
<div align="center">
  :globe_with_meridians: <img src="https://img.shields.io/badge/build-0.0.1-yellow.svg">
</div>
<div align="center">
  <strong>An augmented reality tour that explains the benefits of aquaponics and shows the data insights of <a href="http://deceuvel.nl/en/">De Ceuvel</a></strong>
</div>
<br />

------------------------------------

A collaboration with:
- [VincentKempers](https://github.com/VincentKempers)
- [nourbayard](https://github.com/nourbayard)
- [vriesm060](https://github.com/vriesm060)
- [kyunwang](https://github.com/kyunwang)(Me)

# Table of Content
- [Getting started](#getting-started)
- [Concept](#concept)
- [Features](#features)
- [The data](#the-data)
- [Tools](#tools)

# Getting started
<!-- You will need the following: -->
First you need to create a `vars.env` file with `PORT=3100` (Or any port you like) in the root.

1. Clone the repo: `git clone https://github.com/kyunwang/arquaponics.git`
2. cd to the folder and run `npm install`
3. Run `npm start` to start the server
4. You can now go to [`http://localhost:3100/`](http://localhost:3100/)

# Concept
The concept of this product is to have an introductory to the story of De Ceuvel. By telling the story you can't see the effect of the  overall energy consumption or energy output. By making a nice data visualisation of every data output on a screen will not do the **awesome** story of De Ceuvel justice.

Our concept is a Augmented Reality (AR) tour that you can follow on the awesome ground of De Ceuvel. There will be AR stickers on the ground that you can scan with the Website. What you will see after scanning is a live data graph about the energy consumption in AR which will show you what it going on this particular Boat. You will find a bit of text in AR that will explain what you see and what benefit it will bring.

There will be a companion website, where you can see all the data and the explanation of the data. This is for the user who wants to look back and ponder on the amazing things De Ceuvel does.

## Story
What De Ceuvel does is making self made bio energy from plants and that energy will be needed to make some produce. That produce is used for the café. They make use of an aquaponics system and a joint 'self sufficient' energy producing and sharing system.

## User Stories/Stakeholders
> As space&matter (a partner) I would want to know how De Ceuvel is doing on generating energy and how much it's sustainable energy is presented.

> As gemeente Amsterdam (a partner) I would want to know why this place is good for the enviroment, and what they do better.

## User scenario
> Rick CTO of Space&matter want to know more of the results that De Ceuvel have made.

> Marit is a investment agent for the Gemeente Amsterdam. She wants to know what kind of benefit De Ceuvel has for Amsterdam and what De Ceuvel have researched and implemented.

## (ideal) User flow
Rick
> .. When Rick arrive at the gate and/or done after having the introductory Rick would be seeing a sign to show me how to get started to see "more" insights in De Ceuvel. As Rick progresses he would see recognisable points to use so he can see more.

Marit
> ..Marit noticed that there are signs with stickers everywhere. She notice that with the application she will find more accomplishments De Ceuvel have achieved. With the interaction of these AR she has more insights. afterwards she can visit the website to see everything.

## Goal
1. The Goal of this project is to add an awareness of how bad grey energy is and show that the greenhouse in De Ceuvel a great alternative is.

2. Learn about De Ceuvel and it's sustainability with green energy.

3. De Ceuvel wants to let the partners know what they are doing and how they are doing it.

# Features
The features we use for this application.
* Augmented Reality (AR)
  - we use AR to give this tour a bit more interactivity and understanding. With AR we can experience the data in a different way than a ~~just~~ dashboard.
* Live Data (in AR).
  - The live data in AR will show you _real time_ what is going on with that particular boat. As in consumption and what they gain from that boat.
* Data on the website.
  - With the new way of showing the data on the facility of De Ceuvel. You want to view the data later on with a bit more explanation. So there is a website that shows the data of others and explains that data with the story.

# The data
<!-- data life cycle? data retention/database ? -->
The data is being stored on a stomp server and we use a connection via a StompJS package to get that data. What we receive is:

<!-- example data -->
```json
{
  "consumption": "",
  "id": "11",
  "main": [
    "312.31233128173",
    "0",
    "21.0313032137"
  ],
  "solar": "191.00238232131"
}
```
That data we send to the client so we can use it for the AR and the website.

### API
<!-- Api: limitations, rate limit? not applied ?  -->
The limitations of the API is that you have not much to deal with. You get consumption and production of energy. _But that's what it supposed to do_. We get data every 2-3 seconds. We show the data real-time so there won't be any delay.

### on the AR side
We use the body of the data to make it a bit more interesting. We update the AR-graph with 20 records. When the 20 records are hit it will drop the last one. So you have an "animation" going with the data.

### Data that isn't real-time
Unfortunately we have a lot of data that isn't real time, that data will be used for the other graphs, but mostly it will enhance the story.

# Tools
The tools/packages used for this project:
* [d3.js](https://github.com/d3) - _d3JS is being used to render graphs with data_
* [a-frame](https://aframe.io/) - _a frame is being used for the augmentend reality_
- [AR.js](https://github.com/jeromeetienne/AR.js) - _transforms the vr enviroment to AR enviroment_
* [SockJS](https://github.com/sockjs) - _SockJS is being used for the socket connection to the client_
* [StompJS](https://www.npmjs.com/package/stompjs) - _StompJS is being used for the connection through the database to the server_
* [ExpressJS](https://expressjs.com/) - _Express is being used for the server_

# TODO

### Data
- [x] Connection to the server
  - [x] Real time connection with external server
  - [x] retrieve real time data
  - [x] StompJS
  - [x] SockJS


- [ ] Static data
  - [ ] Clean up
  - [ ] Use that data for d3.js
  - [ ] Write and explain what you can see in the data.
  - [ ] find data on gray energy and compare (via d3).

### Augmented Reality
- [x] Augmented reality set up
- [ ] Complete one AR graph
  - [x] Get d3JS to work in AR
  - [x] Show a Line graph
  - [x] Add the retrieved data in AR
  - [x] Real time Updating the line graph (in AR)
  - [ ] In(Solar) and out(consumption)
  - [ ] Text in the AR experience  
  - [ ] Labels for in out  

### D3 js
- [ ] D3 graphs for the website
  - [ ] Fish data graph
  - [ ] Harvest graph
  - [ ] NO4 graph

### Enhancements
- [ ] Dynamic for multiple boats
  - [ ] So it's easier to make multiple boats

### Website
- [ ] Website
  - [x] Styling
  - [x] Landing page
  - [x] Zero state
  - [ ] Content
  - [ ] Load in the graphs
  - [ ] Explain the graphs
  - [ ] Explain the Aquaponics process

### Research
- [x] Research
  - [x] Pictures of the tour
  - [x] Location
  - [x] User Stories
  - [x] User Scenarios
  - [x] Ideal User Flow
  - [x] Goals

# License
GPLv3 :copyright: Arquaponies
