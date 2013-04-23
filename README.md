Message Exchange
================

Testing tool (dummy server) for messages sent over different transports, socket, HTTP etc.


## Setup

The dummy server uses vert.x so to begin with, download and install vert.x using the instructions found on their site:

<http://vertx.io/downloads.html>

This code has been tested with version 1.3.1.final

The installation instructions for vert.x are :

<http://vertx.io/install.html>

##Running

To run the server, place the source folder in the root of the vert.x folder (for example), cd into the 'voxware' folder on command line and run by typing:

vertx run SocketReceiver.java 

This assumes you have followed the vert.x installation instructions and put vertx in your PATH.

Bring up a browser and go to <http://localhost:8080/>

##Other Info

The project uses Backbone and Bootstrap for the UI.

##TODO List

* Add HTTP and other transports
* Add configuration for ports used
* Add ability to simulate "network trouble"





