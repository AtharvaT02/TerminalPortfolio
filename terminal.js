
$(document).ready(function() {
        "use strict";

        // UTILITY
        function getRandomInt(min, max) {
                        return Math.floor(Math.random() * (max - min)) + min;
        }
        // END UTILITY

        // COMMANDS
        function clear() {
                        terminal.text("");
        }

        function help() {
                        terminal.append(" whoami : Personal info\n ifconfig : Skills\n nc : Education\n autospy : Project\n nmap : POR & ECA\n");
                        
                        
        }

        function echo(args) {
                        var str = args.join(" ");
                        terminal.append(str + "\n");
        }

        function fortune() {
                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', 'https://cdn.rawgit.com/bmc/fortunes/master/fortunes', false);
                        xhr.send(null);

                        if (xhr.status === 200) {
                                        var fortunes = xhr.responseText.split("%");
                                        var fortune = fortunes[getRandomInt(0, fortunes.length)].trim();
                                        terminal.append(fortune + "\n");
                        }
        }
        
        function info() {
                terminal.append("\n<span><span>Name :</span> Atharva Thorkar\n\n<span>Profession :</span> Hacker(You Know its a joke,Right??????)\n\n<span>Hobbies :</span> BOOKS, Finding Exploits, Adventure(Maybe), Movies(For sure)\n\nI belong to those small percent of peoples on planet Earth who have no social life for sure and loves there room there pc and maybe there work also.I am HIGHLY PASSIONATE about computer stuffs and love to explore more and more everyday and yes obviosuly love to use the knowledge I get (If You Know You know). There is much in this website feel free to explore or exploit and and suggestions are always welcome.\n")
                document.getElementById("terminal").style.color = "#00ff00";
        }
        function skills() {
                terminal.append("<span><span>ahhhh skills\nNone!!!!!</span>\n")
        }
        // END COMMANDS
        var terminal = $(".terminal");
        var prompt = "➜";
        var path = "[root@kali]~$ ";

        var commandHistory = [];
        var historyIndex = 0;

        var command = "";
        var commands = [{
                                        "name": "clear",
                                        "function": clear
                        }, {
                                        "name": "help",
                                        "function": help
                        }, {
                                        "name": "fortune",
                                        "function": fortune
                        }, {
                                        "name": "echo",
                                        "function": echo
                        }, {
                                        "name": "whoami",
                                        "function": info
                        }, {
                                        "name": "ifconfig",
                                        "function": skills
                        }];

function processCommand() {
        var isValid = false;

        // Create args list by splitting the command
        // by space characters and then shift off the
        // actual command.

        var args = command.split(" ");
        var cmd = args[0];
        args.shift();

        // Iterate through the available commands to find a match.
        // Then call that command and pass in any arguments.
        for (var i = 0; i < commands.length; i++) {
                        if (cmd === commands[i].name) {
                                        commands[i].function(args);
                                        isValid = true;
                                        break;
                        }
        }

        // No match was found...
        if (!isValid) {
                        terminal.append("zsh: command not found: " + command + "\n");
        }

        // Add to command history and clean up.
        commandHistory.push(command);
        historyIndex = commandHistory.length;
        command = "";
}

function displayPrompt() {
        terminal.append("<span class=\"prompt\">" + prompt + "</span> ");
        terminal.append("<span class=\"path\">" + path + "</span> ");
}

// Delete n number of characters from the end of our output
function erase(n) {
        command = command.slice(0, -n);
        terminal.html(terminal.html().slice(0, -n));
}

function clearCommand() {
        if (command.length > 0) {
                        erase(command.length);
        }
}

function appendCommand(str) {
        terminal.append(str);
        command += str;
}

/*
//	Keypress doesn't catch special keys,
//	so we catch the backspace here and
//	prevent it from navigating to the previous
//	page. We also handle arrow keys for command history.
*/

$(document).keydown(function(e) {
        e = e || window.event;
        var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

        // BACKSPACE
        if (keyCode === 8 && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
                        e.preventDefault();
                        if (command !== "") {
                                        erase(1);
                        }
        }

        // UP or DOWN
        if (keyCode === 38 || keyCode === 40) {
                        // Move up or down the history
                        if (keyCode === 38) {
                                        // UP
                                        historyIndex--;
                                        if (historyIndex < 0) {
                                                        historyIndex++;
                                        }
                        } else if (keyCode === 40) {
                                        // DOWN
                                        historyIndex++;
                                        if (historyIndex > commandHistory.length - 1) {
                                                        historyIndex--;
                                        }
                        }

                        // Get command
                        var cmd = commandHistory[historyIndex];
                        if (cmd !== undefined) {
                                        clearCommand();
                                        appendCommand(cmd);
                        }
        }
});

$(document).keypress(function(e) {
        // Make sure we get the right event
        e = e || window.event;
        var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

        // Which key was pressed?
        switch (keyCode) {
                        // ENTER
                        case 13:
                                        {
                                                        terminal.append("\n");

                                                        processCommand();
                                                        displayPrompt();
                                                        break;
                                        }
                        default:
                                        {
                                                        appendCommand(String.fromCharCode(keyCode));
                                        }
        }
});

// Get the date for our fake last-login
var date = new Date().toString(); date = date.substr(0, date.indexOf("GMT") - 1);

// Display last-login and promt
displayPrompt();
});