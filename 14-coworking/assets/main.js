// los render, verificar el localstorage y la funcion init

const cardsContainer = document.getElementById('cards-container');
const form = document.getElementById('form');

let agenda = JSON.parse(localStorage.getItem('agenda')) || [];

const saveLocalStorage = () => {
    localStorage.setItem('agenda', JSON.stringify(agenda))
};

const saveData = () => {
    agenda = [
        ...agenda,
        {
            id: agenda.length + 1,
            name: nameInput.value,
            surname: surnameInput.value,
            phone: phoneInput.value,
            email: emailInput.value,
            date:  formatDate(dateInput.value),
            time: hourInput.value,
            quantity: getRadioValue(radioInputs),
            extras: getCheckedOptions(checkboxInputs),
            about: aboutInput.value,
        }
    ]
}

const renderTurn = (turn) => {
    // va a renderizar nuestro turno
    // console.log(turn)
    const { id, name, surname, phone, email, date, time, quantity, extras } = turn;
    return `
        <div class="card ${setCardBackground(quantity)}">
        <div class="card__left">
            <h2 class="card__title"> ORDEN: N°${id} - ${name} ${surname}</h2>
            <p class="card__qty"> ${quantity} </p>
            <p class="card__extras"> Extras: ${extras} </p>
            <div class="tags">
              <span class="card__hour ${setTimeBackground(quantity)}"> ${time} HS</span>
              <span class="card__date ${setDateBackground(quantity)}"> ${date} </span>
            </div>
        </div>
        <div class="card__right">
          <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${email}" target="_blank"> <i class="fa-solid fa-envelope"></i> </a>
          <a href="https://api.whatsapp.com/send?phone=+549${phone}&text=Boenas" target="_blank"> <i class="fa-solid fa-phone-flip"></i> </a>
          <img src=${setCardImg(quantity)} class="card__img ${setCardImgClass(quantity)}" alt="imagen">
        </div>
        </div>
    `
}

const renderAgenda = () => {
    cardsContainer.innerHTML = agenda.map((turn) => renderTurn(turn)).join('');
}

const submitForm = (e) => {
    e.preventDefault();
    if(isValidForm()) {
        saveData();
        // console.log(agenda);
        form.reset();
        saveLocalStorage();
        renderAgenda();
        // volver a setear la fecha.
        setDateIntervals();
    }
}

const init = () => {
    renderAgenda();
    // al cargar la pagina se setee los limites de la fecha del input
    window.addEventListener('DOMContentLoaded', setDateIntervals);
    form.addEventListener('submit', submitForm);
}

init();

