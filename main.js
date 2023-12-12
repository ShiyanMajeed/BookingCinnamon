const singleRP = 25000;
const doubleRP = 35000;
const tripleRP = 40000;
const extraBed = 8000;
const kidsMeal = 5000;
const localadultP = 5000;
const localchildP = 1000;
const foreignAdultp = 10000;
const foreignChildp = 2000;

let RoomCost;
let totalRoomCost = 0;
let adultPrice;
let childPrice;
let durationOfStay = 0;
let loyalty = 0;
let ADVadultcost = 0;
let ADVchildcost = 0;
let SubTotCost;
let TOtalADVcost;

const bookingForm = document.getElementById('booking-form');
const AdventuresForm = document.getElementById('Adventure-form'); // Change getElementsById to getElementById
const AdventureInputs = document.querySelectorAll('#Adventure-form input');

const Name = document.getElementById('name');
const Email = document.getElementById('email');
const Phone = document.getElementById('phone');
const Adults = document.getElementById('adult');
const children = document.getElementById('child');
const Checkin = document.getElementById('checkin-date');
const Checkout = document.getElementById('checkout-date');
const ExtraBed = document.getElementById('Extra-Beds');
const Singles = document.getElementById('Single');
const Doubles = document.getElementById('Double');
const Triples = document.getElementById('Triple');
const txtoverallRoombooking = document.getElementById('overallBookingRM');
const txtoverallAdventure = document.getElementById('overallBookingAD')
const bookroominputs = document.querySelectorAll("#booking-form input");
const btnBookNow = document.getElementById('bookNow');
const txtcurrentBooking = document.getElementById('booking');
const extras = document.getElementsByName('extra');
const btnfavi = document.getElementById('favourite');
const btnloyal = document.getElementById('loyalty');
const PromoCode = document.getElementById('promo');
const Residence = document.getElementsByName('Country');
const Ladults = document.getElementById('Localadult');
const Lchild = document.getElementById('Localchild');
const Fadults = document.getElementById('ForeignAdult');
const Fchild = document.getElementById('ForeignChild');
const btnBookADv = document.getElementById('bookAdventure');
const ArrivalDate = document.getElementById('arrival-time');
const ADVCountry = document.getElementsByName('Country');
const txtADVbooking = document.getElementById('ADVbooking');
const durationOfAD = document.getElementById('duration');
const AdultGuides = document.getElementById('adultguide');
const childGuides = document.getElementById('kidguide');

function CalculateTotalRoomCost() {
  let numsingle = parseInt(Singles.value) || 0;
  let numdouble = parseInt(Doubles.value) || 0;
  let numtriple = parseInt(Triples.value) || 0;
  roomtypecost = numsingle * singleRP + numdouble * doubleRP + numtriple * tripleRP;
  let kidsmealscost = parseInt(children.value) * kidsMeal || 0;
  let extrabedscost = parseInt(ExtraBed.value) * extraBed || 0;
  durationstayed = Math.round(Math.abs((new Date(Checkout.value) - new Date(Checkin.value)) / (24 * 60 * 60 * 1000)));
  RoomCost = ((roomtypecost + kidsmealscost) * durationstayed) + extrabedscost;
}

bookroominputs.forEach(input => input.addEventListener("input", Displaycurrentbooking));
extras.forEach(checkbox => checkbox.addEventListener("change", Displaycurrentbooking));

function getextras() {
  const checkextras = [];
  extras.forEach(checkbox => { if (checkbox.checked) { checkextras.push(checkbox.id); } });
  return checkextras.join("/");
}

function Displaycurrentbooking() {
  CalculateTotalRoomCost();
  txtcurrentBooking.innerHTML = `
    <h2>Current Booking</h2>
    <p>Number of single rooms: ${Singles.value}</p>
    <p>Number of double rooms: ${Doubles.value}</p>
    <p>Number of triple rooms: ${Triples.value}</p>
    <p>Number of extra bed: ${ExtraBed.value}</p>
    <p>Number of adults: ${Adults.value}</p>
    <p>Number of kids: ${children.value}</p>
    <p>extras: ${getextras()}</p>
    <p>Cost: ${RoomCost}LKR</p>`;
}

