let checkinDate = null;
let checkoutDate = null;
let extraDate = null;
let isHiddenBar = false;

function showHiddenSearchBar(){
    isHiddenBar = true;
    document.getElementById('mainSearchBar').style.display = 'none'
    document.getElementById('hiddenSearchbar').style.display = 'flex';

}

function hideHiddenSearchBar(){
    isHiddenBar = false;
    document.getElementById('mainSearchBar').style.display = 'flex'
    document.getElementById('hiddenSearchbar').style.display = 'none';
}


function selectSection(sectionId) {
    document.querySelectorAll('.search-bar1 > div').forEach(div => {
        div.classList.remove('selected');
        if (div.id === 'where-section') {
            document.getElementById('region-popup').style.display = 'none';
        }
        if (div.id === 'checkin-section' || div.id === 'checkout-section') {
            document.getElementById('calendar-popup').style.display = 'none';
        }
        if (div.id === 'who-section') {
            document.getElementById('guest-popup').style.display = 'none';
        }
    });
    document.getElementById(sectionId).classList.add('selected');
    if (sectionId === 'where-section') {
        const whereSection = document.getElementById('where-section');
        const popup = document.getElementById('region-popup');
        const rect = whereSection.getBoundingClientRect();
        popup.style.top = `${rect.bottom + window.scrollY}px`; /* Adjust for scrolling */
        popup.style.left = `${rect.left + window.scrollX}px`; /* Adjust for scrolling */
        popup.style.display = 'block';
    } else if (sectionId === 'checkin-section' || sectionId === 'checkout-section') {
        const checkinSection = document.getElementById('checkin-section');
        const popup = document.getElementById('calendar-popup');
        const rect = checkinSection.getBoundingClientRect();
        popup.style.top = `${rect.bottom + window.scrollY}px`; /* Adjust for scrolling */
        popup.style.left = `${rect.left + (checkinSection.offsetWidth / 2) - (popup.offsetWidth / 2) + window.scrollX}px`; /* Center the popup */
        popup.style.display = 'block';
    } else if (sectionId === 'who-section') {
        const whoSection = document.getElementById('who-section');
        const popup = document.getElementById('guest-popup');
        const rect = whoSection.getBoundingClientRect();
        popup.style.top = `${rect.bottom + window.scrollY}px`; /* Adjust for scrolling */
        popup.style.left = `${rect.left + window.scrollX}px`; /* Adjust for scrolling */
        popup.style.display = 'block';
    }
}

function switchTab(element, tabName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    element.classList.add('active');

    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
}

// Event listener to reposition the popups on window resize or zoom
window.addEventListener('resize', () => {
    const selectedSection = document.querySelector('.selected');
    if (selectedSection && selectedSection.id === 'where-section') {
        const whereSection = document.getElementById('where-section');
        const popup = document.getElementById('region-popup');
        const rect = whereSection.getBoundingClientRect();
        popup.style.top = `${rect.bottom + window.scrollY}px`;
        popup.style.left = `${rect.left + window.scrollX}px`;
    } else if (selectedSection && (selectedSection.id === 'checkin-section' || selectedSection.id === 'checkout-section')) {
        const checkinSection = document.getElementById('checkin-section');
        const popup = document.getElementById('calendar-popup');
        const rect = checkinSection.getBoundingClientRect();
        popup.style.top = `${rect.bottom + window.scrollY}px`;
        popup.style.left = `${rect.left + (checkinSection.offsetWidth / 2) - (popup.offsetWidth / 2) + window.scrollX}px`;
    } else if (selectedSection && selectedSection.id === 'who-section') {
        const whoSection = document.getElementById('who-section');
        const popup = document.getElementById('guest-popup');
        const rect = whoSection.getBoundingClientRect();
        popup.style.top = `${rect.bottom + window.scrollY}px`;
        popup.style.left = `${rect.left + window.scrollX}px`;
    }
});

// Close popup when clicked outside
document.addEventListener('click', function (event) {
    const regionPopup = document.getElementById('region-popup');
    const calendarPopup = document.getElementById('calendar-popup');
    const guestPopup = document.getElementById('guest-popup');
    const searchBar = document.getElementById('headerdiv');
    const mainSearchBar = document.getElementById('mainSearchBar');
    const headers = document.getElementsByTagName('header');

    if(isHiddenBar){
        if (!searchBar.contains(event.target)) {
            regionPopup.style.display = 'none';
            calendarPopup.style.display = 'none';
            guestPopup.style.display = 'none';
            document.querySelectorAll('.search-bar1 > div').forEach(div => {
                div.classList.remove('selected');
            });
            hideHiddenSearchBar();
        }
        
        

    }

    
});

