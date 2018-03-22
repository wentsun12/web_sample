var oBtn1 = document.getElementById('btn1');
var oBtn2 = document.getElementById('btn2');

// Click the search button
oBtn1.onclick = function() {
	var comname = document.getElementById("Company_name").value;
	var fdyear = document.getElementById("Founded_year").value;
	var fdname = document.getElementById("Founder_name").value;
	var cn = checkcomname(comname);
	var fdy = checkfdyear(fdyear);
	var fdn = checkfdname(fdname);

	if ( cn && fdy && fdn) {
        var url = '/data/companies.json';
        var url = '/data/companies.json';
        var xhr = new XMLHttpRequest();
        xhr.open('GET',url,true);
        xhr.onload = function() {
        	var data = JSON.parse(xhr.responseText);
        }
        xhr.send();
        alert("ok----get data");

        //send the input imformation
        var ourRequest = new XMLHttpRequest();
        ourRequest.onreadystatechange = function() {
        	if (ourRequest.readyState === 4 && ourRequest.status === 200){
        		alert("ok----send");
      
		// ourData = getdata(url);
		// var txt = "";
		// txt += "<table border='1' vertical-align='middle'>";
		// txt +="<thread ><tr bgcolor='#FF0000'><th>Logo</th><th>Company Name</th><th>Officail Website</th><th>Founded Date</th><th>Founder(s)</th><th>Discriptions</th></tr></thread>";
		// for(i = 0; i < ourData.length; i++) {
		// 	if (ourData[i].name === comname || ourData[i].founded_date[:4] === fdyear) {
		// 		txt += "<tr>";
		// 		txt += "<td><img src='" + "/images/" + ourData[i].logo + "'></img></td>";
		// 		txt += "<td>" +  ourData[i].name + "</td>"; 
		// 		txt += "<td><a href='" +  ourData[i].website + "'></td>";
		// 		txt += "<td>" +  ourData[i].founded_date + "</td>"; 
		// 		var founders = ""
		// 		for (j = 0; j < ourData[i].founders.length; j++) {
		// 			founders += ourData[i].founders[j].first_name + ourData[i].founders[j].last_name + ",";
		// 		}  
		// 		txt += "<td>" + founders + "</td>";
		// 		txt += "<td>" +  ourData[i].descriptions + "</td>"; 
		// 		txt += "</tr>";
		// 	}       		
		// }
		// txt += "</table>" ;
		// document.getElementById("demo").innerHTML = txt;
	
	}
	else 
		return false;
}



// Click clear button
oBtn2.onclick = function() {
	// clear the error parts
	document.getElementById("comnameErr").innerHTML = "";
	document.getElementById("fdyearErr").innerHTML = "";
	document.getElementById("fdnameErr").innerHTML = "";
	// clear the input part
	document.getElementById("Company_name").value ='';
	document.getElementById("Founded_year").value ='';
	document.getElementById("Founder_name").value ='';
	// clear the information part
	document.getElementById("demo").innerHTML = '';

}

//Check name 
function checkcomname(ssn){
	if(ssn.length>15) {
		document.getElementById("comnameErr").innerHTML = "<font color='red'>Please enter a valid name(1-15)</font>";
		return false;
	}
	var re = /^[0-9a-zA-Z]*$/g;
	if(!re.test(ssn)) {
		document.getElementById("comnameErr").innerHTML = "<font color='red'>Only be made up by numbers and letters</font>";
		return false;
	}
	document.getElementById("comnameErr").innerHTML = "";
	return true;
}

// Check founded year
function checkfdyear(ssn){
	var date=new Date;  
    var year=date.getFullYear();
	if( isNaN(ssn) || ssn > year || ssn < 1970 ) {
		document.getElementById("fdyearErr").innerHTML = "<font color='red'>Please enter a valid year(1970-now)</font>";
		return false;
	}
	document.getElementById("fdyearErr").innerHTML = "";
	return true;
}

// Check founder name
function checkfdname(ssn){
	if(ssn.length>15) {
		document.getElementById("fdnameErr").innerHTML = "<font color='red'>Please enter a valid name(1-15)</font>";
		return false;
	}
	var re = /^[0-9a-zA-Z]*$/g;
	if(!re.test(ssn)) {
		document.getElementById("fdnameErr").innerHTML = "<font color='red'>Only be made up by letters</font>";
		return false;
	}
	document.getElementById("fdnameErr").innerHTML = "";
	return true;
}

