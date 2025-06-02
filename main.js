// Global variables
let currentQuestion = 1;
let totalQuestions = 30;
let timeRemaining = 180 * 60; // 180 minutes in seconds
let timerInterval;
let questionStates = {};
let currentSubject = 'mathematics';

// Subject-wise questions
let subjectQuestions = {
    mathematics: [
        {
            id: 1,
            text: "If f(x) = x² + 2x + 1, then what is the value of f(3)?",
            options: [
                { id: "A", text: "16" },
                { id: "B", text: "12" },
                { id: "C", text: "10" },
                { id: "D", text: "14" }
            ],
            correct: "A"
        },
        {
            id: 2,
            text: "What is the derivative of sin(x)?",
            options: [
                { id: "A", text: "cos(x)" },
                { id: "B", text: "-cos(x)" },
                { id: "C", text: "sin(x)" },
                { id: "D", text: "-sin(x)" }
            ],
            correct: "A"
        },
        {
            id: 3,
            text: "If log₂(8) = x, then x equals:",
            options: [
                { id: "A", text: "2" },
                { id: "B", text: "3" },
                { id: "C", text: "4" },
                { id: "D", text: "8" }
            ],
            correct: "B"
        }
    ],
    physics: [
        {
            id: 1,
            text: "What is the SI unit of force?",
            options: [
                { id: "A", text: "Newton" },
                { id: "B", text: "Joule" },
                { id: "C", text: "Watt" },
                { id: "D", text: "Pascal" }
            ],
            correct: "A"
        },
        {
            id: 2,
            text: "The acceleration due to gravity on Earth is approximately:",
            options: [
                { id: "A", text: "9.8 m/s²" },
                { id: "B", text: "10.8 m/s²" },
                { id: "C", text: "8.8 m/s²" },
                { id: "D", text: "11.8 m/s²" }
            ],
            correct: "A"
        },
        {
            id: 3,
            text: "Which of the following is a scalar quantity?",
            options: [
                { id: "A", text: "Velocity" },
                { id: "B", text: "Force" },
                { id: "C", text: "Energy" },
                { id: "D", text: "Momentum" }
            ],
            correct: "C"
        }
    ],
    chemistry: [
        {
            id: 1,
            text: "What is the atomic number of Carbon?",
            options: [
                { id: "A", text: "6" },
                { id: "B", text: "12" },
                { id: "C", text: "8" },
                { id: "D", text: "14" }
            ],
            correct: "A"
        },
        {
            id: 2,
            text: "Which gas is most abundant in Earth's atmosphere?",
            options: [
                { id: "A", text: "Oxygen" },
                { id: "B", text: "Carbon dioxide" },
                { id: "C", text: "Nitrogen" },
                { id: "D", text: "Argon" }
            ],
            correct: "C"
        },
        {
            id: 3,
            text: "What is the pH of pure water at 25°C?",
            options: [
                { id: "A", text: "6" },
                { id: "B", text: "7" },
                { id: "C", text: "8" },
                { id: "D", text: "9" }
            ],
            correct: "B"
        }
    ]
};

