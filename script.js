document.addEventListener('DOMContentLoaded', () => {
    const exerciseForm = document.getElementById('exercise-form');
    const exerciseList = document.getElementById('exercise-list');
    const toggleViewButton = document.getElementById('toggle-view');
    const toggleBackButton = document.getElementById('toggle-back');
    const flipContainer = document.querySelector('.flip-container');

    // Carregar dados salvos
    loadExercisesFromBackend();

    // Adicionar exercício
    exerciseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('exercise-name').value;
        const reps = document.getElementById('exercise-reps').value;
        const sets = document.getElementById('exercise-sets').value;
        const weight = document.getElementById('exercise-weight').value;

        const exercise = { name, reps, sets, weight };
        saveExerciseToBackend(exercise);
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

    async function saveExerciseToBackend(exercise) {
        try {
            const response = await fetch('https://your-backend-url.com/exercises', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(exercise),
            });
            if (!response.ok) {
                throw new Error('Erro ao salvar no backend');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    async function loadExercisesFromBackend() {
        try {
            const response = await fetch('https://your-backend-url.com/exercises');
            if (!response.ok) {
                throw new Error('Erro ao carregar do backend');
            }
            const exercises = await response.json();
            exercises.forEach(addExerciseToList);
        } catch (error) {
            console.error('Erro:', error);
        }
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
});
