const btns__months = document.querySelectorAll('.calendar__month__arrow');
const calendar__month__slide = document.querySelector('.calendar__month__slide');
const calendat__days = document.querySelector('.calendar__days');

let current_date = new Date();
let displacement_value = current_date.getMonth();
let date = new Date(new Date().getFullYear(), 1, 1);

btns__months[0].onclick = () => {
    displacement_value = displacement_value > 0 ? displacement_value - 1 : 11;
    updateMonth();
}

btns__months[1].onclick = () => {
    displacement_value = displacement_value < 11 ? displacement_value + 1 : 0;
    updateMonth();
}


const updateMonth = () => {
    
    const getTotalDays = month => {
        const isLeap = () => {
            const currentYear = new Date().getFullYear();
            return ((currentYear % 100 !==0) && (currentYear % 4 === 0) || (currentYear % 400 === 0));
        }
        if(month === -1) month = 11;

        if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
            return  31;

        } else if (month == 3 || month == 5 || month == 8 || month == 10) {
            return 30;

        } else {
            return isLeap() ? 29:28;
        }
    }

    // first__month.style = 'margin-left: ' + (displacement_value * 165) + 'px';
    calendar__month__slide.style = `margin-left: ${-displacement_value * 165}px;`;

    const days_q = getTotalDays(displacement_value);
    calendat__days.innerHTML = '';

    date.setMonth(displacement_value);
    // console.log(date.getDay());

    for(let i = 0; i < date.getDay(); i++)
    {
        calendat__days.innerHTML += `
        <div class="calendar__day calendar__day__nshow">
            <div class="calendar__day__effect"></div>
        </div>
        `
    }
    
    let dateTemp = new Date(new Date().getFullYear(), displacement_value, 1);
    for(let i = 0; i < days_q; i++) {
        dateTemp.setDate(i + 1);
        let _class = (dateTemp.getDay()===0? "sunday" : "");
        let _active_day = current_date.getDate() == dateTemp.getDate() && current_date.getMonth() == dateTemp.getMonth() ? "active__day" : "";
        calendat__days.innerHTML += `
        <div class="calendar__day ${_class} ${_active_day}">
            <div>${i + 1}</div>
            <div class="calendar__day__effect"></div>
        </div>
        `
    }
} 


updateMonth();

const section__calendar = document.querySelector('.section-calendar');
const calendar__close__btn = document.querySelector('.calendar__close__btn');
const btn__toggle__calendar = document.querySelector('.btn__toggle__calendar');

calendar__close__btn.onclick = () => {
    section__calendar.classList.remove('active');
}

btn__toggle__calendar.onclick = () => {
    section__calendar.classList.add('active');
}

const bloq__add__icon = document.querySelector('.bloq__add__icon');
const win__add__bloq = document.querySelector('.win__addb');
const addb__close = document.querySelector('.addb__close');
const addb__accept = document.querySelector('.addb__accept');
const bloq__days__content = document.querySelector('.admin__bloq__days__elements');
bloq__add__icon.onclick = () => {
    win__add__bloq.classList.add('active');
}

addb__close.onclick = () => {
    win__add__bloq.classList.remove('active');

}

// addb__accept.onclick = () => {
//     const addb__inputs = document.querySelectorAll('.win__addb__input');
//     const desc = addb__inputs[0].value;
//     const mind = addb__inputs[1].value;
//     const minm = addb__inputs[2].value;
//     const maxd = addb__inputs[3].value;
//     const maxm = addb__inputs[4].value;

//     bloq__days__content.innerHTML += `
//     <div class="admin__bloq__day">
//         <div class="bloq__day__info">
//             ${desc}
//         </div>
//         <div class="bloq__actions">
//             <div class="bloq__day__action action__read">
//                 <ion-icon name="eye"></ion-icon>
//             </div>
//             <div class="bloq__day__action action__update">
//                 <ion-icon name="refresh"></ion-icon>
//             </div>
//             <div class="bloq__day__action action__delete">
//                 <ion-icon name="close"></ion-icon>
//             </div>
//         </div>
//     </div>
//     `
//     win__add__bloq.classList.remove('active');
// }