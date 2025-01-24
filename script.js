document.addEventListener('DOMContentLoaded', () => {
    const exerciseForm = document.getElementById('exercise-form');
    const exerciseList = document.getElementById('exercise-list');
    const toggleViewButton = document.getElementById('toggle-view');
    const toggleBackButton = document.getElementById('toggle-back');
    const flipContainer = document.querySelector('.flip-container');
    const dayCheckboxes = document.querySelectorAll('.days-list input[type="checkbox"]');

    // Carregar dados salvos
    loadExercises();
    loadDayStates();

    // Adicionar exercício
    exerciseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('exercise-name').value;
        const reps = document.getElementById('exercise-reps').value;
        const sets = document.getElementById('exercise-sets').value;
        const weight = document.getElementById('exercise-weight').value;

        const exercise = { name, reps, sets, weight };
        saveExercise(exercise);
        addExerciseToList(exercise);
        exerciseForm.reset();
    });

    // Alternar para a vista de dias
    toggleViewButton.addEventListener('click', () => {
        flipContainer.classList.add('flipped');
    });

    // Voltar para a vista de exercícios
    toggleBackButton.addEventListener('click', () => {
        flipContainer.classList.remove('flipped');
    });

    // Salvar estado dos checkboxes
    dayCheckboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => {
            saveDayState(index, checkbox.checked);
        });
    });

    function saveExercise(exercise) {
        const exercises = JSON.parse(localStorage.getItem('exercises')) || [];
        exercises.push(exercise);
        localStorage.setItem('exercises', JSON.stringify(exercises));
    }

    function loadExercises() {
        const exercises = JSON.parse(localStorage.getItem('exercises')) || [];
        exercises.forEach(addExerciseToList);
    }

    function addExerciseToList(exercise) {
        const li = document.createElement('li');
        li.textContent = `${exercise.name} - ${exercise.reps} reps x ${exercise.sets} sets @ ${exercise.weight} kg`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.style.marginLeft = '10px';
        deleteButton.addEventListener('click', () => {
            removeExercise(exercise);
            li.remove();
        });

        li.appendChild(deleteButton);
        exerciseList.appendChild(li);
    }

    function removeExercise(exerciseToRemove) {
        const exercises = JSON.parse(localStorage.getItem('exercises')) || [];
        const updatedExercises = exercises.filter(exercise => 
            exercise.name !== exerciseToRemove.name ||
            exercise.reps !== exerciseToRemove.reps ||
            exercise.sets !== exerciseToRemove.sets ||
            exercise.weight !== exerciseToRemove.weight
        );
        localStorage.setItem('exercises', JSON.stringify(updatedExercises));
    }

    function saveDayState(index, state) {
        const dayStates = JSON.parse(localStorage.getItem('dayStates')) || [];
        dayStates[index] = state;
        localStorage.setItem('dayStates', JSON.stringify(dayStates));
    }

    function loadDayStates() {
        const dayStates = JSON.parse(localStorage.getItem('dayStates')) || [];
        dayCheckboxes.forEach((checkbox, index) => {
            checkbox.checked = dayStates[index] || false;
        });
    }
});
