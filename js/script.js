// 1. Подставляем текущий год в подвал
document.getElementById('year').textContent = new Date().getFullYear();

// 2. ЛОГИКА КЛИКА ПО КАРТОЧКАМ УСЛУГ
const serviceButtons = document.querySelectorAll('.service-btn');
const serviceSelect = document.getElementById('service');
const appointmentSection = document.getElementById('appointment');

serviceButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    // Находим карточку, внутри которой нажали кнопку
    const card = e.target.closest('.card');
    // Берем название услуги из data-атрибута
    const serviceName = card.getAttribute('data-service');
    
    // Подставляем в выпадающий список
    serviceSelect.value = serviceName;
    
    // Плавно скроллим к форме
    appointmentSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// 3. ВАЛИДАЦИЯ ФОРМЫ
const form = document.getElementById('appointment-form');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const dateInput = document.getElementById('date');
const successMsg = document.getElementById('success-msg');

function showError(input, errorId, message) {
  document.getElementById(errorId).textContent = message;
  input.classList.add('error');
}
function clearError(input, errorId) {
  document.getElementById(errorId).textContent = '';
  input.classList.remove('error');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let isValid = true;
  successMsg.classList.add('hidden');

  // Проверка услуги
  if (serviceSelect.value === "") {
    showError(serviceSelect, 'service-error', 'Пожалуйста, выберите услугу');
    isValid = false;
  } else {
    clearError(serviceSelect, 'service-error');
  }

  // Проверка имени
  if (nameInput.value.trim().length < 2) {
    showError(nameInput, 'name-error', 'Введите имя (минимум 2 буквы)');
    isValid = false;
  } else {
    clearError(nameInput, 'name-error');
  }

  // Проверка телефона
  const phoneDigits = phoneInput.value.replace(/\D/g, ''); 
  if (phoneDigits.length < 10) {
    showError(phoneInput, 'phone-error', 'Введите корректный номер телефона');
    isValid = false;
  } else {
    clearError(phoneInput, 'phone-error');
  }

  // Проверка даты
  if (!dateInput.value) {
    showError(dateInput, 'date-error', 'Выберите дату приема');
    isValid = false;
  } else {
    const selectedDate = new Date(dateInput.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Сбрасываем время для корректного сравнения

    if (selectedDate < today) {
      showError(dateInput, 'date-error', 'Дата не может быть в прошлом');
      isValid = false;
    } else {
      clearError(dateInput, 'date-error');
    }
  }

  // Если всё верно — показываем успех и очищаем форму
  if (isValid) {
    successMsg.classList.remove('hidden');
    form.reset(); 
    
    // Прячем сообщение через 4 секунды
    setTimeout(() => {
      successMsg.classList.add('hidden');
    }, 4000);
  }
});

// Очищаем ошибки при начале ввода
nameInput.addEventListener('input', () => clearError(nameInput, 'name-error'));
phoneInput.addEventListener('input', () => clearError(phoneInput, 'phone-error'));
dateInput.addEventListener('input', () => clearError(dateInput, 'date-error'));
serviceSelect.addEventListener('change', () => clearError(serviceSelect, 'service-error'));