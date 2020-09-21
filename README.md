# Sweaty Goals

Sweaty goals is CLI tool that retrieves the latest football (soccer) matches happening around the world. Never miss a 
single game of football!

## Installation
- To install stand alone command line tools in python it is recommended that you install them via 
[pipx](https://packaging.python.org/guides/installing-stand-alone-command-line-tools/) as this ensures
that each package gets its own virtual environment. It also ensures that your applications are accessible through a directory 
that is in your `$PATH` for global access.  
- Install pipx: `pip3 install --user pipx`
- Ensures the path of the CLI application directory is on your $PATH: `pipx ensurepath`
- Now you can install sweatygoals for global access `pipx install sweatygoals`

## Usage
- Run in cli: `sweatygoals matches` to retrieve the latest football matches. Example output:
![Football matches result](https://raw.githubusercontent.com/AndresXI/sweaty-goals/master/matches.png)
- To navigate to match url (opens a web page with full match details) run: `sweatygoals matches -t "<MATCH TITLE>"`, ex: 
`sweatygoals matches -t "Arsenal - Liverpool"`, note: football match title must be in quotation marks and match the 
title in the MATCH column
 