var oBtn1 = document.getElementById('btn1');
var oBtn2 = document.getElementById('btn2');

/** Click the search button
* @return {null}
*/
oBtn1.onclick = function() {
	var comname = document.getElementById("Company_name").value;
	var fdyear = document.getElementById("Founded_year").value;
	var fdname = document.getElementById("Founder_name").value;
	var cn = checkcomname(comname);
	var fdy = checkfdyear(fdyear);
	var fdn = checkfdname(fdname);
	// if all the three inputs satisfy the rules
	if ( cn && fdy && fdn) {
		titlerenew();
		url = 'data/companies.json';
		loaddata(url, comname, fdyear, fdname);    		
	}
	else 
		return;
}

// Print out the table tile 
function titlerenew() {
	// clear the error parts
	document.getElementById("comnameErr").innerHTML = "";
	document.getElementById("fdyearErr").innerHTML = "";
	document.getElementById("fdnameErr").innerHTML = "";
	// set the table visible
	document.getElementById("result").style.visibility = 'visible';
	document.getElementById("result").innerHTML = "";
	var tr = document.createElement("tr");
	tr.innerHTML = "<th>Logo</th><th>Company Name</th><th>Officail Website</th><th>Founded Date</th><th>Founder(s)</th><th>Discriptions</th>";
	document.getElementById("result").appendChild(tr);  
}

/** Get data by ajax method
* @param {String} [url] [directory for json file]
* @param {String} [Comname] [input: Company name]
* @param {String} [Fdyear] [input: Founded year]
* @param {String} [Fdname] [input: Founder names]
* @return {null}
*/
function loaddata(url, Comname, Fdyear, Fdname) {
	var ourRequest = new XMLHttpRequest();
    ourRequest.onreadystatechange = function() {
    	if (ourRequest.readyState === 4 && ourRequest.status === 200){
        	var Data = JSON.parse(ourRequest.responseText);
        	getResults(Data, Comname, Fdyear, Fdname);
        	
        	document.getElementById("result").style.visibility = 'visible';

    	}
    }
    ourRequest.open('GET','data/companies.json',true);
    ourRequest.send();
}

/** Get the data that satisfies the search conditions
* @param {Array} [data] [input: Company name]
* @param {String} [Comname] [input: Company name]
* @param {String} [Fdyear] [input: Founded year]
* @param {String} [Fdname] [input: Founder names]
* @return {null}
*/
function getResults(data, Com_name, Fd_year, Fd_name) {
	var companies= new Array();
	// search the whole file to find out results that meet conditions
	// list all countries if inputs are null
	if ( Com_name=="" && Fd_name== "" && Fd_name=="") {
		companies = data;
	}
	else {
		for (var i=0; i<data.length; i++){
			// if the company name is the same
			var a = data[i].name.toLowerCase().match(Com_name.toLowerCase());
			//if the founded date is the same
			var b = data[i].founded_date.match(Fd_year);
			//if the founder is the same
			var fn="";
			for (var j=0; j<data[i].founders.length; j++) {
				fn +=  data[i].founders[j].first_name + ' ' + data[i].founders[j].last_name + ' ';
			}
			var c = fn.toLowerCase().match(Fd_name.toLowerCase());

			if (a && b && c) {
				companies.push(data[i]);	
			}
		}
	}
	printresult(companies);
	return;
}


/** Print out the tabel
* @param {Array} [coms] [Companis information]
* @return {null}
*/
function printresult(comarray) {

	var coms = comarray.sort(sortName);

	for (var i=0; i<coms.length; i++) {
		
		// create one tr element and six td element
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");
		var td3 = document.createElement("td");
		var td4 = document.createElement("td");
		var td5 = document.createElement("td");
		var td6 = document.createElement("td");

		// insert the context into elments
		td1.innerHTML = "<a href='" +  coms[i].website +"'><img id='image' src='" + "images/" + coms[i].logo + "'></a>";
		td2.innerHTML = coms[i].name;
		td3.innerHTML = "<a href='" +  coms[i].website + "' target='_blank'>"+ coms[i].website +"</a>";
		td4.innerHTML = coms[i].founded_date.substring(0,4)+"."+coms[i].founded_date.substring(4,6)+"."+coms[i].founded_date.substring(6,8);
		td5.innerHTML = "";
		var len = coms[i].founders.length;
		for (var j=0; j<len-1; j++) {
			td5.innerHTML += coms[i].founders[j].first_name + ' ' + coms[i].founders[j].last_name + ',';
		}
		td5.innerHTML += coms[i].founders[len-1].first_name + ' ' + coms[i].founders[len-1].last_name;		
		td6.innerHTML = coms[i].description;

		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tr.appendChild(td5);
		tr.appendChild(td6);
		document.getElementById("result").appendChild(tr);  
	}
}

// Change the order
function sortName(a,b) {
	if (a.name > b.name) 
		return true;
}


/** Click the clear button 
* @return {} 
*/
oBtn2.onclick = function() {
	// clear the error parts
	document.getElementById("comnameErr").innerHTML = "";
	document.getElementById("fdyearErr").innerHTML = "";
	document.getElementById("fdnameErr").innerHTML = "";
	// clear the input part
	document.getElementById("Company_name").value ="";
	document.getElementById("Founded_year").value ="";
	document.getElementById("Founder_name").value ="";
	// clear the information part
	document.getElementById("result").style.visibility = "hidden";
	document.getElementById("result").innerHTML = "";

}

/** Check if the company name is right
* @param {String} [ssn] [Company name]
* @return {Boolean} 
*/
function checkcomname(ssn) {

	// Check if the name lenght is longer than 15 or not
	if(ssn.length>15) {
		document.getElementById("comnameErr").innerHTML = "<font color='red'>Enter a valid name(1-15)</font>";
		return false;
	}
	// contain numbers and letters
	var re = /^[0-9a-zA-Z]*$/g;
	if(!re.test(ssn)) {
		document.getElementById("comnameErr").innerHTML = "<font color='red'>Made up by numbers,letters</font>";
		return false;
	}
	document.getElementById("comnameErr").innerHTML = "";
	return true;
}

/** Check if the founded year is right
* @param {String} [ssn] [Company name]
* @return {Boolean} 
*/
function checkfdyear(ssn) {
	var date=new Date;  
    var year=date.getFullYear();
    if(ssn== "") {
    	return true;
    }
    // if input year is number and between 1970 and now 
	if( isNaN(ssn) || ssn > year || ssn < 1970 ) {
		document.getElementById("fdyearErr").innerHTML = "<font color='red'>Enter a valid year(1970-now)</font>";
		return false;
	}
	document.getElementById("fdyearErr").innerHTML = "";
	return true;
}

/** Check if the founder name is right
* @param {String} [ssn] [Company name]
* @return {Boolean} 
*/
function checkfdname(ssn) {

	// Check if the name lenght is longer than 15 or not
	if(ssn.length>15) {
		document.getElementById("fdnameErr").innerHTML = "<font color='red'>Enter a name(1-15)</font>";
		return false;
	}
	// contain numbers and letters
	var re = /^[0-9a-zA-Z]*$/g;
	if(!re.test(ssn)) {
		document.getElementById("fdnameErr").innerHTML = "<font color='red'>Made up by letters</font>";
		return false;
	}
	document.getElementById("fdnameErr").innerHTML = "";
	return true;
}



