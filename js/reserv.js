// import { getDateByDay, getTotalDays } from "../../utils/date.js";

const btns__months = document.querySelectorAll('.calendar__month__arrow');
const calendar__month__slide = document.querySelector('.calendar__month__slide');
const calendat__days = document.querySelector('.calendar__days');
const input__days = document.querySelectorAll('.input__day');
const input__month = document.querySelectorAll('.input__month');
// const all__inputs = document.querySelectorAll('.input__element');

let current_date = new Date();
let displacement_value = current_date.getMonth();
let date = new Date(new Date().getFullYear(), 1, 1);

let reservdays = [0, 0];
let reservmon = [0, 0];

// all__inputs.forEach(input__element => {

//     input__element.addEventListener('input', (e) => {
//         if (input__element.value != '')
//         {
//             input__element.parentElement.classList.add('input__filled');
//         } else {
//             input__element.parentElement.classList.remove('input__filled');
//         }
//     })
// })

input__days.forEach((element) => {
    element.addEventListener('change', (e) => {
        if (element.value <= 0) element.value = 1;
    })

    element.addEventListener('input', (e) => {
        updateReservationDay();
    })
});

input__month.forEach((element) => {
    // element.addEventListener('change', (e) => {
    // })

    // element.value = current_date.getMonth() + 1;

    element.addEventListener('input', (e) => {
        if (element.value <= 0 & element.value != "") element.value = 1;
        updateReservationDay();
    })
});

// input__days[0].addEventListener('input', (e) => {
//     updateReservationDay();
// })


// input__days[1].addEventListener('input', (e) => {
//     updateReservationDay(parseInt());
// })






btns__months[0].onclick = () => {
    displacement_value = displacement_value > 0 ? displacement_value - 1 : 11;
    updateMonth();
}

btns__months[1].onclick = () => {
    displacement_value = displacement_value < 11 ? displacement_value + 1 : 0;
    updateMonth();
}

const updateMonth = () => {
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
    updateReservationDay();
} 


const updateReservationDay = () => {
    let value_1 = input__days[0].value != '' | input__days[0].value == '1'? parseInt(input__days[0].value) : 1;
    let value_2 = input__days[1].value != '' | input__days[1].value == '1'? parseInt(input__days[1].value) : 1;
    
    // console.log(value_1 + ":" + value_2);

    reservdays[0] = value_1 < value_2 ? value_1 : value_2;
    reservdays[1] = value_1 > value_2 ? value_1 : value_2;

    value_1 = input__month[0].value != '' ? parseInt(input__month[0].value) : 1;
    value_2 = input__month[1].value != '' ?  parseInt(input__month[1].value): 1;

    reservmon[0] = value_1 < value_2 ? value_1 - 1 : value_2 - 1;
    reservmon[1] = value_1 > value_2 ? value_1 - 1 : value_2 - 1;

    if (reservdays[0] > reservdays[1]) {
        let aux = reservdays[1];
        reservdays[1] = reservdays[0];
        reservdays[0] = aux;
    }

    let calendar__days = document.querySelectorAll('.calendar__day');

    calendar__days.forEach(element => {
        element.classList.remove('selected__day');
    })
    let day__count = displacement_value == reservmon[0] ? reservdays[0] : 1;
    let day__jumps = 0;

    console.log(day__count);
    if (displacement_value >= reservmon[0])
    {
        for(let i = 0; i < calendar__days.length; i++)
        {
            let days__jumped = i >= day__count + day__jumps - 1;
            if (calendar__days[i].classList.contains('calendar__day__nshow')) {
                day__jumps++;
                continue;   
            }
            
            if (displacement_value >= reservmon[0] & displacement_value >= reservmon[1])
            {
                if (days__jumped) {
                    
                    if (day__count <= reservdays[1]) {
                        calendar__days[i].classList.add('selected__day');
                        day__count++;
                    }
                }
            }
            else
            {
                if ((days__jumped & displacement_value == reservmon[0]) | displacement_value != reservmon[0]) {
                    if (displacement_value < reservmon[1] & displacement_value > reservmon[0]) {
                        calendar__days[i].classList.add('selected__day');
                        day__count++;
                    }
                    else 
                    {
                        calendar__days[i].classList.add('selected__day');
                        // console.log("asd");
                    }
                }
            }
        }
    }

    // console.log(reservdays);
}

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


updateMonth();
