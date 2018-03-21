
//var submitbtn = document.querySelector("input[type='submit']");
//var clearbtn = document.querySelector("input[type='reset']")

// The function after ckick submit
function validation(){
	var comname = document.getElementById("Company_name").value;
	var fdyear = document.getElementById("Founded_year").value;
	var fdname = document.getElementById("Founder_name").value;
	if (checkcomname(comname) && checkfdyear(fdyear) && checkfdname(fdname)) {
		var requestURL = 'https://github.com/fengwfrank/api/blob/master/companies.json';
		getJSON(requestURL,comname,fdyear,fdname);
	}
	else 
		return false;

}

//check company name
function checkcomname(ssn){
	if(ssn.length>15) {
		getElementById("comnameErr").innerHTML = "<font color='red'>Please enter a valid name(1-15)</font>";
		form.Company_name.focus();
		return false;
	}
	if(!isSsnString) {
		getElementById("comnameErr").innerHTML = "<font color='red'>Only be made up by numbers and letters</font>";
		form.Company_name.focus();
		return false;
	}
	getElementById("comnameErr").innerHTML = "";
	return ture
}

//check founder year
function checkfdyear(ssn){
	n = new Data()
	if( isNaN(ssn) || ssn > n.getFullYear() || ssn < 1970 ) {
		getElementById("fdyearErr").innerHTML = "<font color='red'>Please enter a valid year(1970-now)</font>";
		form.Founded_year.focus();
		return false;
	}
	getElementById("fdyearErr").innerHTML = "";
	return true;
}

// check founder name
function checkfdname(ssn){
	if(ssn.length>15) {
		getElementById("fdnameErr").innerHTML = "<font color='red'>Please enter a valid name(1-15)</font>";
		form.Founder_name.focus();
		return false;
	}
	if(!isSsnname) {
		getElementById("fdnameErr").innerHTML = "<font color='red'>Only be made up by letters</font>";
		form.Founder_name.focus();
		return false;
	}
	getElementById("fdnameErr").innerHTML = "";
	return ture
}

// check string if only contains letters and mnumbers
function isSsnString(ssn) {
	var re = /^[0-9a-zA-Z]*$/g;
	if(re.test(ssn))
		return true;
	else
		return false;
}

// check string if only contains letters
function isSsnname(ssn) {
	var re = /^[a-zA-Z]*$/g;
	if(re.test(ssn))
		return true;
	else
		return false;
}

//read json data after check inputs
function getJSON(URL) {
	var request = new XMLHttpRequest();
	//request.responseType = 'json';
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status==200) {
			var obj = JSON.parse(this.responseText);
			txt += "<table border='1'vertical-align="middle">"
			txt +="<thread ><tr bgcolor="#FF0000"><th>Logo</th><th>Company Name</th><th>Officail Website</th><th>Founded Date</th><th>Founder(s)</th><th>Discriptions</th></tr></thread>"
        	for (x in myObj) {
            	txt += "<tr><td>" + myObj[x].name + "</td></tr>";
        	}	
        txt += "</table>" 
        document.getElementById("demo").innerHTML = txt;

		}
	request.open('GET',URL,true);
	request.send();
	}

	request.onload = function() {
  	var obj = JSON.parse(this.responseText);
  	var txt = "";
  	for (var i=0; i<companies.length;i++) {

  	}

	}

}








