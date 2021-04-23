


// --- CONSTANT VALUES ---
const LINE_MOVING_DURATION = 5000; // miliseconds
const ANIMATION_TOP = 50 / 100; // animation returns at 50%
const ROTATION_DEG = 180;
const MAX_RANGE = 100;

// --- DYNAMIC VALUES ---

// inital rotation value
let rotation = 0;
let animationFinished = true;
let waitBeforeLineMove = 5000; // miliseconds
let animationReleaseStart = waitBeforeLineMove + (LINE_MOVING_DURATION * ANIMATION_TOP);
let totalAnimationDuration = waitBeforeLineMove + LINE_MOVING_DURATION

window.onload = () => {

    // --- SELECTORS ---
    const randomizeBtn = document.querySelector('.circle')
    const line = document.querySelector('.line')
    const randNumEl = document.querySelector('.random-number')
    const img = document.querySelector('img');
    const secondsInput = document.querySelector('.seconds-input')
    const root = document.documentElement;

    // --- FUNCTION EXPRESSIONS ---

    // on load
    const setWaitLineAnimation = (valueMs) => { root.style.setProperty('--line-move-delay', `${valueMs}ms`) };
    const setAnimationDuration = (valueMs) => { root.style.setProperty('--transition-time', `${valueMs}ms`) };
    const setTotalAnimationDuration = () => { totalAnimationDuration = waitBeforeLineMove + LINE_MOVING_DURATION };
    const setAnimationReleaseStart = () =>  { animationReleaseStart = waitBeforeLineMove + (LINE_MOVING_DURATION * ANIMATION_TOP)};

    //  initializers / reseters / disablers
    const enableButtonPress = () => { randomizeBtn.style.pointerEvents = 'all' };
    const resetBtnColor = () => { randomizeBtn.classList.remove('disabled') }
    const resetRotation = () => { root.style.setProperty('--line-rotation', `0deg`) };
    const resetDisplayValue = () => { randNumEl.textContent = '' };
    const removeLineAnimation = () => { line.classList.remove('line-animation') }

    // enablers 
    const disableButtonPress = () => { randomizeBtn.style.pointerEvents = 'none' };
    const setLineRotationValue = (rotationNum) => { root.style.setProperty('--line-rotation-top', `${rotationNum}deg`) };
    const addDisabledBtnColor = () => { randomizeBtn.classList.add('disabled') };
    const enableLineAnimation = () => { line.classList.add('line-animation') };

    // add event listeners
    randomizeBtn.addEventListener('mousedown', handleClick);
    randomizeBtn.addEventListener('touchstart', handleClick);
    secondsInput.addEventListener('input', function () {
        const seconds = this.value;
        checkAndUpdateSecondsInput(seconds);
    })

    // init all
    resetDisplayValue();
    setWaitLineAnimation(waitBeforeLineMove);
    setAnimationDuration(LINE_MOVING_DURATION);
    resetRotation();

    // --- FUNCTION DECLARATIONS ---

    function handleClick() {
        animationFinished = false;
        resetDisplayValue();
        generateRotation(MAX_RANGE); // generate rotation based on range 0 - 100;
        setLineRotationValue(rotation);
        setWiggleValues(rotation);
        disableButtonPress();
        addDisabledBtnColor();
        enableLineAnimation();
    }

    // Logic functions

    function generateRotation(maxRange) {

        // random number from 0 to maxRange
        const randNum = Math.floor(Math.random() * maxRange) + 1;
        onReleaseDisplayLogic(randNum);

        // get 1% of ROTATION(degrees), multiply by random num in range 0 to maxRange
        rotation = Math.round((ROTATION_DEG / 100) * randNum);
    }


    function onReleaseDisplayLogic(displayValue) {

        // when animation reached value 
        setTimeout(() => {

            // display generated value
            randNumEl.textContent = displayValue

        }, animationReleaseStart);

        // when animation reached it's end
        setTimeout(() => {
            removeLineAnimation();
            resetRotation();
            resetBtnColor();
            enableButtonPress();
            animationFinished = true;
            checkAndUpdateSecondsInput(secondsInput.value);
        }, totalAnimationDuration);
    }

    function checkAndUpdateSecondsInput(seconds) {
        if (animationFinished) {
            const miliseconds = seconds * 1000;
            waitBeforeLineMove = miliseconds;
            setWaitLineAnimation(miliseconds);
            setTotalAnimationDuration();
            setAnimationReleaseStart();
        } 
    }
    
    function setWiggleValues(rotationNum) {
        const root = document.documentElement;

        root.style.setProperty('--wiggle-over-lg', `${rotationNum + 8}deg`)
        root.style.setProperty('--wiggle-under-lg', `${rotationNum - 9}deg`)
        root.style.setProperty('--wiggle-over-md', `${rotationNum + 6}deg`)
        root.style.setProperty('--wiggle-under-md', `${rotationNum - 4}deg`)
        root.style.setProperty('--wiggle-over-sm', `${rotationNum + 2}deg`)
        root.style.setProperty('--wiggle-under-sm', `${rotationNum - 3}deg`)

    }

}