// Generate random questions for each subject
function generateRandomQuestions() {
    const mathTopics = ['Algebra', 'Calculus', 'Geometry', 'Trigonometry', 'Probability'];
    const physicsTopics = ['Mechanics', 'Thermodynamics', 'Optics', 'Electricity', 'Modern Physics'];
    const chemTopics = ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Atomic Structure', 'Chemical Bonding'];

    // Generate additional math questions
    for (let i = 4; i <= 30; i++) {
        const topic = mathTopics[Math.floor(Math.random() * mathTopics.length)];
        subjectQuestions.mathematics.push({
            id: i,
            text: `${topic} question ${i}: Solve for x in the equation 2x + 5 = ${Math.floor(Math.random() * 20) + 10}`,
            options: [
                { id: "A", text: `${Math.floor(Math.random() * 10) + 1}` },
                { id: "B", text: `${Math.floor(Math.random() * 10) + 1}` },
                { id: "C", text: `${Math.floor(Math.random() * 10) + 1}` },
                { id: "D", text: `${Math.floor(Math.random() * 10) + 1}` }
            ],
            correct: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)]
        });
    }

    // Generate additional physics questions
    for (let i = 4; i <= 30; i++) {
        const topic = physicsTopics[Math.floor(Math.random() * physicsTopics.length)];
        subjectQuestions.physics.push({
            id: i,
            text: `${topic} question ${i}: A body moves with velocity ${Math.floor(Math.random() * 20) + 5} m/s. What is its kinetic energy if mass is 2 kg?`,
            options: [
                { id: "A", text: `${Math.floor(Math.random() * 100) + 50} J` },
                { id: "B", text: `${Math.floor(Math.random() * 100) + 50} J` },
                { id: "C", text: `${Math.floor(Math.random() * 100) + 50} J` },
                { id: "D", text: `${Math.floor(Math.random() * 100) + 50} J` }
            ],
            correct: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)]
        });
    }

    // Generate additional chemistry questions
    for (let i = 4; i <= 30; i++) {
        const topic = chemTopics[Math.floor(Math.random() * chemTopics.length)];
        subjectQuestions.chemistry.push({
            id: i,
            text: `${topic} question ${i}: What is the molecular formula of compound with ${Math.floor(Math.random() * 5) + 2} carbon atoms?`,
            options: [
                { id: "A", text: `C${Math.floor(Math.random() * 5) + 2}H${Math.floor(Math.random() * 10) + 4}` },
                { id: "B", text: `C${Math.floor(Math.random() * 5) + 2}H${Math.floor(Math.random() * 10) + 4}` },
                { id: "C", text: `C${Math.floor(Math.random() * 5) + 2}H${Math.floor(Math.random() * 10) + 4}` },
                { id: "D", text: `C${Math.floor(Math.random() * 5) + 2}H${Math.floor(Math.random() * 10) + 4}` }
            ],
            correct: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)]
        });
    }
}

// Initialize question states for all subjects
function initializeQuestionStates() {
    questionStates = {
        mathematics: {},
        physics: {},
        chemistry: {},
        mixed: {}
    };
    
    // Initialize for individual subjects
    ['mathematics', 'physics', 'chemistry'].forEach(subject => {
        for (let i = 1; i <= 30; i++) {
            questionStates[subject][i] = {
                status: 'not-visited',
                answer: null,
                marked: false
            };
        }
    });
}

