// database of gas stations
const Stations = {
    "nw-coq":{
        "1km":{name:"Petro-Canada", address: "Petro-Canada+12th+Street+New+Westminster"}
        ,
        "2km":{name:"7-Eleven", address: "7-Eleven+6th+Street+New+Westminster"},
        "5km":{name:"Petro-Canada", address: "Petro-Canada+7890+Canada+Way+Burnaby"}
    },
    "coq-nw":{
        "2km":{name:"Petro-Canada", address: "Petro-Canada+Johnson+Street+Coquitlam"},
        "5km":{name:"Esso", address: "Esso+2090+Lougheed+Highway+Coquitlam"}
    },
    "ec-nw":{
        "1km":{name:"Shell", address: "Shell+1786+Main+Street+Vancouver"}
        ,
        "2km":{name:"Petro-Canada", address: "Petro-Canada+1289+E+Broadway+Vancouver"},
        "5km":{name:"7-Eleven", address: "7-Eleven+4064+Fraser+Street+Vancouver"}
    },
    "nw-ec":{
        "1km":{name:"Petro-Canada", address: "Petro-Canada+12th+Street+New+Westminster"}
        ,
        "2km":{name:"7-Eleven", address: "7-Eleven+6th+Street+New+Westminster"},
        "5km":{name:"Petro-Canada", address: "Petro-Canada+7890+Canada+Way+Burnaby"}
    }
};
const routes = {
    "nw-coq":{
        origin: "Douglas+College+New+Westminster",
        destination: "Douglas+College+Coquitlam",
        distance:15.8,
        time:16
    },
    "coq-nw":{
        destination: "Douglas+College+New+Westminster",
        origin: "Douglas+College+Coquitlam",
        distance:15.8,
        time:17
    },
    "ec-nw":{
        origin:"Emily+Carr+University",
        destination:"Douglas+College+New+Westminster",
        distance:29.7,
        time:24
    },
    "nw-ec":{
        destination:"Emily+Carr+University",
        origin:"Douglas+College+New+Westminster",
        distance:29.8,
        time:25
    }
};



function validateRouteForm(form){
    let valid = true;
    if(!form.route.value){
        showFieldError(form.route, "Please select route.");
        valid = false;
    }else{
        clearFieldError(form.route);
    }

    if(!form.detour.value){
        showFieldError(form.detour, "Please select a detour distance.");
        valid = false;
    }else{
        clearFieldError(form.detour);
    }
    return valid;
}
function updateMap(apiKey, origin, destination, waypoint = ""){
    let mapUrl = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}`;
    mapUrl+= `&origin=${origin}&destination=${destination}`;

    if(waypoint) {
        mapUrl += `&waypoints=${waypoint}`;
    }

    const mapFrame = document.getElementById("mapFrame");
    if(mapFrame){
        mapFrame.src = mapUrl;
    }

}
function showFieldError(field, message){
    field.classList.add("invalid");
    const errorElement = field.nextElementSibling;
    if(!errorElement || !errorElement.classList.contains("error-message")) {
        errorElement = document.createElement("span");
        errorElement.className = "error-message";
        field.parentElement.insertBefore(errorElement, field.nextSibling);
    }

    errorElement.textContent = message;
}
function clearFieldError(field){
    field.classList.remove("invalid");
    const errorElement = field.nextElementSibling;
    if(errorElement && errorElement.classList.contains("error-message")){errorElement.textContent = "";
    }
}
function showError(message){
    const errorDiv = document.getElementById("error-message");
    if(errorDiv){
        errorDiv.textContent = message;
        errorDiv.style.display = "block";
    }
    else{
        alert(message);
    }
}

function processRoute(form){
    const apiKey = "AIzaSyBt5-Rr_sk4EeSRM-3r8cPRDG1wG_LdhqI";
    const route = form.route.value;
    const detour = form.detour.value;

    const errorDiv = document.getElementById("error-message");
    if(errorDiv){
        errorDiv.textContent = "";
    }
    if(!validateRouteForm(form)){
        return false;
    }

    const routeInfo = routes[route];
    if(!routeInfo){
        showError("Invalid Route Selection");
        return false;
    }

    const station = Stations[route][detour];
    if(!station){
        showError("No Gas stations were found.");
        return false;
    }

    updateMap(apiKey, routeInfo.origin, routeInfo.destination, station.address);

    displayStation(station, detour, routeInfo);

    return false;
}

function displayStation(station, detour, routeInfo){
    const stationInfo = document.getElementById("stationInfo");
    if(!stationInfo) return;

    stationInfo.innerHTML= `
        <h3>Gas Station Details</h3>
        <p><strong>Station Name:</strong> ${station.name}</p>
        <p><strong>Location:</strong> ${station.address.replace(/\+/g, ' ')}</p>
        <p><strong>Detour Distance:</strong> ${detour}</p>
    `;
}

window.onload = function(){
    const form = document.querySelector("form");
    if(form){
        form.addEventListener("reset", function(){
            //clear errors
            const errorFields = document.querySelectorAll(".invalid");
            errorFields.forEach(field => clearFieldError(field));
            //clear info
            const stationInfo = document.getElementById("stationInfo");
            if(stationInfo) {
                stationInfo.innerHTML = "";
            }

            const mapFrame = document.getElementById("mapFrame");
            if(mapFrame){
                mapFrame.src = ""
            }

            const errorMessage = document.getElementById("error-message");
            if(errorMessage)
            {errorMessage.style.display = "none";}
        });
    }
};