btnBookNow.addEventListener("click", updateall);

function updateall(event) {
  event.preventDefault();
  CalculateTotalRoomCost();
  if(PromoCode.value==="Promo123"){
    RoomCost *= 0.95;
  }
  txtoverallRoombooking.innerHTML = `
    <h2>Overall Booking</h2>
    <p>Number of single rooms: ${Singles.value}</p>
    <p>Number of double rooms: ${Doubles.value}</p>
    <p>Number of triple rooms: ${Triples.value}</p>
    <p>Number of extra bed: ${ExtraBed.value}</p>
    <p>Number of adults: ${Adults.value}</p>
    <p>Number of kids: ${children.value}</p>
    <p>extras: ${getextras()}</p>
    <p>Cost: ${RoomCost}LKR</p>`;
    calculateloyalty();

    txtcurrentBooking.innerHTML="<h2>Current Booking</h2>";
    bookingForm.reset();
}

btnfavi.addEventListener('click', favio);

function favio(event){
  event.preventDefault();

  localStorage.removeItem("SaveFav");
  const SaveFav ={
    FullName:Name.value,
    FullEmail:Email.value,
    PhoneNum:Phone.value,
    NumAdults:Adults,
    Numchildren:children,
    NumExtraBed:ExtraBed,
    NumSingles:Singles,
    NumDoubles:Doubles,
    NumTriples:Triples,
  };
  const SaveFavJSON = JSON.stringify(SaveFav);
  localStorage.setItem("SaveFav",SaveFavJSON);
  alert("Save to Favourites");
}

function calculateloyalty(){
  totalBookedrooms = parseInt(Singles.value)+parseInt(Doubles.value)+parseInt(Triples.value);
  if(totalBookedrooms>=3){
    loyalty += totalBookedrooms*20;
  }
}

btnloyal.addEventListener('click', Displayloyal);

function Displayloyal(event){
  event.preventDefault();
  if(loyalty==0 || loyalty===null){
    alert('You have no loyalty')
  }else{
    alert(`you have ${loyalty} Points`);
  }
}

// Adventures
function CalculateADCost(){
  let numberoflocalA = parseInt(Ladults.value) * localadultP;
  let numberofforeignA = parseInt(Fadults.value) * foreignAdultp;
  let numberoflocalC = parseInt(Lchild.value) * localchildP;
  let numberofforeignC = parseInt(Fchild.value) * foreignChildp;
  let durationofADV = parseInt(durationOfAD.value);
  let participationCost = numberoflocalA + numberoflocalC + numberofforeignA + numberofforeignC;
  TOtalADVcost = participationCost * durationofADV;
}

AdventureInputs.forEach(input => input.addEventListener('input', DisplayCurrentAdventureCost))

function DisplayCurrentAdventureCost(){
  CalculateADCost();
  txtADVbooking.innerHTML =`
    <h2>Adventure Booking</h2>
    <p>Number of Local adults: ${Ladults.value}</p>
    <p>Number of local kids: ${Lchild.value}</p>
    <p>Number of Foreign adults: ${Fadults.value}</p>
    <p>Number of Foreign kids: ${Fchild.value}</p>
    <p>Duration: ${durationOfAD.value}</p>
    <p>Cost: ${TOtalADVcost}LKR</p>`;
}

btnBookADv.addEventListener("click", updateallADV);

function updateallADV(event) {
  event.preventDefault();
  CalculateADCost();
  txtoverallAdventure.innerHTML = `
    <h2>Overall Adventure Booking</h2>
    <p>Number of Local adults: ${Ladults.value}</p>
    <p>Number of local kids: ${Lchild.value}</p>
    <p>Number of Foreign adults: ${Fadults.value}</p>
    <p>Number of Foreign kids: ${Fchild.value}</p>
    <p>Duration: ${durationOfAD.value}</p>
    <p>Cost: ${TOtalADVcost}LKR</p>`;

    txtADVbooking.innerHTML="<h2>Current Booking</h2>";
    bookingForm.reset();
}
