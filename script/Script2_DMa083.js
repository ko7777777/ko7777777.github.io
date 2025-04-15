function calculateCost(){
    const mileage = parseFloat(document.getElementById("mileage").value);
    const distance = parseFloat(document.getElementById("distance").value);
    const price = parseFloat(document.getElementById("price").value);

    if(isNaN(mileage) || isNaN(distance) || isNaN(price) || mileage <= 0 || distance <= 0  || price <= 0 ){
        document.getElementById("costResult").innerHTML = "<h6>Please Enter Valid positive numbers.";
        return false;
    }
    const liters = (distance/100) * mileage;
    const totalCost = liters * price;

    document.getElementById('costResult').innerHTML = `
    <div class="costOutput">
    <h3>Here is your trips cost</h3>
    <p>Distance:${distance.toFixed(2)} km</p>
    <p>Fuel Used:${liters.toFixed(2)} L</p>
    <p>Total Cost of your trip!: $${totalCost.toFixed(2)}</p>`;
    return false;
}