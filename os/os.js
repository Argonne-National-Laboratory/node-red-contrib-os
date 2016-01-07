/**
 * Copyright 2016 Argonne National Laboratory.
 *
 * Licensed under the BSD 3-Clause License (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
    "use strict";
    var RED = require(process.env.NODE_RED_HOME+"/red/red");
    var settings = RED.settings;
    var os = require('os');
    var df = require('node-df');
   
    function OS(n) {
        RED.nodes.createNode(this,n);        
		var node = this;
		this.name = n.name;		 
	
        node.on("input", function(msg) {
	    var outmsg = {
	        topic: msg.topic
	    };	
		outmsg.payload = {
    					hostname: os.hostname(),
    					type: os.type(),    					
    					platform: os.platform(),
    					arch: os.arch(),
    					release: os.release(),
    					endianness: os.endianness()    					
  						};
		node.send(outmsg);
		}); 

    }

    RED.nodes.registerType("OS",OS);   

	function Drives(n) {
        RED.nodes.createNode(this,n);        
		var node = this;
		this.name = n.name;		 
	
        node.on("input", function(msg) {
	    var outmsg = {
	        topic: msg.topic
	    };
	    
	    df(function (error, response) {
    	if (error) { throw error; }
    	outmsg.payload =response;    
		node.send(outmsg);
    	});
		
		}); 

    }

    RED.nodes.registerType("Drives",Drives);    

	function Uptime(n) {
        RED.nodes.createNode(this,n);        
		var node = this;
		this.name = n.name;		 
	
        node.on("input", function(msg) {
	    var outmsg = {
	        topic: msg.topic
	    };			
		outmsg.payload = {uptime: os.uptime()};
		node.send(outmsg);
		}); 
    }

    RED.nodes.registerType("Uptime",Uptime); 

	function CPUs(n) {
        RED.nodes.createNode(this,n);        
		var node = this;
		this.name = n.name;		 
	
        node.on("input", function(msg) {
	    var outmsg = {
	        topic: msg.topic
	    };			
		outmsg.payload = {cpus: os.cpus()};
		node.send(outmsg);
		}); 
    }

    RED.nodes.registerType("CPUs",CPUs);

	function Loadavg(n) {
        RED.nodes.createNode(this,n);        
		var node = this;
		this.name = n.name;		 
	
        node.on("input", function(msg) {
	    var outmsg = {
	        topic: msg.topic
	    };			
		outmsg.payload = {loadavg: os.loadavg()};
		node.send(outmsg);
		}); 
    }

    RED.nodes.registerType("Loadavg",Loadavg);

	function Memory(n) {
        RED.nodes.createNode(this,n);        
		var node = this;
		var tmem = os.totalmem();
		var fmem = os.freemem();
		var pmem = ((fmem/tmem)*100).toFixed(2);
		this.name = n.name;		 
	
        node.on("input", function(msg) {
	    var outmsg = {
	        topic: msg.topic
	    };			
		outmsg.payload = {totalmem: tmem, freemem: fmem, memusage: pmem};
		node.send(outmsg);
		}); 
    }

    RED.nodes.registerType("Memory",Memory);

    function NetworkIntf(n) {        
        RED.nodes.createNode(this,n);        
		var node = this;
		this.name = n.name;		 
	
        node.on("input", function(msg) {
	    var outmsg = {
	        topic: msg.topic
	    };			
		outmsg.payload = {networkInterfaces: os.networkInterfaces()};
		node.send(outmsg);
		}); 
    }

    RED.nodes.registerType("NetworkIntf",NetworkIntf);   
}