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

        //send the input imformation
        var ourRequest = new XMLHttpRequest();
        ourRequest.onreadystatechange = function() {
        	if (ourRequest.readyState === 4 && ourRequest.status === 200){
        		var data = JSON.parse(ourRequest.responseText);
        		
        		var txt = "";
        		var row = 0;
        		txt += "<hr/><br><br>";
        		txt += "<table border='1' vertical-align='middle' width='100%''>";
        		txt +="<tr bgcolor='#00FFFF'><th>Logo</th><th>Company Name</th><th>Officail Website</th><th>Founded Date</th><th>Founder(s)</th><th>Discriptions</th></tr>";
        		for(i = 0; i < data.length; i++) {
        			if (data[i].name === comname ) {
        				// decide the color of this row
        				row = row + 1;    				
        				if (row % 2 ==0) {
        					txt += "<tr bgcolor='#99ccff'>";
        				}
        				else {
        					txt += "<tr bgcolor='#0066ff'>";
        				}
        				txt += "<td width='10%'><img src='" + "/images/" + data[i].logo + "'></img></td>";
        				txt += "<td width='8%'>" +  data[i].name + "</td>"; 
        				txt += "<td width='12%'><a href='" +  data[i].website + "'>"+data[i].website +"</a></td>";
        				txt += "<td width='10%'>" +  data[i].founded_date + "</td>";
        				// alert(founded_datenew[:4]);
        				var founders = "";
        				for (var j = 0; j < data[i].founders.length; j++) {
        					founders += data[i].founders[j].first_name + " " +data[i].founders[j].last_name + ",";				
        				}
        				txt += "<td width='10%'>" +  founders + "</td>";
				 		txt += "<td width='50%'>" +  data[i].description + "</td>"; 
         				txt += "</tr>";
        			}
        		}
        		txt += "</table>" ;
        		document.getElementById("demo").innerHTML = txt;       		
        	}
        }
        ourRequest.open('GET','data/companies.json',true);
        ourRequest.send();
	
	}
	else 
		return false;
}


// Click the clear button 
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

// Check the company name
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

// Check the founded year
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

// Check the founder name
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