function updateCounter(id, increment) {
    const countSpan = document.getElementById(`count-${id}`);
    let count = parseInt(countSpan.textContent);
    count = increment ? count + 1 : count - 1;
    countSpan.textContent = count;

    document.getElementById(`dec-${id}`).disabled = count === 0;
}

document.getElementById('inc-adults').addEventListener('click', () => updateCounter('adults', true));
document.getElementById('dec-adults').addEventListener('click', () => updateCounter('adults', false));
document.getElementById('inc-children').addEventListener('click', () => updateCounter('children', true));
document.getElementById('dec-children').addEventListener('click', () => updateCounter('children', false));
document.getElementById('inc-infants').addEventListener('click', () => updateCounter('infants', true));
document.getElementById('dec-infants').addEventListener('click', () => updateCounter('infants', false));
document.getElementById('inc-pets').addEventListener('click', () => updateCounter('pets', true));
document.getElementById('dec-pets').addEventListener('click', () => updateCounter('pets', false));

function formatDate(inputDate) {
    // Split the input date string
    const [year, month, day] = inputDate.split('-');

    // Create a new Date object
    const date = new Date(year, month - 1, day); // month is 0-based in JS Date

    // Define an array with month names
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Get the month name and day
    const monthName = monthNames[date.getMonth()];
    const dayOfMonth = date.getDate();

    if (extraDate) {
        return `${monthName} ${dayOfMonth} ± ${extraDate}`;
    }

    // Format the result
    return `${monthName} ${dayOfMonth}`;
}

// Update Date
function selectDate(date) {
    if (!checkinDate || (checkinDate && checkoutDate)) {
        checkinDate = date;
        checkoutDate = null;
        document.getElementById('checkin').value = formatDate(date);
        document.getElementById('checkout').value = '';
    } else {
        if (new Date(date) > new Date(checkinDate)) {
            checkoutDate = date;
            document.getElementById('checkout').value = formatDate(date);
        } else {
            checkinDate = date;
            document.getElementById('checkin').value = formatDate(date);
            checkoutDate = null;
            document.getElementById('checkout').value = '';
        }
    }
}

function renderDate() {
    if (checkinDate) {
        document.getElementById('checkin').value = formatDate(checkinDate);
    }

    if (checkoutDate) {
        document.getElementById('checkout').value = formatDate(checkoutDate);
    }


}

// Extra dates

function addExtraDate(value) {
    extraDate = value
    renderDate();
    console.log(extraDate)
}




function copyLink() {
    const el = document.createElement('textarea');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Link copied to clipboard!');
}

function openModal() {
    var modal = document.getElementById('modal');
    modal.style.display = 'flex'; // Display modal
    setTimeout(function () {
        modal.style.opacity = 1; // Fade in modal
    }, 10); // Small delay to ensure transition effect
}


function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function saveItem() {

    btnState = localStorage.getItem('saved');

    if (btnState) {
        document.getElementById('saveIcon').style.fill = 'white'
        localStorage.removeItem('saved')

    }

    else {
        localStorage.setItem('saved', 1);
        document.getElementById('saveIcon').style.fill = 'red'
    }



}

function loadButtonState(status) {
    const isSaved = localStorage.getItem(status);
    if (isSaved) {
        document.getElementById('saveIcon').style.fill = 'red'
    }
}

const photos = ["img1.jpg", "img2.jpg", "img3.jpg"];
let currentIndex = 0;



function updateGallery() {
    document.getElementById("gallery-img").src = photos[currentIndex];
    document.getElementById("photo-counter").innerText = `${currentIndex + 1}/${photos.length}`;
}

function prevPhoto() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : photos.length - 1;
    updateGallery();
}

function nextPhoto() {
    currentIndex = (currentIndex < photos.length - 1) ? currentIndex + 1 : 0;
    updateGallery();
}

function closeGallery() {
    document.getElementById("gallery-container").style.display = "none";
    document.getElementById('main').style.display = 'block'
}

function openGallery() {
    document.getElementById('main').style.display = 'none';
    document.getElementById("gallery-container").style.display = 'flex';
}


document.addEventListener('DOMContentLoaded', () => {
    loadButtonState('saved');
    updateGallery();
});