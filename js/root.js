let button__nav = document.querySelector('.nav__links')
let button__nav__action = document.querySelector('.nav__links__actions');
const all__inputs = document.querySelectorAll('.input__element');
const root = document.querySelector(':root');
const input__slider = document.querySelector('.option__slider__color');
const option__toggle = document.querySelector('.page__option__toggle');
const option__element = document.querySelectorAll('.page__option__element');

let last__option__choosed;

const md__darken = document.querySelector('.md__darken');
const md__lighting = document.querySelector('.md__lighting');

button__nav.onclick = () => {
    button__nav.classList.toggle('active');
}

const resetElementStatus = () => {
    option__element.forEach(e => {
        e.childNodes.forEach(child => {
            if (child.classList != undefined) {
                if (child.classList.contains('page__option__deploy')) {
                    child.classList.remove('active');
                    e.classList.remove('active');
                }
            }
        })
    })
}

const setContrast = value => {
    root.style.setProperty("--body-lighting", value == 'd' ? 10 : 255);
    root.style.setProperty("--body-lighting-ease", value == 'd' ? 30 : 220);
    root.style.setProperty("--body-contrast-lighting", value == 'd' ? 255 : 30);

    root.style.setProperty("--font-lighting", value == 'd' ? 255 : 0);

}

setContrast('s');

if (md__darken != null)
{
    md__darken.onclick = () => {
        setContrast('d');
    }
    
    md__lighting.onclick = () => {
        setContrast('s');
    }

}


option__element.forEach(element => {
    element.onclick = () => {

        resetElementStatus();
        element.childNodes.forEach(child => {
            if (child.classList != undefined) {
                if (child.classList.contains('page__option__deploy')) {
                    if (element == last__option__choosed) {
                        child.classList.remove('active');
                        element.classList.remove('active');
                        last__option__choosed = undefined;
                    } else {
                        child.classList.add('active');
                        element.classList.add('active');
                        last__option__choosed = element;
                    }
                }
            }
        })
    }    
});


if (option__toggle != null) {
    option__toggle.onclick = () => {
        option__toggle.parentElement.classList.toggle('active');
    
        if (!option__toggle.parentElement.classList.contains('active'))
        {
            resetElementStatus();
            last__option__choosed = undefined
        }
    }

}
// input__slider.oninput = () => {
//     const value = (input__slider.value / 100) * 255;
//     root.style.setProperty("--body-lighting", value);
// }


all__inputs.forEach(input__element => {

    input__element.addEventListener('input', (e) => {
        const effect__to__child = input__element.classList.contains('effect__to__child');

        if (input__element.value != '')
        {
            if (!effect__to__child) input__element.parentElement.classList.add('input__filled');
            else input__element.classList.add('input__filled');
        } else {
            if (!effect__to__child) input__element.parentElement.classList.remove('input__filled');
            else input__element.classList.remove('input__filled');
        }
    })
})



const getTotalDays = month => {
    const isLeap = () => {
        const currentYear = current_date.getFullYear();
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


const calendar__days = document.querySelector('.calendar__days');
const day__start = 1;
const current_date = new Date()
const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const calendar__month = document.querySelector('.calendar__month');
const calendar__year = document.querySelector('.calendar__year');
const transition_time = 0.20;
const bloq_days = [
    {
        desc: "Ocupados", 
        day_range: [10,20], 
        month_range: [11, 12], 
        year_range: [2022, 2022]
    },
    {
        desc: "Ocupados", 
        day_range: [1,14], 
        month_range: [1, 1], 
        year_range: [2023, 2023]
    }
];


let target_month = current_date.getMonth();
let target_year = current_date.getFullYear();

const updateCalendar = (month, year) => {
    const date = new Date(year, month, 1);
    const month__days = getTotalDays(month);
    calendar__days.innerHTML = '';

    for(let i = 0; i < date.getDay(); i++) {
        calendar__days.innerHTML += `
        <div class="calendar__day day__space"></div>
        `
    }
    
    for(let i = 0; i < month__days; i++) {
        const active = i+1 == current_date.getDate() & current_date.getMonth() == target_month & current_date.getFullYear() == target_year?  'active' : '';
        let bloq = false;
        const c_day = i+1;
        const c_month = target_month+1;
        bloq_days.forEach(element =>  {
            const min_day = element.day_range[0] < element.day_range[1] ? element.day_range[0] : element.day_range[1];
            const max_day = element.day_range[0] >= element.day_range[1] ? element.day_range[0] : element.day_range[1];
            const min_month = element.month_range[0] < element.month_range[1] ? element.month_range[0] : element.month_range[1];
            const max_month = element.month_range[0] >= element.month_range[1] ? element.month_range[0] : element.month_range[1];
            const min_year = element.year_range[0] < element.year_range[1] ? element.year_range[0] : element.year_range[1];
            const max_year = element.year_range[0] >= element.year_range[1] ? element.year_range[0] : element.year_range[1];
            
            const day_in_range = min_day <= c_day | max_day >= c_day;
            const month_in_range = min_month <= c_month & max_month <= c_month;
            if (target_year == min_year & min_year == max_year) 
            {
                if (c_month >= min_month & c_month < max_month) {
                    if (c_month == min_month & c_day >= min_day) {
                        bloq = true;
                    } 
                    else if (c_month != min_month)bloq = true;
                }
                if (c_month == max_month & c_day <= max_day) bloq = true;
            }
        });

        calendar__days.innerHTML += `
        <div class="calendar__day day__${i + 1} ${active} ${bloq? 'bloq__day' : ''}">
            ${i + 1}
        </div>
        `
    }
    
    calendar__month.innerHTML = months[month];
    calendar__year.innerHTML = year;
}

const reset_calendar_state = () => {
    updateCalendar(target_month, target_year);
    calendar__days.classList.remove('updating');
}

const set_calendar_update_state = () => {
    calendar__days.classList.add('updating');

    setTimeout(() => {
        reset_calendar_state();
    }, transition_time * 1000);
}

updateCalendar(target_month, target_year);

const calendar__year__arrow = document.querySelectorAll('.calendar__year__arrow');
const calendar__month__arrow = document.querySelectorAll('.calendar__month__arrow');



calendar__year__arrow[0].onclick = () => {
    target_year--;
    set_calendar_update_state();
}

calendar__year__arrow[1].onclick = () => {
    target_year++;
    set_calendar_update_state();
}

const month_clamp = () => {
    if (target_month < 0) {
        target_year--;
        target_month = 11;
    }
    if (target_month > 11) {
        target_year++;
        target_month = 0;
    }
}

calendar__month__arrow[0].onclick = () => {
    target_month--;
    set_calendar_update_state();

    month_clamp();
}


calendar__month__arrow[1].onclick = () => {
    target_month++;
    set_calendar_update_state();
    
    month_clamp();
}

const calendar__today__day = document.querySelector('.calendar__today__day');
const calendar__today__month = document.querySelector('.calendar__today__month');

calendar__today__day.innerHTML = `${current_date.getDate()}th`;
calendar__today__month.innerHTML = `${months[current_date.getMonth()]}`;