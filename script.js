document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('os-stecaj-form');
	const modalOverlay = document.querySelector('.os-modal-overlay');
	const closeBtn = document.querySelector('.os-modal-close');
	
	function closeModal() {
      if (modalOverlay) {
         modalOverlay.classList.add('os-hidden');
         setTimeout(() => {
            if (form) {
               form.reset();
               // Если есть функция сброса динамических полей и ошибок:
               // resetDynamicFields(); 
               // removeAllErrors(); 
            }
         }, 300);
      }
   }

   if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
         e.preventDefault();
         closeModal();
      });
   }

   // Закрытие по клику на фон
   if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
         if (e.target === modalOverlay) {
            closeModal();
         }
      });
   }
   
   document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modalOverlay.classList.contains('os-hidden')) {
         closeModal();
      }
   });

	if (!form) return;

	form.setAttribute('novalidate', 'true');

	const jobStatusSelect = document.getElementById('os-job-status');
	const fieldsEmployed = document.getElementById('os-fields-employed');
	const fieldsUnemployed = document.getElementById('os-fields-unemployed');
	

	function resetDynamicFields() {
		[fieldsEmployed, fieldsUnemployed].forEach(group => {
			group.classList.remove('os-active');
			group.style.display = 'none';
			const selects = group.querySelectorAll('.os-select');
			selects.forEach(select => {
				select.value = ""; 
				removeError(select);
			});
		});
	}

	resetDynamicFields();

	jobStatusSelect.addEventListener('change', function () {
		resetDynamicFields();
		removeError(this);

		if (this.value === 'employed') {
			fieldsEmployed.classList.add('os-active');
			fieldsEmployed.style.display = 'block';
		} else if (this.value === 'unemployed') {
			fieldsUnemployed.classList.add('os-active');
			fieldsUnemployed.style.display = 'block';
		}
	});

	function showError(element, message = "To polje je obvezno") {
		removeError(element);

		const group = element.closest('.os-input-group');

		if (element.tagName === 'SELECT') {
			element.closest('.os-select-wrapper').classList.add('os-error');
		} else {
			element.classList.add('os-error');
		}

		const errorText = document.createElement('span');
		errorText.className = 'os-error-text';
		errorText.innerText = message;
		group.appendChild(errorText);
	}

	function removeError(element) {
		const group = element.closest('.os-input-group');
		if (!group) return;

		if (element.tagName === 'SELECT') {
			const wrapper = element.closest('.os-select-wrapper');
			if (wrapper) wrapper.classList.remove('os-error');
		} else {
			element.classList.remove('os-error');
		}

		const errorText = group.querySelector('.os-error-text');
		if (errorText) {
			errorText.remove();
		}
	}

	function isValidEmail(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	function isOnlyLetters(text) {
		return /^[a-zA-ZčšžČŠŽćđĆĐ\s\-]+$/.test(text);
	}

	form.querySelectorAll('.os-input, .os-select').forEach(element => {
		element.addEventListener('input', () => removeError(element));
		element.addEventListener('change', () => removeError(element));
	});

	// --- ОБРАБОТЧИК КНОПКИ ОТПРАВКИ ---
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		let isFormValid = true;

		const inputs = form.querySelectorAll('.os-input');
		inputs.forEach(input => {
			const val = input.value.trim();

			if (!val) {
				showError(input, "To polje je obvezno");
				isFormValid = false;
				return; 
			}

			if (input.name === 'full_name') {
				if (!isOnlyLetters(val)) {
					showError(input, "Dovoljene so samo črke");
					isFormValid = false;
				} else if
					(val.length < 3) {
					showError(input, "Vnesite vsaj 3 znaka");
					isFormValid = false;
				}
			}
			else if (input.name === 'location') {
				if (!isOnlyLetters(val)) {
					showError(input, "Dovoljene so samo črke");
					isFormValid = false;
				} else if
					(val.length < 2) {
					showError(input, "Vnesite vsaj 2 znaka");
					isFormValid = false;
				}
			}
			else if (input.type === 'email') {
				if (!isValidEmail(val)) {
					showError(input, "Vnesite veljaven e-poštni naslov");
					isFormValid = false;
				}
			}
			else if (input.type === 'tel') {
				const phoneClean = val.replace(/[\s+]/g, '');
				if (phoneClean.length < 6 || isNaN(phoneClean)) {
					showError(input, "Vnesite veljavno telefonsko številko");
					isFormValid = false;
				}
			}
		});

		if (!jobStatusSelect.value || jobStatusSelect.value === "status") {
			showError(jobStatusSelect, "To polje je obvezno");
			isFormValid = false;
		}

		const activeGroup = document.querySelector('.os-dynamic-group.os-active');
		if (activeGroup) {
			const activeSelects = activeGroup.querySelectorAll('.os-select');
			activeSelects.forEach(select => {
				if (!select.value) {
					showError(select, "To polje je obvezno");
					isFormValid = false;
				}
			});
		}

		// Если всё отлично — отправляем!
		if (isFormValid) {
			console.log("Форма успешно заполнена и готова к отправке!");
			// form.submit(); // Раскомментируй эту строку, когда будешь готов отправлять данные на сервер
		}
	});
});