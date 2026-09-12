//
// Script principal do site Nail's Design de Cílios.
// Responsável pela rotação de slides, visualização de antes/depois,
// geração do calendário de disponibilidade e agendamento interativo.
//

const heroSlides = document.querySelectorAll('.hero-slide');
const compareCards = document.querySelectorAll('[data-compare]');
const calendarContainer = document.getElementById('calendar');
const timeSlots = document.getElementById('timeSlots');
const bookingDaySelect = document.getElementById('bookingDay');
const bookingTimeSelect = document.getElementById('bookingTime');
const bookingForm = document.getElementById('bookingForm');

// Rotação automática dos slides com efeito fade a cada 5 segundos.
let currentSlideIndex = 0;

function showSlide(index) {
  heroSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle('is-active', slideIndex === index);
  });
}

if (heroSlides.length > 0) {
  setInterval(() => {
    currentSlideIndex = (currentSlideIndex + 1) % heroSlides.length;
    showSlide(currentSlideIndex);
  }, 5000);
}

// Alternância de imagens e texto de antes/depois de cada cliente.
compareCards.forEach((card) => {
  const toggleButton = card.querySelector('.compare-toggle');
  const beforePanel = card.querySelector('.before-panel');
  const afterPanel = card.querySelector('.after-panel');

  toggleButton.addEventListener('click', () => {
    const isBeforeVisible = beforePanel.classList.contains('is-visible');

    beforePanel.classList.toggle('is-visible', !isBeforeVisible);
    afterPanel.classList.toggle('is-visible', isBeforeVisible);
    toggleButton.textContent = isBeforeVisible ? 'Mostrar antes' : 'Mostrar depois';
  });
});

// Geração dinâmica do calendário com dias livres e horários disponíveis.
const dayLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const freeDays = new Map();

function addFreeDay(dateString, times) {
  freeDays.set(dateString, times);
}

const today = new Date();
const availableDates = [];

for (let offset = 0; offset < 12; offset += 1) {
  const date = new Date(today);
  date.setDate(today.getDate() + offset);

  const dateString = date.toISOString().split('T')[0];
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

  if (!isWeekend) {
    addFreeDay(dateString, ['09:00', '10:30', '13:00', '15:30', '17:00']);
  } else {
    addFreeDay(dateString, ['11:00', '14:00', '16:30']);
  }

  availableDates.push(dateString);
}

function createCalendar() {
  calendarContainer.innerHTML = '';

  availableDates.forEach((dateString) => {
    const date = new Date(dateString + 'T12:00:00');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'calendar-day is-available';
    button.dataset.date = dateString;
    button.setAttribute('aria-label', `Dia disponível ${date.toLocaleDateString('pt-BR')}`);

    const weekday = document.createElement('span');
    weekday.className = 'weekday';
    weekday.textContent = dayLabels[date.getDay()];

    const dateNumber = document.createElement('span');
    dateNumber.className = 'date';
    dateNumber.textContent = date.getDate();

    button.appendChild(weekday);
    button.appendChild(dateNumber);

    button.addEventListener('click', () => {
      document.querySelectorAll('.calendar-day').forEach((day) => day.classList.remove('is-selected'));
      button.classList.add('is-selected');
      renderTimeSlots(dateString);
    });

    calendarContainer.appendChild(button);
  });

  const firstDay = availableDates[0];
  const firstButton = document.querySelector(`[data-date="${firstDay}"]`);
  if (firstButton) {
    firstButton.classList.add('is-selected');
    renderTimeSlots(firstDay);
  }
}

function renderTimeSlots(dateString) {
  const slots = freeDays.get(dateString) || [];
  timeSlots.innerHTML = '';
  bookingTimeSelect.innerHTML = '';
  bookingDaySelect.innerHTML = '';

  availableDates.forEach((availableDate) => {
    const option = document.createElement('option');
    option.value = availableDate;
    option.textContent = new Date(availableDate + 'T12:00:00').toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      weekday: 'short'
    });

    if (availableDate === dateString) {
      option.selected = true;
    }

    bookingDaySelect.appendChild(option);
  });

  slots.forEach((time) => {
    const slotButton = document.createElement('button');
    slotButton.type = 'button';
    slotButton.className = 'time-button';
    slotButton.textContent = time;
    slotButton.dataset.time = time;

    slotButton.addEventListener('click', () => {
      document.querySelectorAll('.time-button').forEach((button) => button.classList.remove('is-selected'));
      slotButton.classList.add('is-selected');
      bookingTimeSelect.value = time;
    });

    timeSlots.appendChild(slotButton);

    const option = document.createElement('option');
    option.value = time;
    option.textContent = time;
    bookingTimeSelect.appendChild(option);
  });

  if (slots.length > 0) {
    const firstTime = slots[0];
    const firstSlotButton = timeSlots.querySelector(`[data-time="${firstTime}"]`);
    if (firstSlotButton) {
      firstSlotButton.classList.add('is-selected');
    }
    bookingTimeSelect.value = firstTime;
  }
}

createCalendar();

// Validação do formulário de agendamento e feedback simples ao usuário.
bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('clientName').value.trim();
  const phone = document.getElementById('clientPhone').value.trim();
  const day = bookingDaySelect.value;
  const time = bookingTimeSelect.value;

  if (!name || !phone || !day || !time) {
    alert('Preencha todos os campos para concluir o agendamento.');
    return;
  }

  const dateText = new Date(`${day}T12:00:00`).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long'
  });

  alert(`Agendamento confirmado para ${name}! Dia ${dateText} às ${time}. Entraremos em contato pelo telefone ${phone}.`);
  bookingForm.reset();
  createCalendar();
});
