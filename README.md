<h1 align="center">Arquaponics</h1>

<div align="center">
  <img src="/public/assets/arquaponies-logo.png">
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
- [kyunwang](https://github.com/kyunwang)


**[Our live application](https://arquaponics.herokuapp.com/)**
Scan this image for the AR:
<div align="center">
	<img src="/public/assets/hiro-marker.png">
</div>



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

*NOTE:*
- When developing go to the file `public/scripts/clientSock.js` and change the sockjs class initialisation to the localhost one when developing and vice-versa for production.

# Concept
The concept of this product is to have an introductory to the story of De Ceuvel. By telling the story you can't see the effect of the  overall energy consumption or energy output. By making a nice data visualisation of every data output on a screen will not do the **awesome** story of De Ceuvel justice.

Our concept is a Augmented Reality (AR) tour that you can follow on the awesome ground of De Ceuvel. There will be AR stickers on the ground that you can scan with the Website. What you will see after scanning is a live data graph about the energy consumption in AR which will show you what it going on this particular Boat. You will find a bit of text in AR that will explain what you see and what benefit it will bring.

There will be a companion website, where you can see all the data and the explanation of the data. This is for the user who wants to look back and ponder on the amazing things De Ceuvel does.

## Story
What De Ceuvel does is making self made bio energy from plants and that energy will be needed to make some produce. That produce is used for the café. They make use of an aquaponics system and a joint 'self sufficient' energy producing and sharing system.

## Stakeholders
 - Space&Matter
 - Gemeente Amsterdam

## User scenario
> Sophie Vranken is a junior architect at a proactive architecture agency that strives for innovative ideas, with the name Space&Matter. An agency that has been working closely with de Ceuvel. Sophie wants to know how De Ceuvel is doing and how they are gaining experience.

> Channah Myer is working for the environment department at De Gemeente Amsterdam, which is a partner that is financially aiding De Ceuvel. Gemeente Amsterdam is mostly interested in results and how De Ceuvel is keeping it up and running. How they accumulate energy and how this is effecting De Ceuvel. Especially how they are self sufficient.

## User flow
Sophie Vranken
> .. When Sophie arrives at the gate and is done with the introductory, she would see a sign to show her how to get started viewing "more" insights in De Ceuvel. As Sophie progresses she would see recognisable points to use so she can see more.

Channah Myer
> ..Channah notices that there are signs with stickers everywhere. She notices that with the application she will find more accomplishments De Ceuvel have achieved. With the interaction of this AR she has more insights. Afterwards she can visit the website to see everything.

## Goal

1. Learn about De Ceuvel and it's sustainability with green energy.

2. De Ceuvel wants to let the partners know about aquaponics, the benefits it has on the environment and that this is a good alternative for the current agriculture.

# Features
The features we use for this application.
* Augmented Reality (AR)
  - we use AR to give this tour a bit more interactivity and understanding. With AR we can experience the data in a different way than a ~~just~~ dashboard.
* Live Data (in AR).
  - The live data in AR will show you _real time_ what is going on with that particular boat. As in consumption and what they gain from that boat.
* Data on the website.
  - With the new way of showing the data on the facility of De Ceuvel. You want to view the data later on with a bit more explanation. So there is a website that shows the data of others and explains that data with the story.

# The data
The data is being stored on a stomp server and we use a connection via a StompJS package to get that data. What we receive is:

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
The limitations of the API is that you have not much to deal with. You get consumption and production of energy. _But that's what it supposed to do_. We get data every 2-3 seconds. We show the data real-time so there won't be any delay.

### on the AR side
We use the body of the data to make it a bit more interesting. We update the AR-graph with 20 records. When the 20 records are hit it will drop the last one. So you have an "animation" going with the data.

### Data that isn't real-time
Unfortunately we have a lot of data that isn't real time, that data will be used for the other graphs, but mostly it will enhance the story.

# Tools
The tools/packages used for this project:
* [d3.js](https://github.com/d3) - _d3JS is being used to render graphs with data_
* [a-frame](https://aframe.io/) - _a frame is being used for the augmented reality_
- [AR.js](https://github.com/jeromeetienne/AR.js) - _transforms the VR environment to AR environment
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


- [x] Static data
  - [x] Clean up
  - [x] Use that data for d3.js
  - [x] Write and explain what you can see in the data.
  - [x] find data on gray energy and compare (via d3).

### Augmented Reality
- [x] Augmented reality set up
- [x] Complete one AR graph
  - [x] Get d3JS to work in AR
  - [x] Show a Line graph
  - [x] Add the retrieved data in AR
  - [x] Real time Updating the line graph (in AR)
  - [x] In(Solar) and out(consumption)
  - [x] Text in the AR experience  
  - [x] Labels for in out  

### D3 js
- [x] D3 graphs for the website
  - [ ] Fish data graph (nice to have)
  - [x] Harvest graph
  - [ ] NO4 graph (nice to have)

### Enhancements
- [ ] Dynamic for multiple boats (nice to have)
  - [ ] So it's easier to make multiple boats (nice to have)

### Website
- [x] Website
  - [x] Styling
  - [x] Landing page
  - [x] Zero state
  - [x] Content
  - [x] Load in the graphs
  - [x] Explain the graphs
  - [x] Explain the Aquaponics process

### Research
- [x] Research
  - [x] Pictures of the tour
  - [x] Location
  - [x] User Stories
  - [x] User Scenarios
  - [x] User Flow
  - [x] Goals

# License
GPLv3 :copyright: Arquaponies