// Switch subject
function switchSubject(subject) {
    // Only allow switching if not in mixed test mode
    if (currentSubject === 'mixed') {
        return;
    }
    
    currentSubject = subject;
    currentQuestion = 1;
    totalQuestions = 30;
    
    // Update active tab
    document.querySelectorAll('.subject-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(`${subject === 'mathematics' ? 'math' : subject}-tab`).classList.add('active');
    
    // Update title
    const titles = {
        mathematics: 'Mathematics Practice Test',
        physics: 'Physics Practice Test',
        chemistry: 'Chemistry Practice Test'
    };
    document.getElementById('subjectTitle').textContent = titles[subject];
    
    // Update total questions display
    document.getElementById('totalQuestionsDisplay').textContent = '30';
    
    // Reinitialize palette and load first question
    initializePalette();
    loadQuestion(1);
}

// Home page navigation functions
function showSubjectTestOptions(subject) {
    // Hide home page and show appropriate subject test selection page
    document.getElementById('homePage').style.display = 'none';
    
    const pageIds = {
        mathematics: 'mathTestSelectionPage',
        physics: 'physicsTestSelectionPage',
        chemistry: 'chemistryTestSelectionPage'
    };
    
    document.getElementById(pageIds[subject]).style.display = 'block';
}

function startSubjectTest(subject, testId) {
    currentSubject = subject;
    totalQuestions = 30; // Reset to 30 for individual subjects
    showTestInterface();
    
    // Update active tab
    document.querySelectorAll('.subject-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(`${subject === 'mathematics' ? 'math' : subject}-tab`).classList.add('active');
    
    // Update title
    const titles = {
        mathematics: 'Mathematics Practice Test 2024',
        physics: 'Physics Practice Test 2024',
        chemistry: 'Chemistry Practice Test 2024'
    };
    document.getElementById('subjectTitle').textContent = titles[subject];
    
    // Update total questions display
    document.getElementById('totalQuestionsDisplay').textContent = '30';
    
    // Show instructions
    showInstructions();
}

function showFullTestOptions() {
    // Hide home page and show test selection page
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('testSelectionPage').style.display = 'block';
}

function startFullTest(testId) {
    // For now, just start the mixed test functionality
    currentSubject = 'mixed';
    createMixedQuestions();
    showTestInterface();
    
    // Update title for full test
    document.getElementById('subjectTitle').textContent = 'JEE Main Practice Test 2024';
    
    // Hide subject tabs for full test
    document.querySelector('.subject-tabs').style.display = 'none';
    
    // Show instructions
    showInstructions();
}

function createMixedQuestions() {
    // Create a mixed set of 90 questions (30 from each subject)
    subjectQuestions.mixed = [];
    let questionId = 1;
    
    // Add 30 questions from each subject
    ['mathematics', 'physics', 'chemistry'].forEach(subject => {
        for (let i = 0; i < 30; i++) {
            const originalQuestion = subjectQuestions[subject][i];
            subjectQuestions.mixed.push({
                ...originalQuestion,
                id: questionId++,
                originalSubject: subject
            });
        }
    });
    
    // Shuffle the questions
    for (let i = subjectQuestions.mixed.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [subjectQuestions.mixed[i], subjectQuestions.mixed[j]] = [subjectQuestions.mixed[j], subjectQuestions.mixed[i]];
    }
    
    // Update total questions for mixed test
    totalQuestions = 90;
    document.getElementById('totalQuestionsDisplay').textContent = '90';
    
    // Initialize question states for mixed test
    questionStates.mixed = {};
    for (let i = 1; i <= totalQuestions; i++) {
        questionStates.mixed[i] = {
            status: 'not-visited',
            answer: null,
            marked: false
        };
    }
}

function showTestInterface() {
    // Hide all pages
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('testSelectionPage').style.display = 'none';
    document.getElementById('mathTestSelectionPage').style.display = 'none';
    document.getElementById('physicsTestSelectionPage').style.display = 'none';
    document.getElementById('chemistryTestSelectionPage').style.display = 'none';
    
    // Show navigation bar and dashboard
    document.getElementById('navBar').style.display = 'block';
    document.getElementById('dashboard').style.display = 'block';
    
    // Reset timer for new test
    timeRemaining = 180 * 60; // 3 hours
    updateTimerDisplay();
    
    // Initialize palette and load first question
    initializePalette();
    currentQuestion = 1;
}

function goBackToHome() {
    // Confirm if test is in progress
    if (timerInterval) {
        if (!confirm('Are you sure you want to go back to home? Your test progress will be lost.')) {
            return;
        }
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Reset all variables
    currentQuestion = 1;
    totalQuestions = 30;
    timeRemaining = 180 * 60;
    
    // Show home page
    document.getElementById('homePage').style.display = 'block';
    
    // Hide all other pages
    document.getElementById('testSelectionPage').style.display = 'none';
    document.getElementById('mathTestSelectionPage').style.display = 'none';
    document.getElementById('physicsTestSelectionPage').style.display = 'none';
    document.getElementById('chemistryTestSelectionPage').style.display = 'none';
    document.getElementById('navBar').style.display = 'none';
    document.getElementById('dashboard').style.display = 'none';
    
    // Reset subject tabs visibility
    document.querySelector('.subject-tabs').style.display = 'flex';
    
    // Update total questions display back to 30
    document.getElementById('totalQuestionsDisplay').textContent = '30';
}

// Modified initialization
document.addEventListener('DOMContentLoaded', function() {
    generateRandomQuestions();
    initializeQuestionStates();
    setupEventListeners();
    
    // Start with home page visible
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('testSelectionPage').style.display = 'none';
    document.getElementById('mathTestSelectionPage').style.display = 'none';
    document.getElementById('physicsTestSelectionPage').style.display = 'none';
    document.getElementById('chemistryTestSelectionPage').style.display = 'none';
    document.getElementById('navBar').style.display = 'none';
    document.getElementById('dashboard').style.display = 'none';
});

// Setup event listeners
function setupEventListeners() {
    // Option selection
    document.addEventListener('change', function(e) {
        if (e.target.name === 'answer') {
            handleAnswerSelection(e.target.value);
        }
    });
}

// Show instructions modal
function showInstructions() {
    document.getElementById('instructionsModal').style.display = 'block';
}

// Start test
function startTest() {
    document.getElementById('instructionsModal').style.display = 'none';
    startTimer();
    loadQuestion(1);
    updateQuestionState(1, 'not-answered');
}

// Timer functions
function startTimer() {
    timerInterval = setInterval(function() {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 300) { // 5 minutes warning
            document.getElementById('timerWarning').style.display = 'block';
        }
        
        if (timeRemaining <= 0) {
            autoSubmitTest();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;
    
    const display = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timer').textContent = display;
    
    // Change timer color as time runs out
    const timerElement = document.getElementById('timer');
    if (timeRemaining <= 300) {
        timerElement.style.color = '#d32f2f';
        timerElement.style.borderColor = '#d32f2f';
    } else if (timeRemaining <= 900) {
        timerElement.style.color = '#f57c00';
        timerElement.style.borderColor = '#f57c00';
    }
}

// Initialize question palette
function initializePalette() {
    const paletteGrid = document.getElementById('paletteGrid');
    paletteGrid.innerHTML = '';
    
    for (let i = 1; i <= totalQuestions; i++) {
        const paletteItem = document.createElement('div');
        paletteItem.className = 'palette-item not-visited';
        paletteItem.textContent = i;
        paletteItem.id = `palette-${i}`;
        paletteItem.onclick = () => navigateToQuestion(i);
        paletteGrid.appendChild(paletteItem);
    }
}

// Load question
function loadQuestion(questionNum) {
    const questions = subjectQuestions[currentSubject];
    const question = questions[questionNum - 1];
    if (!question) return;
    
    currentQuestion = questionNum;
    
    // Update question content
    document.getElementById('currentQuestionNumber').textContent = questionNum;
    document.getElementById('questionText').innerHTML = `<p><strong>Question ${questionNum}:</strong> ${question.text}</p>`;
    
    // Update options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option-item';
        
        const isSelected = questionStates[currentSubject][questionNum].answer === option.id;
        if (isSelected) {
            optionDiv.classList.add('selected');
        }
        
        optionDiv.innerHTML = `
            <input type="radio" id="option${index + 1}" name="answer" value="${option.id}" ${isSelected ? 'checked' : ''}>
            <label for="option${index + 1}">(${option.id}) ${option.text}</label>
        `;
        
        optionDiv.onclick = () => {
            const radio = optionDiv.querySelector('input[type="radio"]');
            radio.checked = true;
            handleAnswerSelection(option.id);
        };
        
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = questionNum === 1;
    document.getElementById('nextBtn').disabled = questionNum === totalQuestions;
    
    // Update mark for review button state
    const markBtn = document.getElementById('markBtn');
    if (questionStates[currentSubject][questionNum].marked) {
        markBtn.textContent = 'Unmark Review';
        markBtn.classList.add('marked');
    } else {
        markBtn.textContent = 'Mark for Review';
        markBtn.classList.remove('marked');
    }
    
    // Update palette
    updatePaletteSelection();
    
    // Mark as visited if not answered
    if (questionStates[currentSubject][questionNum].status === 'not-visited') {
        updateQuestionState(questionNum, 'not-answered');
    }
}

// Handle answer selection
function handleAnswerSelection(answer) {
    questionStates[currentSubject][currentQuestion].answer = answer;
    updateQuestionState(currentQuestion, 'answered');
    
    // Update option styling
    document.querySelectorAll('.option-item').forEach(option => {
        option.classList.remove('selected');
    });
    
    const selectedOption = document.querySelector(`input[value="${answer}"]`).closest('.option-item');
    selectedOption.classList.add('selected');
}

// Update question state
function updateQuestionState(questionNum, status) {
    questionStates[currentSubject][questionNum].status = status;
    updatePaletteItem(questionNum);
}

// Update palette item
function updatePaletteItem(questionNum) {
    const paletteItem = document.getElementById(`palette-${questionNum}`);
    const state = questionStates[currentSubject][questionNum];
    
    // Remove all status classes
    paletteItem.classList.remove('not-visited', 'not-answered', 'answered', 'marked');
    
    // Add appropriate class
    if (state.marked) {
        paletteItem.classList.add('marked');
    } else {
        paletteItem.classList.add(state.status);
    }
}

// Update palette selection
function updatePaletteSelection() {
    document.querySelectorAll('.palette-item').forEach(item => {
        item.classList.remove('current');
    });
    document.getElementById(`palette-${currentQuestion}`).classList.add('current');
}

// Navigation functions
function previousQuestion() {
    if (currentQuestion > 1) {
        loadQuestion(currentQuestion - 1);
    }
}

function nextQuestion() {
    if (currentQuestion < totalQuestions) {
        loadQuestion(currentQuestion + 1);
    }
}

function navigateToQuestion(questionNum) {
    loadQuestion(questionNum);
}

// Mark for review
function markForReview() {
    questionStates[currentSubject][currentQuestion].marked = !questionStates[currentSubject][currentQuestion].marked;
    updatePaletteItem(currentQuestion);
    
    const btn = document.getElementById('markBtn');
    if (questionStates[currentSubject][currentQuestion].marked) {
        btn.textContent = 'Unmark Review';
        btn.classList.add('marked');
    } else {
        btn.textContent = 'Mark for Review';
        btn.classList.remove('marked');
    }
}

// Clear response
function clearResponse() {
    if (questionStates[currentSubject][currentQuestion].answer) {
        questionStates[currentSubject][currentQuestion].answer = null;
        updateQuestionState(currentQuestion, 'not-answered');
        
        // Clear radio buttons
        document.querySelectorAll('input[name="answer"]').forEach(radio => {
            radio.checked = false;
        });
        
        // Remove selected styling
        document.querySelectorAll('.option-item').forEach(option => {
            option.classList.remove('selected');
        });
    }
}

// Save progress
function saveProgress() {
    // Simulate saving
    const btn = document.querySelector('.btn-save');
    const originalText = btn.textContent;
    btn.textContent = 'Saving...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        
        // Move to next question if not on last
        if (currentQuestion < totalQuestions) {
            nextQuestion();
        }
    }, 1000);
}

// Submit test functions
function submitTest() {
    updateSubmitSummary();
    document.getElementById('submitModal').style.display = 'block';
}

function updateSubmitSummary() {
    let attempted = 0;
    let marked = 0;
    
    for (let i = 1; i <= totalQuestions; i++) {
        if (questionStates[currentSubject][i].answer) attempted++;
        if (questionStates[currentSubject][i].marked) marked++;
    }
    
    document.getElementById('attemptedCount').textContent = attempted;
    document.getElementById('notAttemptedCount').textContent = totalQuestions - attempted;
    document.getElementById('markedCount').textContent = marked;
}

function closeSubmitModal() {
    document.getElementById('submitModal').style.display = 'none';
}

function confirmSubmit() {
    clearInterval(timerInterval);
    document.getElementById('submitModal').style.display = 'none';
    
    // Calculate results for current subject/test
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    
    const questions = subjectQuestions[currentSubject];
    const questionsToCheck = currentSubject === 'mixed' ? 90 : 30;
    
    for (let i = 1; i <= questionsToCheck; i++) {
        const userAnswer = questionStates[currentSubject][i].answer;
        if (!userAnswer) {
            unattempted++;
        } else if (userAnswer === questions[i-1].correct) {
            correct++;
        } else {
            incorrect++;
        }
    }
    
    const totalMarks = (correct * 4) - (incorrect * 1);
    
    // Show results
    const testName = currentSubject === 'mixed' ? 'JEE Main Practice Test 2024' : 
                    currentSubject.charAt(0).toUpperCase() + currentSubject.slice(1) + ' Test';
    
    alert(`${testName} Submitted!\n\nCorrect: ${correct}\nIncorrect: ${incorrect}\nUnattempted: ${unattempted}\nTotal Marks: ${totalMarks}`);
    
    // Go back to home page
    goBackToHome();
}

function autoSubmitTest() {
    alert('Time is up! Test will be auto-submitted.');
    confirmSubmit();
}